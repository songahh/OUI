import { format } from 'date-fns'
import useStore from '../store'
import styled from 'styled-components'
import angry from 'src/asset/images/emotion/angry.png'
import embarrass from 'src/asset/images/emotion/embarrass.png'
import joy from 'src/asset/images/emotion/joy.png'
import nervous from 'src/asset/images/emotion/nervous.png'
import relax from 'src/asset/images/emotion/relax.png'
import sad from 'src/asset/images/emotion/sad.png'
import { useNavigate } from 'react-router-dom'
import { MyCalendarType, ScheduleType } from 'src/types'

const DayWrapper = styled.div`
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  width: 100%;
  height: 200px;
  border-bottom: 2px solid #000;
  padding: 10px 5px;
  font-size: 20px;
`

const DayClick = styled.button`
    width: 20%; 
    border: none;
    background-color: transparent;
    outline: none;
    font-size: 20px;
`

const EmotionWrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    height: 50%;    
`

const TodoWrapper = styled.div`
    display: flex;
    flex-direction: column;
    height: 100%;
    overflow: hidden;
`
const TodoItemWrapperContainer = styled.div`
    width: 100%;
    height: 20px;
    display: flex;
    margin: 2px;
`
const TodoItemWrapper = styled.div`
    flex: 1;
    height: 16px;
    display: flex;
    justify-content: center;
    margin-top:2px;
    background-color: #DEDCEE;
    text-align: center;
`
const TodoHeaderWrapper = styled.div`
    width: 10px;
    background-color: #BDB5FF;
`


const Day = ( props: DayProps ) =>{

    const navigator = useNavigate()

    const { day, calendars } = props
    const { updateDate, updateModal } = useStore()


    const diaries = calendars?.diaries?.filter(( diary ) => diary?.date?.substring(5, 10) === format( day, 'MM-dd'))
    const todos = calendars?.schedules?.filter(( schedule ) => schedule?.date?.substring(5, 10) === format( day, 'MM-dd'))

    const emotionImg = {
        angry: angry,
        embarrass: embarrass,
        joy: joy,
        nervous: nervous,
        relax: relax,
        sad: sad,
    }

    function listTodo (e, date): void{
        updateDate( date )
        updateModal()
    }

    const goMyDiary = (diary) =>{
        console.log("diaryId",diary.diary.daily_diary_id)
        // 여기 전체 데이터를 넘겨준다?
        navigator(`/diary/${diary.diary.daily_diary_id}`, {state : {dailyDiaryId: diary.diary.daily_diary_id, type: diary.diary.type}})
    }


    
    return(
        <DayWrapper>
            
            <DayClick onClick={ (e) => listTodo( e, day ) }>
            { format( day, 'd' ) }
            </DayClick>
            <EmotionWrapper>
                {
                    diaries?.map(( diary, index ) => {
                        return(
                            <img src={ emotionImg[diary?.emotion.valueOf()] } alt=''
                            onClick={() =>goMyDiary({ diary })}
                            style={{ height: '100%' }} key={ index }/>
                        )
                    })
                }
            </EmotionWrapper>
            <TodoWrapper>
            {
                todos?.map(( todo, index ) =>{
                    if(index<3)
                    return(
                        <TodoItemWrapperContainer key={ index }>
                            <TodoHeaderWrapper/>
                            <TodoItemWrapper/>
                        </TodoItemWrapperContainer>
                    )
                })
            }
            </TodoWrapper>
        </DayWrapper>
    )
}

export default Day;


type DayProps = {
    children?: React.ReactNode
    index?: number,
    day?: string,
    calendars: MyCalendarType
}