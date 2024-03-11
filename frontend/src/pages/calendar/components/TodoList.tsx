import styled from "styled-components"
import TodoCard from "./TodoCard"

const TodoListWrapper = styled.div`
  display: flex;
  box-sizing: border-box;
  flex-direction: column;
  width: 100%;
  justify-content: space-around;
  margin-top: 20px;
  padding-bottom: 12px;
  border-bottom: 2px solid #000;
`

const TodoList = () => {

    const colors = [ '#BBDED6', '#FFE17D', '#C0DEFF', '#F7EDE2', '#A1A7C4' ] 

  return(
    <TodoListWrapper>
      {
        colors?.map( ( color, index ) => {
          return(
            <TodoCard key={ index } color={ color }>
              !!
            </TodoCard>
          )
        })
      }
    </TodoListWrapper>
  )
}

export default TodoList