import { fabric } from 'fabric';
import { useEffect, useState, useRef } from 'react';

const Canvas = () => {
    const canvasRef = useRef(null);
    const textboxRef = useRef(null);
    
    const [ canvas, setCanvas ] = useState(null);
    const [ activeTool, setActiveTool ] = useState("select");
    
    useEffect(() => {
        // 캔버스 생성
        const newCanvas = new fabric.Canvas(canvasRef.current, {
            width: 800,
            height: 400,
            backgroundColor: '#FFFEFC'
        });
        setCanvas(newCanvas);

        // 텍스트박스 추가
        const textbox = new fabric.Textbox('', {
            left: 50,
            top: 50,
            width: 100,
            height: 100,
            fontSize: 16,
            padding: 10,
            cornerSize: 7, 
            cornerStyle: 'rect', 
            transparentCorners: false, 
            cornerColor: '#CDCDCD', 
            borderColor: '#CDCDCD',
            editingBorderColor: '#CDCDCD',
        });
        newCanvas.add(textbox);
        
        textboxRef.current = textbox; // 텍스트박스 ref 설정
        
        // 언마운트 시 캔버스 정리
        return () => {
            newCanvas.dispose();
        };
    }, []);

    useEffect(() => {
        if(!canvasRef.current || !canvas) return;
        
        switch(activeTool) {
            case "drawing":
                handlePenTool();
                disableTextbox();
                break;
            case "textbox":
                disablePenTool();
                handleTextboxTool();
                break;
            default:
                disablePenTool();
                disableTextbox();
        }
    }, [activeTool]);

    // 텍스트박스 선택 활성화 핸들러
    const handleTextboxTool = () => {
        canvas.isDrawingMode = false;
        canvas.setActiveObject(textboxRef.current);
        canvas.renderAll();
    }

    // 텍스트박스 선택 비활성화 핸들러
    const disableTextbox = () => {
        canvas.discardActiveObject();
        canvas.renderAll();
    } 

    // 펜 활성화 핸들러
    const handlePenTool = () => {
        canvas.freeDrawingBrush.width = 10;
        canvas.isDrawingMode = true;
    };

    // 펜 비활성화 핸들러
    const disablePenTool = () => {
        canvas.isDrawingMode = false;
    }

    return (
        <>
            <canvas style={{ border: "1px solid #9E9D9D"  }} ref={ canvasRef }/>
            <button 
                style={{ width: "60px", height: "40px", border: "1px solid #9E9D9D" }}
                onClick={() => setActiveTool("textbox")}
                disabled={activeTool === "textbox"}
            >
                텍스트
            </button>
            <button
                style={{ width: "60px", height: "40px", border: "1px solid #9E9D9D" }}
                onClick={() => setActiveTool("image")}
                disabled={activeTool === "image"}
            >
                이미지
            </button>
            <button
                style={{ width: "60px", height: "40px", border: "1px solid #9E9D9D" }}
                onClick={() => setActiveTool("drawing")}
                disabled={ activeTool === "drawing" }
                >
                그리기
            </button>
        </>
    );
};

export default Canvas;