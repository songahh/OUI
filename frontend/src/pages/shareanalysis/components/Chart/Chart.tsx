import { useEffect, useState } from 'react';
import { Doughnut } from "react-chartjs-2";
import { getMember } from '../../api';
import { useQuery } from 'react-query'
import angry from 'src/asset/images/emotion/angry.png';
import embarrassed from 'src/asset/images/emotion/embarrass.png';
import happy from 'src/asset/images/emotion/joy.png';
import doubtful from 'src/asset/images/emotion/nervous.png';
import comfortable from 'src/asset/images/emotion/relax.png';
import sad from 'src/asset/images/emotion/sad.png';
import styled from "@emotion/styled";


const IconWrapper = styled.div`
  max-width: 1024px;
  display: flex;
  flex-direction: row; 
  justify-content: space-evenly; 
  flex-wrap: wrap; 
  margin: auto; 

  img, div {
    flex: 1 1 auto;
    max-width: 100px; 
    margin: 10px; 
    height: auto; 

    @media (max-width: 768px) {
      max-width: 50px; 
    }
  }
`;
const ChartBoxWrapper = styled.div`
  background-color: white; 
  border-radius: 10px; 
  padding: 20px; 
  margin: 20px 0; 
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  justify-content: center; 
  align-items: center;
  @media (max-width: 768px) {
    width: 95%; 
    padding: 15px;
  }

  @media (max-width: 480px) {
    width: 100%; 
    padding: 10px;
  }
`;

const EmotionTagWrapper = styled.div`
  font-family: 'IMHyeMin', sans-serif; 
  font-size: 25px;
  font-weight: bold;
  color: #333;
  margin-top: 8px; // 간격 조정 예시
`;

const EmotionScoreWrapper = styled.div`
  font-family: 'IMHyeMin', sans-serif; 
  font-size: 18px;
  font-weight: bold;
  color: #666;
  margin-bottom: 12px;
`;

const ImageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
`;

const DoughnutWrapper = styled.div`
  width: 100%;
  height: auto;
  margin: auto; 
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
`;

const ChartContainer = styled.div`
  flex: 1;
  padding: 20px;
  transition: transform 0.2s ease-in-out;
  display: flex;
  flex-direction: column; 
  align-items: center; 
`;

const NameBox = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-evenly; // 컨테이너를 균등하게 배치
`;

const TextContainer = styled.div`
  display: flex;
  justify-content: center; 
  align-items: center; 
  width: 50%;
`;

const Text = styled.div<{ isSelected?: boolean }>`
  display: flex;
  justify-content: center; 
  align-items: center; 
  width: 50%;
  background-color: #F9F3EE;
  font-size: 16px;
  border-radius: 6px;
  height: 40px;
  font-weight: bold;
  color: ${(props) => (props.isSelected ? "#CCCCCC" : "black")};
`
const SelectWrapper = styled.select<SelectWrapperProps>`
  padding: 8px 16px;
  font-size: 16px;
  border-radius: 6px;
  font-weight: bold;
  text-align-last: center;
  background-color: #F9F3EE;
  color: black;
  border: 0px;
  width: 50%; 
  height: 40px;
  &:disabled {
    opacity: 1;
  }
  color: ${(props) => (props.isSelected ? "#CCCCCC" : "black")};
  ${(props) => props.nameLength === 1 && `
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  background-image: none; // 화살표 이미지 제거
`}
`;


const Chart = ({ leftText, rightText }) => {

  const tags = {
    sad: '슬픔',
    doubtful: '불안',
    angry: '분노',
    embarrassed: '당황',
    comfortable: '느긋',
    happy: '기쁨',

  }

  const images = {
    sad: sad,
    doubtful: doubtful,
    angry: angry,
    embarrassed: embarrassed,
    comfortable: comfortable,
    happy: happy,
  };


  const initialChartData = [
    {
      labels: ['sad', 'doubtful', 'angry', 'embarrassed', 'comfortable', 'happy'],
      datasets: [
        {
          data: [65, 59, 80, 81, 56, 55],
          backgroundColor: ['#C0DEFF', '#BDB5FF', '#F09690', '#BBDED6', '#FFC814', '#FFDD6B'],
        },
        {
          data: [28, 48, 40, 19, 86, 27], 
          backgroundColor: ['#C0DEFF', '#BDB5FF', '#F09690', '#BBDED6', '#FFC814', '#FFDD6B'],
        },
      ],
    },
  ];


  const [ chartData, setChartData ] = useState(initialChartData)

  const [ emotionScores, setEmotionScores ] = useState({ });
  const [ selectedChart, setSelectedChart ] = useState( null ); 
  const [selectedName, setSelectedName] = useState(rightText[0] || ''); 

  const handleClick = ( chartIndex ) => () => {
    if (selectedChart === chartIndex) {
      setSelectedChart(null);
      setEmotionScores({}); 
    } else {
      setSelectedChart(chartIndex);
      const selectedData = chartData[0].datasets[chartIndex].data;
      const newEmotionScores = chartData[0].labels.reduce((acc, label, index) => {
        acc[label] = selectedData[index];
        return acc;
      }, {});
      setEmotionScores(newEmotionScores);
    }
  };


  const handleNameChange = (e) => {
    setSelectedName(e.target.value);
  };




  return(
      <>
          <ChartBoxWrapper>
            <NameBox>
              <TextContainer><Text isSelected={selectedChart !== null && selectedChart !== 0}>{ leftText }</Text></TextContainer>
              <TextContainer>
              <SelectWrapper onChange={handleNameChange} value={selectedName} nameLength={rightText.length} disabled={rightText.length === 1}
               isSelected={selectedChart !== null && selectedChart === 0} >
                {rightText.map((name, index) => (
                  <option key={index} value={name}> {`${name}${rightText.length > 1 ? "님의 감정" : ""}`} </option>))}
              </SelectWrapper>
              </TextContainer>
            </NameBox>
            <DoughnutWrapper>
            {[0, 1].map(( index ) => (
            <ChartContainer
              key={ index }
              style={{ transform: selectedChart === index ? 'scale(1.1)' : selectedChart !== null ? 'scale(0.9)' : 'scale(1)' }}>
              <Doughnut
                data={ chartData[0] }
                options={{ onClick: handleClick( index )}}/>
            </ChartContainer>
          ))}  
            </DoughnutWrapper>
            <IconWrapper>
              {Object.entries( images ).map(([ emotion, image ], index ) => (
                <ImageWrapper  key={ index }>
                  <img src={ image } alt={ emotion } />
                  <EmotionTagWrapper>{tags[ emotion ]}</EmotionTagWrapper>
                  <EmotionScoreWrapper>{emotionScores[ tags[ emotion ]] || 0}%</EmotionScoreWrapper>
                </ImageWrapper >
              ))}
            </IconWrapper>
          </ChartBoxWrapper>

      </>
      
  );
}

type SelectWrapperProps = {
  nameLength: number;
  isSelected?: boolean;
}

export default Chart;