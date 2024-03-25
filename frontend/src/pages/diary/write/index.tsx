import { fabric } from 'fabric';
import { SaveIcon, BackIcon } from 'src/components';
import { DateSelect, BottomSheet, Canvas } from '../components';
import { useLocation, useNavigate } from 'react-router-dom'
import { useEffect, useState, useRef } from 'react';
import { useMutation } from 'react-query';
import { postDiary } from '../api';
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

const DiaryWrite = () => {

    const navigator = useNavigate();

    const { state } = useLocation();
    const { diaryId } = state;
    console.log(diaryId);
    
    const canvasRef = useRef(null);
    const textboxRef = useRef<fabric.Textbox>(null);
    
    const [ canvas, setCanvas ] = useState<fabric.Canvas>(null);
    const [ activeTool, setActiveTool ] = useState("textbox");
    const [ selectedDate, setSelectedDate ] = useState('');
    
    useEffect(() => {
        if(!canvas) return;

        // 텍스트박스 추가
        const textbox = new fabric.Textbox('', {
            left: 60,
            top: 60,
            width: 400,
            fontSize: 24,
            fontFamily: "Dovemayo",
            fill: "#262626",
            textAlign: "left",
            fontWeight: "normal",
            padding: 10,
        });
        canvas.add(textbox);
        
        textboxRef.current = textbox; // 텍스트박스 ref 설정
        canvas.setActiveObject(textbox);
    }, [ canvas ]);

    const writeDiary = useMutation( postDiary );
    
    // 저장
    const saveDiary = async () => {
        // string으로 전달
        const diaryToString = JSON.stringify(canvas.toJSON());
        
        const data = {
            diaryId,
            dailyDate: selectedDate,
            dailyContent: diaryToString,
        };

        await writeDiary.mutateAsync(data);
        // 일기를 쓰면 어디로 돌아가야 하지..?
        navigator(`/diary`, {state: {diaryId: diaryId}});
    }

    return (
        <Container>
            <Header>
                <BackIcon size={ 40 } onClick={ () => { navigator('/diary', { state: {diaryId: diaryId}}) } }/>
                <DateSelect setSelectedDate={ setSelectedDate }/>
                <SaveIcon size={ 70 } onClick={ saveDiary }/>
            </Header>
            <Canvas canvasRef={ canvasRef } textboxRef={ textboxRef } canvas={ canvas } setCanvas={ setCanvas } activeTool={ activeTool } />
            <BottomSheet activeTool={ activeTool } setActiveTool={ setActiveTool } canvas={ canvas } textboxRef={ textboxRef } />
        </Container>
    );
};

export default DiaryWrite;
