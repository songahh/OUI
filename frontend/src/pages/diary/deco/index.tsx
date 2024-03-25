import { fabric } from 'fabric';
import { BottomSheet } from 'react-spring-bottom-sheet'
import 'react-spring-bottom-sheet/dist/style.css'
import { SaveIcon, BackIcon } from 'src/components';
import { Tab, ImageContent, DrawingContent } from '../components';
import { useNavigate } from "react-router-dom";
import { useEffect, useState, useRef } from 'react';
import { useMutation, useQuery } from 'react-query';
import { getDiary, postDiaryDeco } from '../api';
import WebFont from 'webfontloader';
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

const DiaryEdit = () => {
    const navigator = useNavigate();

    const canvasRef = useRef(null);
    
    const [ canvas, setCanvas ] = useState(null);
    const [ isFontLoaded, setIsFontLoaded ] = useState(false);
    const [ activeTool, setActiveTool ] = useState("image");
    
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

    //////////// 임시 dailyDiaryId
    const dailyDiaryId = 9;
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

        setCanvas(newCanvas);

        // 1. 일기 작성자가 쓴 일기 -> 백그라운드로 선택되지 않게!
        const dailyContent = dailyDiary?.data?.dailyContent;
        // JSON으로부터 캔버스 로드 후, 모든 객체를 선택 불가능하게 설정
        newCanvas.loadFromJSON(dailyContent, () => {
            newCanvas.renderAll();
            // 모든 객체를 순회하면서 selectable 속성을 false로 설정
            newCanvas.forEachObject((obj) => {
                obj.selectable = false;
            });
        });

        // 2. 친구들이 꾸민 객체들
        const decoObjects = dailyDiary ? JSON.parse(dailyDiary?.data?.decoration) : null;
        fabric.util.enlivenObjects(decoObjects, (enlivenedObjects: any) => {
            enlivenedObjects.forEach((obj: any) => {
                obj.selectable = true;
                newCanvas.add(obj); // 각 객체를 캔버스에 추가
            });
            newCanvas.renderAll(); // 모든 객체가 추가된 후 캔버스를 다시 그림
        }, null);
            

        // 언마운트 시 캔버스 정리
        return () => {
            newCanvas.dispose();
        };
    }, [ dailyDiary ]);

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
                break;
            default:
                disablePenTool();
        }
    }, [ activeTool ]);

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

    // 마우스가 지나가는 객체를 확인하여 삭제(selectable 객체만 삭제)
    const handleMouseOver = (event: any) => {
        if (activeTool === 'eraser' && event.target && event.target.selectable && event.target.type === 'path') {
            canvas.remove(event.target);
            canvas.renderAll();
        }
    };

    const decoDiary = useMutation( postDiaryDeco );

    // 저장
    const saveDiary = async () => {
        // canvas에서 selectable이 true인 객체들만 필터링
        const decoObjects = canvas.getObjects().filter((obj: any) => obj.selectable);

        // 필터링된 객체들을 JSON 문자열로 변환
        const decoration = JSON.stringify(decoObjects.map((obj: any) => obj.toJSON()));

        const data = {
            dailyDiaryId: dailyDiaryId,
            // 임시 diaryId ////////
            diaryId: 1,
            decoration: decoration,
        }

        await decoDiary.mutateAsync(data);
        navigator('/diary');
    }

    return (
        <Container>
            <Header>
                <BackIcon onClick={ () => { navigator('/diary') }} />
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
                        <Tab value="이미지" onClick={ () => setActiveTool("image") } disabled={ activeTool === "image" }/>
                        <Tab value="그리기" onClick={ () => setActiveTool("drawing") } disabled={ activeTool === "drawing" }/>
                        <Tab value="지우개" onClick={ () => setActiveTool('eraser') } disabled={ activeTool === "eraser" }/>
                    </BottomSheetHeader>
                }
            >
                <Content>
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

export default DiaryEdit;