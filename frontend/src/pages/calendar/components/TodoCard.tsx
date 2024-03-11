import { format } from 'date-fns'
import styled from 'styled-components'

const TodoWrapper = styled.button<{ color: string }>`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 80px;
  font-size: 20px;
  border-radius: 10px;
  border: 0.4px solid #000;
  margin-bottom: 4px;
  cursor: pointer;
  background-color: ${ ( props ) => props.color };
`


const TodoCard = ( props: TodoCardProps ) =>{

    const { children, color } = props

    const editTodo = () =>{

    }
    
    return(
        <TodoWrapper color={ color } onClick={ editTodo } >
            { children }
        </TodoWrapper>
    )
}

export default TodoCard;


type TodoCardProps = {
    children?: React.ReactNode
    color?: string
}