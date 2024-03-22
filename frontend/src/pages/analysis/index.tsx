import { Drawer } from "src/components/control/Drawer";
import { Button } from "src/components/control/Button";
import { Header } from "src/components/control/Header";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    ArcElement,
    PointElement,
    LineElement,
    Tooltip,
} from "chart.js";
import { useState } from "react";
import { Line } from "react-chartjs-2";
import { Switch } from "./components/Switch";
import { BottomNavi } from "src/components/control/BottomNavi";
import styled from 'styled-components';
import Monthly from "./components/Monthly/Monthly";

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    ArcElement,
    Tooltip,
);


const SwitchWrapper = styled(Switch)`
    display: flex;
    margin-left: auto;
`;

const BoxWrapper = styled.div`
    border-radius: 4px;
    display: flex;
    flex-direction: column;
    padding: 5px;
    justify-content: center;
    align-items: center;
    overflow: hidden; 
`;


const GraphWrapper = styled.div`
    width: 100%;
    max-width: 800px; 
    height: 30vh; 
    margin: auto; 

    @media (max-width: 768px) {
        height: 25vh; 
    }

    @media (max-width: 480px) {
        height: 20vh;
    }
`;



const Analysis = () => {

    const [ keyType, setKeyType ] = useState( 1 ); 

    const happyData = {
        labels: [ '일', '월', '화', '수', '목', '금', '토'],
        datasets: [
          {
            data: [33, 53, 85, 41, 44, 65,10],
            fill: true,
            backgroundColor: "white",
            borderColor: "#FFDD6B",
            pointBackgroundColor: "#FFDD6B",
            pointBorderWidth: 2,
            pointBorderColor: "#FFC814",
            
          }
        ]
    };

    const sadData = {
        labels: [ '일', '월', '화', '수', '목', '금', '토'],
        datasets: [
          {
            data: [33, 53, 85, 41, 44, 65,10],
            fill: true,
            backgroundColor: "white",
            borderColor: "#C0DEFF",
            pointBackgroundColor: "#C0DEFF",
            pointBorderWidth: 2,
            pointBorderColor: "#88B3E2",
            
          }
        ]
    };


    const options = {
        scales: {
            x: {
                grid: {
                    color: 'rgba(0, 0, 0, 0.1',
                },
                border: {
                    dash: [8,4],
                },  
            },
            y: {
                grid: {
                    color: 'rgba(0, 0, 0, 0.1',
                },
                border: {
                    dash: [8,4],
                },  
            }
        }
    };
    return(
        <>
                <Header>
                    <Drawer></Drawer>
                    <Button></Button>
                    <Button></Button>
                </Header>

                <SwitchWrapper setKeyType={ setKeyType } keyType={ keyType } ></SwitchWrapper>
                    <BoxWrapper>
                    {keyType === 2 && (
                        <>
                            <div>
                                <div style={{ fontFamily: 'IMHyeMin', fontWeight: 'bold', fontSize: '16px' }}>
                                    공유일 님의 이번 주 “행복 그래프” 예요!
                                </div>
                                <GraphWrapper>
                                    <Line data={ happyData } options={ options } />
                                </GraphWrapper>
                                

                            </div>
                            <div>
                                <div style={{ fontFamily: 'IMHyeMin', fontWeight: 'bold', fontSize: '16px' }}>
                                    공유일 님의 이번 주 “우울 그래프” 예요!
                                </div>
                                <GraphWrapper>
                                    <Line data={ sadData }  options={ options }/>
                                </GraphWrapper>
                            </div>

                        </>
                    )}
                    {keyType === 1 && (
                        <>
                            <Monthly></Monthly>
                        </>
                    )}
                    </BoxWrapper>
                    <BottomNavi/>
                
        </>
    );

}

export default Analysis;