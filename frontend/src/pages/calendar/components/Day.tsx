import { format } from 'date-fns'
import useStore from '../store'
import styled from 'styled-components'
import angry from 'src/asset/images/emotion/angry.png'
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

    console.log('Day', calendars)

    const diaries = calendars?.diaries?.filter(( diary ) => diary?.date?.substring(5, 10) === format( day, 'MM-dd'))
    const todos = calendars?.schedules?.filter(( schedule ) => schedule?.date?.substring(5, 10) === format( day, 'MM-dd'))

    function listTodo (e, date): void{
        console.log(date)
        updateDate( date )
        updateModal()
    }

    const goMyDiary = () =>{
        // 여기 전체 데이터를 넘겨준다?
        navigator('/diary')
    }

    
    return(
        <DayWrapper>
            
            <DayClick onClick={ (e) => listTodo( e, day ) }>
            { format( day, 'd' ) }
            </DayClick>
            <EmotionWrapper onClick={ goMyDiary }>
                {
                    diaries?.map(( diary, index ) => {
                        return(
                            <img src={ angry } alt='' style={{ height: '100%' }} key={ index }/>
                        )
                    })
                }
                {/* <img src={ tmp1 } alt='' style={{ height: '100%' }}/> */}
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