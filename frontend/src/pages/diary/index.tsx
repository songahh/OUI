import { fabric } from 'fabric';
import { BottomSheet } from 'react-spring-bottom-sheet'
import 'react-spring-bottom-sheet/dist/style.css'
import { Tab, TextboxContent, ImageContent, DrawingContent } from './components';
import { useEffect, useState, useRef } from 'react';
import styled from 'styled-components';

const Container = styled.div`
    width: 100vw;
    height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: #F9F3EE;
`;

const Header = styled.div`
    display: flex;
    justify-content: space-around;
    align-items: center;
    margin: 10px 0px;
`

const Content = styled.div`
    padding: 10px;
`;

const Diary = () => {
    const canvasRef = useRef(null);
    const textboxRef = useRef(null);
    
    const [ canvas, setCanvas ] = useState(null);
    const [ activeTool, setActiveTool ] = useState("select");
    const [ selectedFont, setSelectedFont ] = useState("Dovemayo");
    const [ textAlign, setTextAlign ] = useState("left");
    const [ fontColor, setFontColor ] = useState("#000000");
    const [ penColor, setPenColor ] = useState('#000000');
    const [ penWidth, setPenWidth ] = useState(5);
    
    useEffect(() => {
        // 캔버스 생성
        const newCanvas = new fabric.Canvas(canvasRef.current, {
            width: 650,
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
        canvas.freeDrawingBrush.width = penWidth;
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

    // 텍스트 정렬
    const handleTextAlign = (position: string) => {
        setTextAlign(position);
    }

    // 텍스트 색상
    const handleFontColor = (event: any) => {
        setFontColor(event.target.value);
        const activeObject = canvas.getActiveObject();
        if (activeObject && activeObject.type === 'textbox') {
            activeObject.set('fill', fontColor);
            canvas.renderAll();
        }
    }

    // 펜 굵기
    const handlePenWidth = (event: any) => {
        setPenWidth(parseInt(event.target.value, 10) || 1);
        const pen = canvas.freeDrawingBrush;
        pen.width = penWidth;
        canvas.renderAll();
    }

    // 펜 색상
    const handlePenColor = (event: any) => {
        setPenColor(event.target.value);
        const pen = canvas.freeDrawingBrush;
        pen.color = penColor;
        canvas.renderAll();
    }

    return (
        <Container>
            <canvas style={{ border: "1px solid #9E9D9D"  }} ref={ canvasRef }/>
            <BottomSheet 
                open={true}
                blocking={false}
                snapPoints={({ minHeight, maxHeight }) => [minHeight, maxHeight * 0.3]}
                header={
                    <Header>
                        <Tab value="텍스트" onClick={() => setActiveTool("textbox")} disabled={ activeTool === "textbox" }/>
                        <Tab value="이미지" onClick={() => setActiveTool("image")} disabled={ activeTool === "image" }/>
                        <Tab value="그리기" onClick={() => setActiveTool("drawing")} disabled={ activeTool === "drawing" }/>
                    </Header>
                }
            >
                <Content>
                    {(activeTool === "textbox") && (
                        <TextboxContent 
                            selectedFont={ selectedFont } 
                            handleFontChange={ handleFontChange } 
                            handleFontWeight={ handleFontWeight }
                            textAlign={ textAlign }
                            handleTextAlign={ handleTextAlign }
                            fontColor={ fontColor }
                            handleFontColor={ handleFontColor }
                        />
                    )}
                    {activeTool === "image" && (
                        <ImageContent />
                    )}
                    {activeTool === "drawing" && (
                        <DrawingContent 
                            penWidth={ penWidth }
                            handlePenWidth={ handlePenWidth }
                            penColor={ penColor } 
                            handlePenColor={ handlePenColor }   
                        />
                    )}
                </Content>                                
            </BottomSheet>
        </Container>
    );
};

export default Diary;
