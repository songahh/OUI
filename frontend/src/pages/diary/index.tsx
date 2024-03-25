import { fabric } from 'fabric';
import { Drawer, EditIcon, DecoIcon, DeleteIcon } from 'src/components';
import { useState, useEffect, useRef } from 'react';
import { useQuery } from 'react-query';
import { useLocation, useNavigate } from "react-router-dom";
import { getDiary } from './api';
import WebFont from 'webfontloader';
import styled from 'styled-components';

const Header = styled.div`
    width: 95%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 10px;
`

const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: #F9F3EE;
`;

const Diary = () => {
    const navigator = useNavigate();

    const { state}  = useLocation();
    const { dailyDiaryId, type } = state;
     console.log( dailyDiaryId, type );
    
    const canvasRef = useRef(null);
    // 폰트 로딩 상태 관리
    const [ isFontLoaded, setIsFontLoaded ] = useState(false);
    
    useEffect(() => {        
        WebFont.load({
            custom: {
                families: ['DoveMayo', 'DoveMayoBold', 'IMHyeMin', 'IMHyeMinBold', 'Cafe24Supermagic', 'Cafe24SupermagicBold', 'HakgyoansimGaeulsopung', 'HakgyoansimGaeulsopungBold'],
                urls: ['src/asset/fonts']
            },
            active: () => {
                setIsFontLoaded(true);
            }
        });
    }, []);

    // 임시 dailyDiaryId ////////
    // const dailyDiaryId = 9;
    // const type = '개인';
    ////////////////////////////

    const { data: dailyDiary } = useQuery('dailyDiary', () => getDiary(dailyDiaryId), {
        enabled: isFontLoaded
    });

    useEffect(() => {
        // 캔버스 생성
        const newCanvas = new fabric.Canvas(canvasRef.current, {
            width: 950,
            height: 900,
            backgroundColor: '#FFFEFC'
        });

        fabric.Object.prototype.set({
            cornerSize: 10,
            cornerStyle: 'rect',
            transparentCorners: false,
            cornerColor: '#CDCDCD',
            borderColor: '#CDCDCD',
        });

        newCanvas.loadFromJSON(dailyDiary?.data?.dailyContent, () => {
            newCanvas.renderAll();
            newCanvas.forEachObject((obj) => {
                obj.selectable = false;
            });
        });
        
        // 공유일기에서 '꾸민 일기'일 경우에만 랜더링
        const decoObjects = dailyDiary ? JSON.parse(dailyDiary?.data?.decoration) : null;
        fabric.util.enlivenObjects(decoObjects, (enlivenedObjects: any) => {
            enlivenedObjects.forEach((obj: any) => {
                obj.selectable = false;
                newCanvas.add(obj);
            });
            newCanvas.renderAll();
        }, null);

        // 언마운트 시 캔버스 정리
        return () => {
            newCanvas.dispose();
        };
    }, [ dailyDiary ]);

    return (
        <Container>
            <Header>
                <Drawer />
                <div style={{ display: "flex", alignItems: "center"}}>
                    <EditIcon onClick={() => navigator('/diary/edit')} />
                    <DecoIcon onClick={() => navigator('/diary/deco')} />
                    <DeleteIcon onClick={() => navigator('/diary/write')} />
                </div>
            </Header>
            <div>
            </div>
            <canvas id="canvas" style={{ border: "1px solid #9E9D9D"  }} ref={ canvasRef }/>
        </Container>
    )
};

export default Diary;