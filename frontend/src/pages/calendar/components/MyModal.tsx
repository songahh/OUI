import styled from "styled-components"
import TodoList from "./TodoList"

const MyModalWrapper = styled.div`
  width: 80%;
  display: flex;
  flex-direction: column;
  height: 100%;
  margin-left: 10%;
  overflow: auto;
`
const ModalHeaderWrapper = styled.div`
  display: flex;
  margin-left: 1%;
  margin-top: 3%;
  margin-bottom: 2%;
  align-items: flex-end;
`

const PlusButton = styled.button`
  border: 1px solid;
  height: 10%;
  width: 100%;
  background-color: #fff;
  border-radius: 10px;
  font-size: 1.5rem;
  cursor: pointer;
`

const MyModal = () => {

  const createTodo = () =>{

  }

  return(
    <MyModalWrapper>
      <ModalHeaderWrapper>
        <div style={{ fontSize:'30px'}}>일정</div>
        <div style={{ fontSize: '20px', marginLeft: '2%' }}> 2024.03.11</div>
      </ModalHeaderWrapper>
        <PlusButton onClick={ createTodo }>+</PlusButton>
        <TodoList/>
    </MyModalWrapper>
  )
}

export default MyModal