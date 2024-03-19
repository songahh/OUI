import { fabric } from 'fabric';
import { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import styled from 'styled-components';

const Diary = () => {
    const canvasRef = useRef(null);
    
    const [ canvas, setCanvas ] = useState(null);
    const [ content, setContent ] = useState(null);
    
    useEffect(() => {
        // 캔버스 생성
        const newCanvas = new fabric.Canvas(canvasRef.current, {
            width: 680,
            height: 850,
            backgroundColor: '#FFFEFC'
        });

        fabric.Object.prototype.set({
            cornerSize: 7,
            cornerStyle: 'rect',
            transparentCorners: false,
            cornerColor: '#CDCDCD',
            borderColor: '#CDCDCD',
        });

        // const diaryId = '65f93ffbc7d180465e2f3e9d';

        // const getDiary = async (diaryId: string) => {
        //     await axios({
        //         url: `http://localhost:8080/diary/${diaryId}`,
        //         method: 'GET'
        //     })
        //     .then((resp) => {
        //         console.log(JSON.parse(resp.data.dailyContent));
        //         setContent(resp.data.dailyContent);
        //         newCanvas.loadFromJSON(JSON.parse(content), newCanvas.renderAll.bind(newCanvas));
        //     });
        // }
        
        // getDiary(diaryId);

        setCanvas(newCanvas);

        // 언마운트 시 캔버스 정리
        return () => {
            newCanvas.dispose();
        };
    }, []);

    return (
        <canvas style={{ border: "1px solid #9E9D9D"  }} ref={ canvasRef }/>
    )
};

export default Diary;