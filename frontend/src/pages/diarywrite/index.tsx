import { fabric } from 'fabric';
import { BottomSheet } from 'react-spring-bottom-sheet'
import 'react-spring-bottom-sheet/dist/style.css'
import { SaveIcon, BackIcon } from 'src/components';
import { Tab, TextboxContent, ImageContent, DrawingContent, DateSelect } from './components';
import { useNavigate } from "react-router-dom";
import { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import cookie from 'react-cookies';
import styled from 'styled-components';
import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
    [data-rsbs-scroll="true"] {
        overflow: hidden !important;
    }
`;

const Header = styled.div`
    width: 100%;
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

const BottomSheetHeader = styled.div`
    display: flex;
    justify-content: space-around;
    align-items: center;
    margin: 10px 0px;
`

const Content = styled.div`
    padding: 10px;
`;

const DiaryWrite = () => {
    const accessToken = cookie.load('accessToken');

    const canvasRef = useRef(null);
    const textboxRef = useRef(null);
    
    const [ canvas, setCanvas ] = useState(null);
    const [ activeTool, setActiveTool ] = useState("textbox");
    const [ selectedFont, setSelectedFont ] = useState("Dovemayo");
    const [ textAlign, setTextAlign ] = useState("left");
    const [ fontColor, setFontColor ] = useState("#000000");
    const [ penColor, setPenColor ] = useState('#000000');
    const [ penWidth, setPenWidth ] = useState(5);
    const [ selectedDate, setSelectedDate ] = useState('');
    
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
    
        setCanvas(newCanvas);
    
        // 텍스트박스 추가
        const textbox = new fabric.Textbox('', {
            left: 50,
            top: 50,
            width: 500,
            fontSize: 24,
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
    const handleFontChange = (event: any) => {
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

        const color = event.target.value;
        setFontColor(color);
        
        const activeObject = canvas.getActiveObject();
        if (activeObject && activeObject.type === 'textbox') {
            activeObject.set('fill', color);
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
                    top: 300,
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

    // 스티커 추가
    const handleSticker = (value: string) => {
        const imgElement = document.createElement('img');
        imgElement.src = value;
        imgElement.onload = () => {
            const maxWidth = 150;
            const scaleFactor = maxWidth / imgElement.width; 

            const imgInstance = new fabric.Image(imgElement, {
                left: 300,
                top: 300,
                scaleX: scaleFactor,
                scaleY: scaleFactor,
                angle: 0,
                opacity: 1.0,
            });
            canvas.add(imgInstance);
            canvas.setActiveObject(imgInstance);
        };
    }

    function deleteObject(eventData: MouseEvent, transformData: fabric.Transform, x: number, y: number): boolean {
        const canvas = transformData.target.canvas;
        const activeObjects = canvas.getActiveObjects();
        
        if (activeObjects && activeObjects.length > 0) {
            activeObjects.forEach(object => {
                canvas.remove(object);
            });
            canvas.discardActiveObject(); // 선택 해제
            canvas.requestRenderAll(); // 캔버스 갱신
            return true; // 핸들러가 성공적으로 처리되었음을 반환
        }
        return false; // 아무것도 삭제되지 않았음을 반환
    }

    // 객체 선택 시 삭제 버튼 추가
    useEffect(() => {
        if (!canvas) return;

        fabric.Object.prototype.controls.deleteControl = new fabric.Control({
            x: 0.5,
            y: -0.5,
            offsetX: 16,
            offsetY: -16,
            cursorStyle: 'pointer',
            mouseUpHandler: deleteObject,
            render: renderIcon,
        });

        function renderIcon(ctx: CanvasRenderingContext2D, left: number, top: number, fabricObject: fabric.Object): void {
            const size = 24;
            ctx.save();
            ctx.translate(left, top);
            ctx.rotate(fabric.util.degreesToRadians(fabricObject.angle));
            ctx.drawImage(img, -size / 2, -size / 2, size, size);
            ctx.restore();
        }

        const img = new Image();
        img.src = "data:image/svg+xml,%3C%3Fxml version='1.0' encoding='utf-8'%3F%3E%3C!DOCTYPE svg PUBLIC '-//W3C//DTD SVG 1.1//EN' 'http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd'%3E%3Csvg version='1.1' id='Ebene_1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' x='0px' y='0px' width='595.275px' height='595.275px' viewBox='200 215 230 470' xml:space='preserve'%3E%3Ccircle style='fill:%23F44336;' cx='299.76' cy='439.067' r='218.516'/%3E%3Cg%3E%3Crect x='267.162' y='307.978' transform='matrix(0.7071 -0.7071 0.7071 0.7071 -222.6202 340.6915)' style='fill:white;' width='65.545' height='262.18'/%3E%3Crect x='266.988' y='308.153' transform='matrix(0.7071 0.7071 -0.7071 0.7071 398.3889 -83.3116)' style='fill:white;' width='65.544' height='262.179'/%3E%3C/g%3E%3C/svg%3E";
        img.onload = () => {
            canvas.renderAll();
        };
    }, [ canvas ]);    

    // Canvas에서 마우스 이벤트 핸들링
    useEffect(() => {
        if (!canvas) return;

        canvas.selectionColor = 'rgba(0, 0, 0, 0)';
        canvas.on('mouse:move', handleMouseOver);
        canvas.on('mouse:on', handleMouseOver);

        return () => {
            canvas.off('mouse:move', handleMouseOver);
        };
    }, [ canvas, activeTool ]);

    // 마우스가 지나가는 객체를 확인하여 삭제
    const handleMouseOver = (event: any) => {
        if (activeTool === 'eraser' && event.target && event.target.type === 'path') {
            canvas.remove(event.target);
            canvas.renderAll();
        }
    };

    // 지우개 버튼 클릭 시 획 지우개 모드 활성화
    const handleEraserTool = () => {
        setActiveTool('eraser');
    };

    const navigator = useNavigate();

    const handleDateChange = (date: string) => {
        setSelectedDate(date);
    };

    // Axios 인스턴스 생성
    const api = axios.create({
        baseURL: 'http://localhost:8080', 
        headers: {
            "Content-Type": "application/json;charset=utf-8",
            "Cookie": accessToken,
        },
        withCredentials: true,
    });
    
    // 저장
    const saveDiary = () => {
        console.log(accessToken);
        // string으로 전달
        const diaryToString = JSON.stringify(canvas.toJSON());

        api({
            url: 'diary',
            method: 'POST',
            data: {
                diaryId: 1,
                dailyDate: selectedDate,
                dailyContent: diaryToString,
            },
        })
        .then((resp) => {
            console.log(resp);
        });
    }

    return (
        <Container>
            <Header>
                <BackIcon onClick={ () => { navigator('/diary') } }/>
                <DateSelect onDateChange={ handleDateChange }/>
                <SaveIcon onClick={ saveDiary }/>
            </Header>
            <canvas style={{ border: "1px solid #9E9D9D"  }} ref={ canvasRef }/>
            <GlobalStyle />
            <BottomSheet
                open={true}
                blocking={false}
                defaultSnap={({ maxHeight }) => maxHeight * 0 + 300 }
                snapPoints={({ minHeight, maxHeight }) => [
                    minHeight * 0 + 75,
                    maxHeight * 0 + 360,
                ]}
                header={
                    <BottomSheetHeader>
                        <Tab value="텍스트" onClick={() => setActiveTool("textbox")} disabled={ activeTool === "textbox" }/>
                        <Tab value="이미지" onClick={() => setActiveTool("image")} disabled={ activeTool === "image" }/>
                        <Tab value="그리기" onClick={() => setActiveTool("drawing")} disabled={ activeTool === "drawing" }/>
                        <Tab value="지우개" onClick={ handleEraserTool } disabled={ activeTool === "eraser" }/>
                    </BottomSheetHeader>
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
                    {(activeTool === "image") && (
                        <ImageContent onImageUpload={ handleImageUpload } handleSticker={ handleSticker }/>
                    )}
                    {(activeTool === "drawing" || activeTool === "eraser") && (
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
