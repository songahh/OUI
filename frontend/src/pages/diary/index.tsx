import { fabric } from 'fabric';
import { Drawer, EditIcon, DecoIcon, DeleteIcon } from 'src/components';
import { Canvas } from './components';
import { useState, useEffect, useRef } from 'react';
import { useQuery } from 'react-query';
import { useNavigate } from "react-router-dom";
import { getDiary } from './api';
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

const Tab = styled.button<{ $isDeco: boolean }>`
    width: 150px; 
    height: 60px; 
    background-color: ${( props ) => props.$isDeco ? "#FFFEFC" : "#EEEEEE"}; 
    font-color: ${( props ) => props.$isDeco ? "#262626" : "#9E9D9D"}; 
    font-weight: ${( props ) => props.$isDeco ? "bold" : "normal"}; 
    border: none;
    border-radius: 10px 10px 0 0;
    margin-left: 20px;
    font-size: 22px;
`;

const Diary = () => {
    const navigator = useNavigate();
    
    const canvasRef = useRef(null);
    const [ canvas, setCanvas ] = useState<fabric.Canvas>(null);
    const [ isFontLoaded, setIsFontLoaded ] = useState<boolean>(false);
    const [ isDeco, setIsDeco ] = useState<boolean>(true);

    // 임시 dailyDiaryId ////////
    const dailyDiaryId = 18;
    let type = '공유';
    ////////////////////////////

    const { data: dailyDiary } = useQuery('dailyDiary', () => getDiary(dailyDiaryId), {
        enabled: isFontLoaded
    });

    useEffect(() => {
        if(!canvas) return;

        canvas.loadFromJSON(dailyDiary?.data?.dailyContent, () => {
            canvas.renderAll();
            canvas.forEachObject((obj) => {
                obj.selectable = false;
            });
        });

        if(type === '공유' && isDeco) {
            // 공유일기에서 '꾸민 일기'일 경우에만 랜더링
            const decoObjects = dailyDiary ? JSON.parse(dailyDiary?.data?.decoration) : null;
            fabric.util.enlivenObjects(decoObjects, (enlivenedObjects: any) => {
                enlivenedObjects.forEach((obj: any) => {
                    obj.selectable = false;
                    canvas.add(obj);
                });
                canvas.renderAll();
            }, null);
        }
    }, [ dailyDiary, isDeco ]);

    return (
        <Container>
            <Header>
                <Drawer />
                <div style={{ display: "flex", alignItems: "center" }}>
                    {(type === '공유' && isDeco) && (
                        <DecoIcon size={ 55 } onClick={() => navigator(`/diary/deco/${ dailyDiaryId }`, {state: {dailyDiaryId: dailyDiaryId}})} />
                    )}
                    {/* 공유일기 + 원본일기 -> 본인 일기일 때만 버튼이 나와야 함 */}
                    {((type === '개인') || (type ==='공유' && !isDeco)) && (
                        <EditIcon size={ 55 } onClick={() => navigator(`/diary/edit/${ dailyDiaryId }`, {state: {dailyDiaryId: dailyDiaryId}})} />
                    )}
                    <DeleteIcon size={ 55 } onClick={() => navigator('/diary/write')} />
                </div>
            </Header>
            {(type === '공유') && (
                <div style={{ width: "93%" }}>
                    <Tab onClick={() => setIsDeco(true)} $isDeco={ isDeco }>꾸민 일기</Tab>
                    <Tab onClick={() => setIsDeco(false)} $isDeco={ !isDeco }>원본 일기</Tab>
                </div>
            )}
            <Canvas canvasRef={ canvasRef } canvas={ canvas } setCanvas={ setCanvas } setIsFontLoaded={ setIsFontLoaded } />
        </Container>
    )
};

export default Diary;