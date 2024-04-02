import { useEffect, useState } from 'react';
import { Doughnut } from "react-chartjs-2";
import { getMonthly, getMember } from '../../api';
import { LeftIcon, RightIcon } from 'src/components'
import { addMonths, format, subMonths } from 'date-fns'
import useStore from 'src/store';
import useDate from 'src/util/date'
import { useQuery } from 'react-query'
import angry from 'src/asset/images/emotion/angry.png';
import embarrassed from 'src/asset/images/emotion/embarrass.png';
import happy from 'src/asset/images/emotion/joy.png';
import doubtful from 'src/asset/images/emotion/nervous.png';
import comfortable from 'src/asset/images/emotion/relax.png';
import sad from 'src/asset/images/emotion/sad.png';
import styled from "@emotion/styled";


const IconWrapper = styled.div`
  width: 100%;
  display: flex;
  margin-top: 6%;

  img, div {
    flex: 1 1 auto;
    width: 100%; 
    margin-left: 8px; 
    margin-right: 8px;
    height: auto; 

    @media (max-width: 768px) {
      max-width: 50px; 
    }
  }
`;
const ChartBoxWrapper = styled.div`
  background-color: #FFFEFC; 
  border-radius: 15px; 
  padding: 20px;
  width: 85%; 
  margin-top: 20px; 
  margin-bottom: 10px; 
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
  font-size: 25px;
  color: #333;
`;

const EmotionScoreWrapper = styled.div`
  font-size: 22px;
  color: #666;
  margin-bottom: 20%;
`;

const ImageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
`;

const TitleWrapper = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  width: 85%;
  font-size: 28px;
  text-align: left; 
  margin-top: 4%;
`;

const DoughnutWrapper = styled.div`
  width: 75%;
  height: auto;
  margin: auto; 
  display: flex;
  justify-content: center;
  margin-top: 4%;

  @media (max-width: 768px) {
    width: 90%;
  }
`;

const CalendarHeaderMiddleWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 30px; 
  width: 85%;
  margin-top: 10px;
  flex: 1;
`

const Title = styled.div`
    font-size: 37px;
    font-weight: 600;
    margin-left: 4%;
    margin-right: 4%;
    margin-top: 1.5%;
    justify-content: flex-start;
`


const Monthly = () => {

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

  const colors = {
    sad: '#C0DEFF',
    doubtful: '#BDB5FF',
    angry: '#F09690',
    embarrassed: '#BBDED6',
    comfortable: '#FFC814',
    happy: '#FFDD6B',
  }

  const { diaryId } = useStore()
  const [ chartData, setChartData ] = useState({
      labels: [],
      datasets: [],
  });
  const [ emotionScores, setEmotionScores ] = useState({});
  const [ userName, setUserName ] = useState( "" );
  const { currentMonth, setCurrentMonth } = useDate() 
  const today = format(currentMonth, 'yyyy-MM-01')

  const movePrevMonth = () =>{ setCurrentMonth( subMonths( currentMonth, 1) ) }
  const moveNextMonth = () => { setCurrentMonth( addMonths( currentMonth, 1) ) }

  const { data: memberData, refetch: refetchMember } = useQuery(['memberData'], getMember, {
    onSuccess: ( res ) => {
      setUserName( res.data.nickName );
      console.log( res.data );
    }
  });

  useEffect(() => {

      getMonthly({ diaryId: diaryId, date: today }).then(
      res => {
        const emotionLabels = Object.keys(res.data);
        const emotionData = Object.values(res.data).map(score => (score as number));
        const backgroundColors = emotionLabels.map(emotion => colors[emotion] || '#CCCCCC'); 
        const emotiontags = emotionLabels.map(label => tags[label] || label);

        const scores = emotionLabels.reduce((acc, label, index) => {
          acc[tags[label] || label] = emotionData[index];
          return acc;
        }, {});
        setEmotionScores(scores);
        console.log(scores)

        setChartData({
            labels: emotiontags,
            datasets: [{
                data: emotionData,
                fill: true,
                backgroundColor: backgroundColors,
                borderColor: 'transparent',
            }]
        });
    })
      .catch(error =>{
        alert("감정을 가져오지 못했습니다")
      })
      refetchMember();
  }, [ currentMonth ]); 

  return(
      <>
          <CalendarHeaderMiddleWrapper>
              <LeftIcon size= { 33 } onClick={ movePrevMonth }/>
              <Title>{ format( currentMonth, 'yyyy' )}년 { format( currentMonth, 'M' )}월</Title>
              <RightIcon size= { 33 } onClick={ moveNextMonth }/>
          </CalendarHeaderMiddleWrapper>
           { userName && <TitleWrapper> { userName } 님이 3월에 느낀 <p style={{fontWeight:'bold', marginLeft: '1.5%' , marginRight:'1.5%'}}> “감정 통계”</p> 예요! </TitleWrapper>}
          <ChartBoxWrapper>
              <DoughnutWrapper>
                <Doughnut data={chartData}></Doughnut>
              </DoughnutWrapper>

            <IconWrapper>
              {Object.entries(images).map(([emotion, image], index) => (
                <ImageWrapper  key={index}>
                  <img src={image} alt={emotion} />
                  <div style={{marginTop:'10%', display:'flex', flexDirection:'column', alignItems:'center'}}>
                  <EmotionTagWrapper>{tags[emotion]}</EmotionTagWrapper>
                  <EmotionScoreWrapper>{emotionScores[tags[emotion]] || 0}%</EmotionScoreWrapper>
                  </div>
                </ImageWrapper >
              ))}
            </IconWrapper>
          </ChartBoxWrapper>
      </>
      
  );
}
export default Monthly;