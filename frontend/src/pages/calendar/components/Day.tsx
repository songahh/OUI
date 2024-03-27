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
    height: 100%;
    position: relative;
`

const EmotionIcon = styled.img`
    height: 100%;
    position: absolute;
`

const TodoWrapper = styled.div`
    display: flex;
    flex-direction: column;
    height: 100%;
    overflow: hidden;
    justify-content: end;
`

const TodoItemWrapperContainer = styled.div`
    width: 100%;
    height: 20px;
    display: flex;
    margin: 2px;
`

const TodoItemWrapper = styled.div<{ color: string }>`
    flex: 1;
    height: 16px;
    display: flex;
    justify-content: center;
    margin-top:2px;
    background-color: ${ ( props ) => props.color };
    text-align: center;
`

const TodoHeaderWrapper = styled.div<{color: string}>`
    width: 10px;
    background-color: ${ ( props ) => props.color };
`



const Day = ( props: DayProps ) =>{

    const navigator = useNavigate()

    const { day, calendars, type } = props
    const { updateDate, updateModal } = useStore()

    const emotionPositions = [
        { top: '0', left: '20%' }, // 첫 번째 이모티콘 위치
        { top: '10%', left: '30%' }, // 두 번째 이모티콘 위치
        { top: '20%', left: '40%' }
    ]
    


    let diaries = null
    let todos = null

    if ( type === '개인' ) {
        diaries = calendars?.diaries?.filter(( diary ) => diary?.date?.substring( 5, 10 ) === format( day, 'MM-dd'))
        todos = calendars?.schedules?.filter(( schedule ) => schedule?.date?.substring( 5, 10 ) === format( day, 'MM-dd'))
    } else {
        diaries = calendars?.members?.flatMap( member => member?.diaries )?.filter( diary => {
            if ( diary && diary.date ) {
                const currentDate = format( day, 'MM-dd' )
                const diaryDate = diary.date.substring( 5, 10 )

                return diaryDate === currentDate
            }
            return false
        })

        todos = calendars?.members?.flatMap( member => member?.schedules )?.filter( schedule => {
            if ( schedule && schedule.date ) {
                const currentDate = format( day, 'MM-dd' )
                const diaryDate = schedule.date.substring( 5, 10 )

                return diaryDate === currentDate
            }
            return false
        })
    
    }


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

    const goMyDiary = ( diary, date ) =>{
        if ( type === '개인' ) {

            navigator(`/diary/${diary.diary.daily_diary_id}`, {state : { dailyDiaryId: diary.diary.daily_diary_id, type: diary.diary.type }})
            } else {
                updateDate( date )
                updateModal()
            }
        }


    
    return(
        <DayWrapper>
            <DayClick onClick={(e) => listTodo( e, day ) }>
            { format( day, 'd' ) }
            </DayClick>
            <EmotionWrapper>
                { diaries?.map((diary, index) => (
                    <EmotionIcon 
                        src={emotionImg[diary?.emotion.valueOf()]} 
                        alt='' 
                        onClick={(e) => goMyDiary({ diary }, day)} 
                        style={{ ...emotionPositions[index] }} // 이모티콘 위치조정
                        key={index}
                    />
                ))}
            </EmotionWrapper>
            <TodoWrapper>
            {
                todos?.map(( todo, index ) => {
                    if(index<3)
                    return(
                        <TodoItemWrapperContainer key={ index }>
                            <TodoHeaderWrapper color={ todo?.color }/>
                            <TodoItemWrapper color={ todo?.color }/>
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
    type?: string,
    calendars: any
}