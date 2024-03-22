import { fabric } from 'fabric';
import { useEffect, useRef } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import WebFont from 'webfontloader';
import styled from 'styled-components';

const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: #F9F3EE;
`;

const Diary = () => {
    const navigator = useNavigate();
    
    const canvasRef = useRef(null);
    
    useEffect(() => {
        
        // 캔버스 생성
        const newCanvas = new fabric.Canvas(canvasRef.current, {
            width: 950,
            height: 1100,
            backgroundColor: '#FFFEFC'
        });

        fabric.Object.prototype.set({
            cornerSize: 7,
            cornerStyle: 'rect',
            transparentCorners: false,
            cornerColor: '#CDCDCD',
            borderColor: '#CDCDCD',
        });
        
        WebFont.load({
            custom: {
                families: ['DoveMayo', 'DoveMayoBold', 'IMHyeMin', 'IMHyeMinBold', 'Cafe24Supermagic', 'Cafe24SupermagicBold', 'HakgyoansimGaeulsopung', 'HakgyoansimGaeulsopungBold'],
                urls: ['src/asset/fonts']
            },
            active: () => {
                getDiary(dailyDiaryId);
            }
        });

        const dailyDiaryId = 6;

        // Axios 인스턴스 생성
        const api = axios.create({
            baseURL: 'http://localhost:8080', 
            headers: {
                "Content-Type": "application/json;charset=utf-8",
                "Authorization": "Bearer eyJhbGciOiJIUzI1NiJ9.eyJlbWFpbCI6ImhhcHB5MzE1MzE1QGhhbm1haWwubmV0IiwiaWF0IjoxNzExMDcwMDczLCJleHAiOjE3MTEwNzM2NzN9.Jvu5hJeBOC-0ksi4n6KXV7FnXQFmaKE-P7GesvrY5ls"
            },
            withCredentials: true,
        });

        const getDiary = (dailyDiaryId: number) => {
            api({
                url: `/diary/${dailyDiaryId}`,
                method: 'GET'
            })
            .then((resp) => {
                const data = resp.data;
                // JSON으로부터 캔버스 로드 후, 모든 객체를 선택 불가능하게 설정
                newCanvas.loadFromJSON(data.dailyContent, () => {
                    newCanvas.renderAll();
                    // 모든 객체를 순회하면서 selectable 속성을 false로 설정
                    newCanvas.forEachObject((obj) => {
                        obj.selectable = false;
                    });
                });
                const decoObjects = JSON.parse(data.decoration);

                fabric.util.enlivenObjects(decoObjects, (enlivenedObjects) => {
                    enlivenedObjects.forEach((obj) => {
                        obj.selectable = false;
                        newCanvas.add(obj);
                    });
                    newCanvas.renderAll();
                }, null);
            })
            .catch((err) => {
                console.log("에러발생:", err);
            });
        }

        // 언마운트 시 캔버스 정리
        return () => {
            newCanvas.dispose();
        };
    }, []);

    return (
        <Container>
            <div>
                <button onClick={() => navigator('/diary/write')}>일기 쓰기</button>
                <button onClick={() => navigator('/diary/edit')}>일기 수정</button>
                <button onClick={() => navigator('/diary/deco')}>일기 꾸미기</button>
            </div>
            <canvas id="canvas" style={{ border: "1px solid #9E9D9D"  }} ref={ canvasRef }/>
        </Container>
    )
};

export default Diary;