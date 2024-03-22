import { fabric } from 'fabric';
import { BottomSheet } from 'react-spring-bottom-sheet'
import 'react-spring-bottom-sheet/dist/style.css'
import { SaveIcon, BackIcon, Tab, TextboxContent, ImageContent, DrawingContent, DateSelect } from 'src/components';
import { useNavigate } from "react-router-dom";
import { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import styled from 'styled-components';

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
    const navigator = useNavigate();

    const canvasRef = useRef(null);
    const textboxRef = useRef<fabric.Textbox>(null);
    
    const [ canvas, setCanvas ] = useState(null);
    const [ activeTool, setActiveTool ] = useState("textbox");
    const [ selectedDate, setSelectedDate ] = useState('');
    
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
    
        setCanvas(newCanvas);
    
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
        newCanvas.add(textbox);
        
        textboxRef.current = textbox; // 텍스트박스 ref 설정
        newCanvas.setActiveObject(textbox);
        
        // 언마운트 시 캔버스 정리
        return () => {
            newCanvas.dispose();
        };
    }, []);

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

    // 객체 삭제
    function deleteObject(eventData: MouseEvent, transformData: fabric.Transform, x: number, y: number): boolean {
        const canvas = transformData.target.canvas;
        const activeObjects = canvas.getActiveObjects();
        
        if (activeObjects && activeObjects.length > 0) {
            activeObjects.forEach(object => {
                canvas.remove(object);
            });
            canvas.discardActiveObject();
            canvas.requestRenderAll();
            return true;
        }
        return false;
    }
    
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
        canvas.freeDrawingBrush.width = 10;
        canvas.isDrawingMode = true;
    };

    // 펜 비활성화
    const disablePenTool = () => {
        canvas.isDrawingMode = false;
    }

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

    // Axios 인스턴스 생성
    const api = axios.create({
        baseURL: 'http://localhost:8080', 
        headers: {
            "Content-Type": "application/json;charset=utf-8",
            "Authorization": "Bearer eyJhbGciOiJIUzI1NiJ9.eyJlbWFpbCI6ImhhcHB5MzE1MzE1QGhhbm1haWwubmV0IiwiaWF0IjoxNzExMDY1NzIxLCJleHAiOjE3MTEwNjkzMjF9.qzZ5JuNcYdkSv2kFdzfOVwLVo3xHMmDcO0mZoJ2OO2g"
        },
        withCredentials: true,
    });
    
    // 저장
    const saveDiary = () => {
        // string으로 전달
        const diaryToString = JSON.stringify(canvas.toJSON());

        api({
            url: '/diary',
            method: 'POST',
            data: {
                diaryId: 1,
                dailyDate: selectedDate,
                dailyContent: diaryToString,
            },
        })
        .then(() => {
            navigator('/diary')
        })
        .catch((err) => {
            console.log("에러발생:", err);
        });
    }

    return (
        <Container>
            <Header>
                <BackIcon onClick={ () => { navigator('/diary') } }/>
                <DateSelect setSelectedDate={ setSelectedDate }/>
                <SaveIcon onClick={ saveDiary }/>
            </Header>
            <canvas style={{ border: "1px solid #9E9D9D"  }} ref={ canvasRef }/>
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
                        <Tab value="텍스트" onClick={ () => setActiveTool("textbox") } disabled={ activeTool === "textbox" }/>
                        <Tab value="이미지" onClick={ () => setActiveTool("image") } disabled={ activeTool === "image" }/>
                        <Tab value="그리기" onClick={ () => setActiveTool("drawing") } disabled={ activeTool === "drawing" }/>
                        <Tab value="지우개" onClick={ () => setActiveTool('eraser') } disabled={ activeTool === "eraser" }/>
                    </BottomSheetHeader>
                }
            >
                <Content>
                    {(activeTool === "textbox") && (
                        <TextboxContent canvas={ canvas } textboxRef={ textboxRef } />
                    )}
                    {(activeTool === "image") && (
                        <ImageContent canvas={ canvas } />
                    )}
                    {(activeTool === "drawing" || activeTool === "eraser") && (
                        <DrawingContent canvas={ canvas } />
                    )}
                </Content>                                
            </BottomSheet>
        </Container>
    );
};

export default DiaryWrite;
