import { format } from 'date-fns'
import useStore from '../store'
import tmp1 from 'src/asset/images/tmp1.png'
import styled from 'styled-components'

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

const TodoItemWrapper = styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
    margin:2px;
    background-color: #DEDCEE;
    border-radius: 10px;
    text-align: center;
`


const Day = ( props: DayProps ) =>{

    const { index, day } = props
    // const myLists = myCalendar?.filter(( list ) => list.datetime.substring(5, 10) === format( day, 'MM-dd' ))

    const { updateDate, updateModal } = useStore()

    const todos = ["Test1", 'Test2', 'Test3', "test4"]

    function listTodo (e, date): void{
        console.log(date)
        updateDate( date )
        updateModal()
    }

    
    return(
        <DayWrapper>
            
            <DayClick onClick={ (e) => listTodo(e, day) }>
            { format( day, 'd' ) }
            </DayClick>
            {/* { myLists?.map(( myList ) => {
                return(
                    <EmotionWrapper>
                        <img src={ myList.emotion } alt='' style={{ height: '100%' }}/>
                    </EmotionWrapper>
                    <div>
                        myList.todos?.map((todo) => (
                            <div>
                                { todo }
                            </div>
                        ))
                    </div>
                )
            })} */}
            <EmotionWrapper>
                <img src={ tmp1 } alt='' style={{ height: '100%' }}/>
            </EmotionWrapper>
            <TodoWrapper>

            {
                todos.slice(0, 2).map((todo, index) => (
                    <TodoItemWrapper key={index}>
                      {todo}
                    </TodoItemWrapper>
                  ))
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
    // myCalendar?: MyCalendarType[]
}