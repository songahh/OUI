import { fabric } from 'fabric';
import { SaveIcon, BackIcon } from 'src/components';
import { BottomSheet, Canvas } from '../components';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState, useRef } from 'react';
import { useMutation, useQuery } from 'react-query';
import useStore from 'src/store';
import { getDiary, postDiaryDeco } from '../api';
import { Stomp } from "@stomp/stompjs";
import SockJS from "sockjs-client";
import { v4 as uuidv4 } from 'uuid';
import styled from 'styled-components';

const Header = styled.div`
    width: 93%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 60px;
    margin: 30px 0;
`

const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const DiaryDeco = () => {
    const navigator = useNavigate();
    
    const { dailyDiaryId, type } = useStore();

    const canvasRef = useRef(null);
    let stompClient = useRef(null);
    let memberId = useRef('');
    
    const [ canvas, setCanvas ] = useState(null);
    const [ isFontLoaded, setIsFontLoaded ] = useState(false);
    const [ activeTool, setActiveTool ] = useState("image");
    const [ isLoadingDiary, setIsLoadingDiary ] = useState(false);
    const [ isConnected, setIsConnected ] = useState(false);
    
    const { data: dailyDiary } = useQuery('dailyDiary', () => getDiary(dailyDiaryId), {
        enabled: isFontLoaded
    });

    useEffect(() => {
        if(isLoadingDiary || !canvas) return;

        // 1. 일기 작성자가 쓴 일기 -> 백그라운드로 선택되지 않게!
        const dailyContent = dailyDiary?.data?.dailyContent;
        // JSON으로부터 캔버스 로드 후, 모든 객체를 선택 불가능하게 설정
        canvas.loadFromJSON(dailyContent, () => {
            canvas.renderAll();
            // 모든 객체를 순회하면서 selectable 속성을 false로 설정
            canvas.forEachObject((obj) => {
                obj.selectable = false;
            });
        });

        // 2. 친구들이 꾸민 객체들
        const decoObjects = dailyDiary ? JSON.parse(dailyDiary?.data?.decoration) : null;
        fabric.util.enlivenObjects(decoObjects, (enlivenedObjects: any) => {
            enlivenedObjects.forEach((obj: any) => {
                obj.selectable = true;
                canvas.add(obj); // 각 객체를 캔버스에 추가
            });
            canvas.renderAll(); // 모든 객체가 추가된 후 캔버스를 다시 그림
        }, null);

        setIsLoadingDiary(true);
    }, [ dailyDiary, isLoadingDiary ]);
        
    const storedDataString = localStorage.getItem('userStorage');
    const storedData = JSON.parse(storedDataString);
    const accessToken = storedData?.state?.accessToken;

    useEffect(() => {
        if(!isLoadingDiary) return;

        const socket = new SockJS(process.env.REACT_APP_BASE_URL + '/ws');
        stompClient.current = Stomp.over(socket);
        
        stompClient.current.connect(
            {
                Authorization : `Bearer ${ accessToken }`,
            }, 
            (frame) => {
                setIsConnected(true);
                memberId.current = frame.headers['user-name'];

                stompClient.current.subscribe(`/sub/decorate/${dailyDiaryId}`, (resp) => {
                    const object = JSON.parse(JSON.parse(resp.body).body.oneDecoration);
                    
                    const objectMemberId = JSON.parse(JSON.parse(resp.body).body.oneDecoration).memberId;
                    const action = JSON.parse(JSON.parse(resp.body).body.oneDecoration).action;

                    const existContent = canvas.getObjects().some(obj => obj.id === object.id);
                    
                    // 1. 캔버스에 객체가 추가될 때,
                    if(action === 'add' && (memberId.current !== objectMemberId)) {
                        const objectId = object.id;
                        const objectAction = object.action;

                        if(!existContent) {
                            fabric.util.enlivenObjects([object], (enlivenedObjects) => {
                                enlivenedObjects.forEach((obj) => {
                                    obj.set({
                                        id: objectId,
                                        action: objectAction,
                                    })
                                    canvas.add(obj);
                                    console.log(canvas.getObjects());
                                });
                                canvas.renderAll();
                            }, null);
                        }
                    }
                    // 2. 객체가 삭제될 때,
                    else if(action === 'remove') {
                        canvas.getObjects().forEach((obj) => {
                            if(obj.id === object.id) {
                                canvas.remove(obj);
                            }
                        })
                    } 
                    // 3. 객체가 이동될 때,
                    else if(action === 'moving') {
                        const obj = canvas.getObjects().find(o => o.id === object.id);

                        if(obj && (object.memberId !== memberId.current)) {
                            obj.set({
                                id: object.id,
                                left: object.left,
                                top: object.top,
                                scaleX: object.scaleX,
                                scaleY: object.scaleY,
                            });
                            canvas.renderAll();
                        }
                    } 
                    // 4. 객체를 수정할 때,
                    else if(action === 'modify') {
                        const obj = canvas.getObjects().find(o => o.id === object.id);

                        if(obj) {
                            obj.set({
                                id: object.id,
                                angle: object.angle,
                                width: object.width,
                                height: object.height,
                                left: object.left,
                                top: object.top,
                                scaleX: object.scaleX,
                                scaleY: object.scaleY,
                            })
                            canvas.renderAll();
                        }
                    }
                });
            });
            
        return () => {
            stompClient.current.disconnect();
            setIsConnected(false);
        };
    }, [ isLoadingDiary ]); 
   
    const handleObjectAdded = (event) => {
        const obj = event.target;
        
        const jsonObj = obj.toJSON(['id', 'action', 'memberId']);
        jsonObj.action = 'add';
        if(!jsonObj.id) {
            jsonObj.id = uuidv4();
            obj.set('id', jsonObj.id);
        }

        const addedObject = JSON.stringify(jsonObj);

        // canvas에서 selectable이 true인 객체들만 필터링
        const decoObjects = canvas.getObjects().filter((obj: any) => obj.selectable);

        // 필터링된 객체들을 JSON 문자열로 변환
        const decoration = JSON.stringify(decoObjects.map((obj: any) => obj.toJSON(['id', 'action','memberId'])));

        stompClient.current.send(
            `/pub/decorate/${dailyDiaryId}`,
            {},
            JSON.stringify({oneDecoration: addedObject, allDecoration: decoration}),
        );
    };

    const handleObjectRemoved = (event) => {
        const obj = event.target;

        const jsonObj = obj.toJSON(['action', 'id', 'memberId']);
        jsonObj.action = 'remove';
        jsonObj.id = obj.id;

        const removedObject = JSON.stringify(jsonObj);

        // canvas에서 selectable이 true인 객체들만 필터링
        const decoObjects = canvas.getObjects().filter((obj: any) => obj.selectable);

        // 필터링된 객체들을 JSON 문자열로 변환
        const decoration = JSON.stringify(decoObjects.map((obj: any) => obj.toJSON(['id', 'action','memberId'])));

        stompClient.current.send(
            `/pub/decorate/${dailyDiaryId}`,
            {},
            JSON.stringify({oneDecoration: removedObject, allDecoration: decoration}),
        );
    };    

    const handleObjectMoving = (event) => {
        const obj = event.target;

        const jsonObj = obj.toJSON(['id', 'action','memberId']);
        jsonObj.memberId = memberId.current;
        jsonObj.action = 'moving';
        if(!jsonObj.id) {
            jsonObj.id = uuidv4();
            obj.set({
                'id': jsonObj.id,
                'memberId': jsonObj.memberId
            });
        } else {
            jsonObj.id = obj.id;
        }

        const movingObject = JSON.stringify(jsonObj);

        // canvas에서 selectable이 true인 객체들만 필터링
        const decoObjects = canvas.getObjects().filter((obj: any) => obj.selectable);

        // 필터링된 객체들을 JSON 문자열로 변환
        const decoration = JSON.stringify(decoObjects.map((obj: any) => obj.toJSON(['id', 'action','memberId'])));
        
        stompClient.current.send(
            `/pub/decorate/${dailyDiaryId}`,
            {},
            JSON.stringify({oneDecoration: movingObject, allDecoration: decoration}),
        );
    }

    const handleObjectModified = (event) => {
        const obj = event.target;

        const jsonObj = obj.toJSON(['id', 'action','memberId']);
        jsonObj.memberId = memberId.current;
        jsonObj.action ='modify';
        jsonObj.id = obj.id;

        const modifyObject = JSON.stringify(jsonObj);

        // canvas에서 selectable이 true인 객체들만 필터링
        const decoObjects = canvas.getObjects().filter((obj: any) => obj.selectable);

        // 필터링된 객체들을 JSON 문자열로 변환
        const decoration = JSON.stringify(decoObjects.map((obj: any) => obj.toJSON(['id', 'action','memberId'])));
        console.log(decoration);

        stompClient.current.send(
            `/pub/decorate/${dailyDiaryId}`,
            {},
            JSON.stringify({oneDecoration: modifyObject, allDecoration: decoration}),
        );
    }

    useEffect(() => {
        if (!canvas || !isConnected) return;

        canvas.on('object:added', handleObjectAdded);
        canvas.on('object:removed', handleObjectRemoved);
        canvas.on('object:moving', handleObjectMoving);
        canvas.on('object:modified', handleObjectModified);
        
        return () => {
            canvas.off('object:added', handleObjectAdded);
            canvas.off('object:removed', handleObjectRemoved);
            canvas.off('object:moving', handleObjectMoving);
            canvas.off('object:modified', handleObjectModified);
        };
    }, [ isConnected, canvas ]); 

    const decoDiary = useMutation( postDiaryDeco );

    // 저장
    const saveDiary = async () => {
        // canvas에서 selectable이 true인 객체들만 필터링
        const decoObjects = canvas.getObjects().filter((obj: any) => obj.selectable);

        // 필터링된 객체들을 JSON 문자열로 변환
        const decoration = JSON.stringify(decoObjects.map((obj: any) => obj.toJSON()));

        const data = {
            dailyDiaryId: dailyDiaryId,
            decoration: decoration,
        }

        await decoDiary.mutateAsync(data);
        navigator(`/diary/${dailyDiaryId}`, {state: {dailyDiaryId: dailyDiaryId, type: type}});
    }

    return (
        // <SaveIcon size={ 70 } onClick={ saveDiary }/>
        <Container>
            <Header>
                <BackIcon size={ 40 } onClick={ () => { navigator(`/diary/${dailyDiaryId}`, {state: {dailyDiaryId: dailyDiaryId, type: type}}) }} />
                <span style={{ fontSize: "30px" }}>{ dailyDiary?.data?.dailyDate.substring(0, 10) }</span>
                <span style={{ width: "70px"}}></span>
            </Header>
            <Canvas canvasRef={ canvasRef } canvas={ canvas } setCanvas={ setCanvas } activeTool={ activeTool } setIsFontLoaded={ setIsFontLoaded } />
            <BottomSheet activeTool={ activeTool } setActiveTool={ setActiveTool } canvas={ canvas } isDeco={ true } />
        </Container>
    );
};

export default DiaryDeco;