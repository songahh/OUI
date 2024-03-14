import { format } from 'date-fns'
import { useNavigate } from 'react-router-dom'
import { LeftIcon, RightIcon } from 'src/components'
import styled from 'styled-components'

const TodoWrapper = styled.div<{ color: string }>`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 20%;
  font-size: 20px;
  border-radius: 10px;
  border: 0.4px solid #000;
  margin-bottom: 4px;
  background-color: ${ ( props ) => props.color };
`

const TodoCardHeader = styled.div`
    display: flex;
    margin: 1% 2%;
    justify-content: space-between;
`

const TodoTitle = styled.div`
    font-size: 24px;
`

const TodoBody = styled.div`
    font-size: 16px;
    margin: 2% 2%;
`


const TodoCard = ( props: TodoCardProps ) =>{

    const navigator = useNavigate();

    const { color } = props

    const editTodo = () =>{
        navigator( '/todo' )
    }
    
    const deletTodo = () =>{
        // axios로 delete하기
    }
    
    return(
        <TodoWrapper color={ color }>
            <TodoCardHeader>
                <TodoTitle>
                    SCHEDULE
                </TodoTitle>
                <div style={{ display:'flex', marginTop:'1%', gap: '2%'}}>
                <LeftIcon size= { 20 } onClick={ editTodo }/>
                <RightIcon size= { 20 } onClick={ deletTodo }/>
                </div>
            </TodoCardHeader>
            <TodoBody>
                    SCHEDULE DETAIL RECODE
            </TodoBody>
        </TodoWrapper>
    )
}

export default TodoCard;


type TodoCardProps = {
    children?: React.ReactNode
    color?: string
}