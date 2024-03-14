import { fabric } from 'fabric';
import { BottomSheet } from 'react-spring-bottom-sheet'
import 'react-spring-bottom-sheet/dist/style.css'
import { PalleteIcon } from 'src/components';
import Tab from './Tab';
import { useEffect, useState, useRef } from 'react';
import styled from 'styled-components';

const Header = styled.div`
    display: flex;
    justify-content: space-around;
    align-items: center;
    margin: 15px 0px;
`

const Content = styled.div`
    padding: 10px;
`;

const Canvas = () => {
    const canvasRef = useRef(null);
    const textboxRef = useRef(null);

    const fontList = [
        { fontId: 1, fontTitle: "둘기마요체", fontFamily: "Dovemayo" },
        { fontId: 2, fontTitle: "IM혜민체", fontFamily: "IMHyeMin" },
    ];
    
    const [ canvas, setCanvas ] = useState(null);
    const [ activeTool, setActiveTool ] = useState("select");
    const [ open, setOpen ] = useState(true);
    const [ selectedFont, setSelectedFont ] = useState("Dovemayo");
    const [ textAlign, setTextAlign ] = useState("left");
    
    useEffect(() => {
        // 캔버스 생성
        const newCanvas = new fabric.Canvas(canvasRef.current, {
            width: 800,
            height: 800,
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
            fontFamily: selectedFont,
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

    useEffect(() => {
        if (!canvas || !textboxRef.current) return;
        
        const activeObject = canvas.getActiveObject();
        if (activeObject && activeObject.type === 'textbox') {
            activeObject.set('textAlign', textAlign);
            canvas.renderAll();
        }
    }, [textAlign]);

    // 활성화된 텍스트박스의 폰트 변경
    useEffect(() => {
        if (!canvas || !textboxRef.current) return;

        const activeObject = canvas.getActiveObject();
        if (activeObject && activeObject.type === 'textbox') {
            activeObject.set('fontFamily', selectedFont);
            canvas.renderAll();
        }
    }, [selectedFont, canvas]);

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
    
    // 폰트 변경 핸들러
    const handleFontChange = (event) => {
        setSelectedFont(event.target.value);
    };

    // 텍스트 굵기 핸들러
    const handleFontWeight = () => {
        const activeObject = canvas.getActiveObject();
        if (activeObject && activeObject.type === 'textbox') {
            activeObject.set('fontWeight', activeObject.get('fontWeight') === 'normal'? 'bold' : 'normal');
            canvas.renderAll();
        }
    }

    //Bottom Sheet 숨기기
    const handleDismiss = () => {
        setOpen(false)
    }

    // Bottom Sheet 보기
    const showBottomSheet = () => {
        setOpen(true);
    }

    return (
        <>
            <PalleteIcon size={40} onClick={showBottomSheet}/>
            <canvas style={{ border: "1px solid #9E9D9D"  }} ref={ canvasRef }/>
           
            <BottomSheet 
                open={open}
                blocking={false}
                snapPoints={({ minHeight, maxHeight }) => [minHeight, maxHeight * 0.3]}
                onDismiss={handleDismiss}
                header={
                    <Header>
                        <Tab value="텍스트" onClick={() => setActiveTool("textbox")} disabled={activeTool === "textbox"}/>
                        <Tab value="이미지" onClick={() => setActiveTool("image")} disabled={activeTool === "image"}/>
                        <Tab value="그리기" onClick={() => setActiveTool("drawing")} disabled={activeTool === "drawing"}/>
                    </Header>
                }
            >
                <Content>
                    {(activeTool === "textbox") && (
                        <>
                            <div style={{ display: "flex", alignItems: "center"}}>
                                <div style={{ display: "flex", alignItems: "center"}}>
                                    <label htmlFor='font' style={{paddingRight: 10}}>글씨체</label>
                                    <select name="font" id="font" value={selectedFont} onChange={handleFontChange} style={{fontFamily: selectedFont}}>
                                        { fontList.map((font) => (
                                            <option
                                                key={font.fontId} 
                                                value={font.fontFamily}
                                                style={{
                                                    fontFamily: `${font.fontFamily}`,
                                                }}
                                            >
                                                {font.fontTitle}
                                            </option>
                                        )) }
                                    </select>
                                </div>
                                <button style={{ border: "0", backgroundColor: "transparent" }} onClick={handleFontWeight}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 45 45" fill="none">
                                        <path d="M29.25 20.2312C31.0688 18.975 32.3437 16.9125 32.3437 15C32.3437 10.7625 29.0625 7.5 24.8437 7.5H15C13.9687 7.5 13.125 8.34375 13.125 9.375V31.875C13.125 32.9063 13.9687 33.75 15 33.75H25.8375C29.7187 33.75 33.2625 30.5812 33.2812 26.6812C33.3 23.8125 31.6875 21.3562 29.25 20.2312ZM18.75 12.1875H24.375C25.9312 12.1875 27.1875 13.4438 27.1875 15C27.1875 16.5562 25.9312 17.8125 24.375 17.8125H18.75V12.1875ZM25.3125 29.0625H18.75V23.4375H25.3125C26.8687 23.4375 28.125 24.6938 28.125 26.25C28.125 27.8062 26.8687 29.0625 25.3125 29.0625Z" fill="#262626"/>
                                    </svg>
                                </button>
                                <button
                                    style={{ border: "0", backgroundColor: "transparent" }}
                                    onClick={() => setTextAlign("left")}
                                    disabled={ textAlign === "left" }
                                >
                                    왼쪽정렬
                                </button>
                                <button
                                    style={{ border: "0", backgroundColor: "transparent" }}
                                    onClick={() => setTextAlign("center")}
                                    disabled={ textAlign === "center" }
                                >
                                    가운데정렬
                                </button>
                                <button
                                    style={{ border: "0", backgroundColor: "transparent" }}
                                    onClick={() => setTextAlign("right")}
                                    disabled={ textAlign === "right" }
                                >
                                    왼쪽정렬
                                </button>
                                <input type="color" style={{}}/>
                            </div>
                        </>
                    )}
                    {activeTool === "image" && (
                        <>
                        </>
                    )}
                    {activeTool === "drawing" && (
                        <>
                        </>
                    )}
                </Content>                                
            </BottomSheet>
        </>
    );
};

export default Canvas;