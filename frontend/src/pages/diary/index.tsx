import { fabric } from 'fabric';
import { BottomSheet } from 'react-spring-bottom-sheet'
import 'react-spring-bottom-sheet/dist/style.css'
import { SaveIcon } from 'src/components';
import { Tab, TextboxContent, ImageContent, DrawingContent } from './components';
import { useEffect, useState, useRef } from 'react';
import styled from 'styled-components';
import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
    [data-rsbs-scroll="true"] {
        overflow: hidden !important;
    }
`;

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

const DiaryWrite = () => {
    const canvasRef = useRef(null);
    const textboxRef = useRef(null);
    
    const [ canvas, setCanvas ] = useState(null);
    const [ activeTool, setActiveTool ] = useState("textbox");
    const [ selectedFont, setSelectedFont ] = useState("Dovemayo");
    const [ textAlign, setTextAlign ] = useState("left");
    const [ fontColor, setFontColor ] = useState("#000000");
    const [ penColor, setPenColor ] = useState('#000000');
    const [ penWidth, setPenWidth ] = useState(5);
    
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

        setCanvas(newCanvas);

        // 텍스트박스 추가
        const textbox = new fabric.Textbox('', {
            left: 50,
            top: 50,
            width: 200,
            fontSize: 16,
            fontFamily: selectedFont,
            padding: 10,
        });
        newCanvas.add(textbox);
        
        textboxRef.current = textbox; // 텍스트박스 ref 설정
        newCanvas.setActiveObject(textbox);
        
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
    }, [ activeTool ]);

    useEffect(() => {
        if (!canvas || !textboxRef.current) return;
        
        const activeObject = canvas.getActiveObject();
        if (activeObject && activeObject.type === 'textbox') {
            activeObject.set('textAlign', textAlign);
            canvas.renderAll();
        }
    }, [ textAlign ]);

    useEffect(() => {
        if (!canvas || !textboxRef.current) return;

        const activeObject = canvas.getActiveObject();
        if (activeObject && activeObject.type === 'textbox') {
            activeObject.set('fontFamily', selectedFont);
            canvas.renderAll();
        }
    }, [ selectedFont ]);

    useEffect(() => {
        if(!canvas || !textboxRef.current) return;

        const pen = canvas.freeDrawingBrush;
        pen.color = penColor;
        canvas.renderAll();
    }, [ penColor ])
    
    useEffect(() => {
        if(!canvas || !textboxRef.current) return;

        const pen = canvas.freeDrawingBrush;
        pen.width = penWidth;
        canvas.renderAll();
    }, [ penWidth ])

    // 텍스트박스 선택 활성화
    const handleTextboxTool = () => {
        canvas.isDrawingMode = false;
        canvas.setActiveObject(textboxRef.current);
        canvas.renderAll();
    }

    // 텍스트박스 선택 비활성화
    const disableTextbox = () => {
        canvas.discardActiveObject();
        canvas.renderAll();
    } 

    // 펜 활성화
    const handlePenTool = () => {
        canvas.freeDrawingBrush.width = penWidth;
        canvas.isDrawingMode = true;
    };

    // 펜 비활성화
    const disablePenTool = () => {
        canvas.isDrawingMode = false;
    }
    
    // 폰트 변경
    const handleFontChange = (event) => {
        canvas.setActiveObject(textboxRef.current);
        setSelectedFont(event.target.value);
    };

    // 텍스트 굵기
    const handleFontWeight = () => {
        canvas.setActiveObject(textboxRef.current);
        const activeObject = canvas.getActiveObject();
        if (activeObject && activeObject.type === 'textbox') {
            activeObject.set('fontWeight', activeObject.get('fontWeight') === 'normal'? 'bold' : 'normal');
            canvas.renderAll();
        }
    }

    // 텍스트 정렬
    const handleTextAlign = (position: string) => {
        canvas.setActiveObject(textboxRef.current);
        setTextAlign(position);
    }

    // 텍스트 색상
    const handleFontColor = (event: any) => {
        canvas.setActiveObject(textboxRef.current);
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
    }

    // 펜 색상
    const handlePenColor = (event: any) => {
        setPenColor(event.target.value);
    } 

    // 저장
    const saveDiary = () => {
        // string으로 전달
        const diaryToJSON = canvas.toJSON();
        const jsonToString = JSON.stringify(diaryToJSON);
        console.log(jsonToString);
    }

    // 이미지 업로드
    const handleImageUpload = (file: File) => {
        const reader = new FileReader();
        reader.onload = (event) => {
            const imgElement = document.createElement('img');
            imgElement.src = event.target.result as string;
            imgElement.onload = () => {
                const maxWidth = 150;
                const scaleFactor = maxWidth / imgElement.width; 

                const imgInstance = new fabric.Image(imgElement, {
                    left: 300,
                    top: 400,
                    scaleX: scaleFactor,
                    scaleY: scaleFactor,
                    angle: 0,
                    opacity: 1.0,
                });
                canvas.add(imgInstance);
                canvas.setActiveObject(imgInstance);
            };
        };
        reader.readAsDataURL(file);
    };

    return (
        <Container>
            <SaveIcon onClick={ saveDiary }/>
            <canvas style={{ border: "1px solid #9E9D9D"  }} ref={ canvasRef }/>
            <GlobalStyle />
            <BottomSheet
                open={true}
                blocking={false}
                defaultSnap={({ minHeight }) => minHeight * 0 + 75 }
                snapPoints={({ minHeight, maxHeight }) => [
                    minHeight * 0 + 75,
                    maxHeight * 0 + 300,
                ]}
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
                        <ImageContent onImageUpload={handleImageUpload} />
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

export default DiaryWrite;
