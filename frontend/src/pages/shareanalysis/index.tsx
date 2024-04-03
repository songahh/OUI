import { Drawer } from "src/components/control/Drawer";
import { Button } from "src/components/control/Button";
import { Header } from "src/components/control/Header";
import { LeftIcon, RightIcon } from 'src/components'
import { getDiaryEmotion } from "./api";
import { addMonths, format, subMonths } from 'date-fns'
import { useQuery } from 'react-query'
import { getMember } from "./api";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    ArcElement,
    PointElement,
    LineElement,
    Tooltip,
} from "chart.js";
import { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import { BottomNavi } from "src/components/control/BottomNavi";
import useStore from 'src/store'
import useDate from 'src/util/date'
import Chart from "./components/Chart/Chart";
import styled from 'styled-components';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    ArcElement,
    Tooltip,
);

const BoxWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center; 
  align-items: center; 
  gap: 20px; 
  margin-top: 0px;
  border-radius: 4px;
  overflow: hidden;
  width: 89%;
  box-sizing: border-box; 
  padding: 0px 0px 120px 0px;
`;

const Title = styled.div`
    font-size: 37px;
    font-weight: 600;
    margin-left: 4%;
    margin-right: 4%;
    margin-top: 1.5%;
    justify-content: flex-start;
`

const TitleWrapper = styled.div`
    display: flex;
    justify-content: flex-start;
    align-items: center;
    width: 85%;
    font-size: 26.5px;
    text-align: left; 
    margin-left: 20px; 
    margin-top: 4%; 
    color: #262626;
    `


const CalendarHeaderMiddleWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 30px; 
  width: 100%;
  margin-top: 10px;
  flex: 1;
  color: #262626;
`


const ShareAnalysis = () => {

    const [ userName, setUserName ] = useState( "" );
    const { currentMonth, setCurrentMonth } = useDate()
    const [ personal, setPersonal ] = useState({});
    const [ myMonth, setMyMonth ] = useState({});
    const [ friendNames, setFriendNames ] = useState([]);
    const [ friendEmtoins, setFriendEmtioins ] = useState([]);
    const { diaryId } = useStore()
    const { data: memberData, refetch: refetchMember } = useQuery(['memberData'], getMember, {
        onSuccess: ( res ) => {
          setUserName( res.data.nickName );
        }
    });

    const movePrevMonth = () =>{ setCurrentMonth( subMonths( currentMonth, 1) )}
    const moveNextMonth = () => { setCurrentMonth( addMonths( currentMonth, 1) ) }
    const today = format(currentMonth, 'yyyy-MM-01')

    const getEmotion = () =>{
        getDiaryEmotion({ diaryId: diaryId, date:today }).then(( res )=>{
            setPersonal( res.data.myPersonalEmotion)
            setMyMonth(res.data.myMonthEmotion)
            if (res.data.members) {
                const names = res.data.members.map(member => member.memberName+" 님");
                const emotions = res.data.members.map(member => member.emotion);
                setFriendNames(names);
                setFriendEmtioins(emotions);
            }
        })
    }

    useEffect(() => {
        refetchMember();
        getEmotion();
    },[ currentMonth ]); 

    return(
        <>
                <Header>
                    <span style={{ marginTop: "39px", marginLeft: "8px" }}>
                        <Drawer />
                    </span>
                    <Button></Button>
                    <Button></Button>
                </Header>
                <CalendarHeaderMiddleWrapper>
                    <LeftIcon size= { 33 } onClick={ movePrevMonth }/>
                        <Title>{ format( currentMonth, 'yyyy' )}년 { format( currentMonth, 'M' )}월</Title>
                    <RightIcon size= { 33 } onClick={ moveNextMonth }/>
                </CalendarHeaderMiddleWrapper>
                <div style={{ marginLeft:'5%', width:'95%', display:"flex"}}>
                    { userName && <TitleWrapper><p style={{whiteSpace:'nowrap',textOverflow:'ellipsis',overflow:'hidden' ,width:'15%', paddingRight:'0.8%', paddingBottom:'1%'}}> { userName } </p>님이 { format( currentMonth, 'M' )}월에 느낀 <p style={{fontWeight:'bold', marginLeft: '1.5%' , marginRight:'1.5%'}}>“감정 통계”</p> 를 비교해보아요! </TitleWrapper>}
                </div>
                <div style={{display:'flex', flexDirection:'column', alignItems:'center'}}>
                    <BoxWrapper>
                      <Chart leftText={ '공유한 나의 감정' } rightText={['나만 보는 감정']} leftData={ myMonth } rightData={ personal } />
                    </BoxWrapper>
                </div>
                    <div style={{ marginLeft:'5%',marginTop: '-9%',width:'95%', display:"flex"}}>
                        { userName && <TitleWrapper><p style={{whiteSpace:'nowrap',textOverflow:'ellipsis',overflow:'hidden' ,width:'15%', paddingRight:'0.8%',paddingBottom:'1%'}}> { userName } </p> 님과 친구의 { format( currentMonth, 'M' )}월에 느낀 <p style={{fontWeight:'bold', marginLeft: '1.5%' , marginRight:'1.5%'}}>“감정 통계”</p>  를 비교해보아요! </TitleWrapper>}
                    </div>
                <div style={{display:'flex', flexDirection:'column', alignItems:'center'}}>
                    <BoxWrapper style={{marginBottom:'px' }}>
                        <Chart leftText={ `${userName} 님`} rightText={ friendNames } leftData={ myMonth } rightDataList={ friendEmtoins }/>
                    </BoxWrapper>
                </div>
                <BottomNavi/>
                
        </>
    );

}

// width: 100px; /* 또는 다른 고정값 혹은 비율 */
// white-space: nowrap; /* 텍스트를 한 줄로 만듭니다. */
// overflow: hidden; /* 넘치는 내용을 숨깁니다. */
// text-overflow: ellipsis; /* 넘치는 텍스트를 '...'으로 표시합니다. */
export default ShareAnalysis;
