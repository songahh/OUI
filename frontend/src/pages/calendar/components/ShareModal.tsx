import styled, { css } from "styled-components"
import useStore from "../store"
import TodoList from "../todo/TodoList"
import { format } from "date-fns"
import Todo from "../todo"
import { useState } from "react"
import { DiaryList } from "../diary"

const ShareModalWrapper = styled.div`
  margin: auto; 
  max-width: 1024px; 
  width: 100%; 
  display: flex;
  flex-direction: column;
  height: 100%;
  overflow: auto;
`
const ModalHeaderWrapper = styled.div`
  display: flex;
  height: 100%;
  align-items: flex-end;
  background-color: #F8E0C5;
`

const HeaderBoxWrapper = styled.button<{color: string}>`
  background-color: #fff;
  margin-top: 10px;
  margin-left: 20px;
  width: 10%;
  border: none;
  cursor: pointer;
  transparent: 0.2;
  border-radius: 5px;
  height: 40px;
  ${(props) =>
    props.color ==='trans' &&
    css`
      background-color: rgba(255, 255, 255, 0.8); 
      color: gray;
    `}
`

const DateWrapper = styled.div`
    display: flex;
    justify-content: flex-end;
    font-size: 12px;
    margin: 1% 2%;
`

const PlusButton = styled.button`
  border: 1px solid;
  height: 10%;
  width: 100%;
  background-color: #fff;
  border-radius: 6px;
  font-size: 1.5rem;
  cursor: pointer;
`

const ShareModal = (props) => {

  const { diaries, diaryId } = props

  const [ modalContent, setModalContent ] = useState(true);
  const [ isSchedule, setIsSchedule ] = useState(true);

  const { clickDate } = useStore()

  const createTodo = () =>{
    setModalContent(!modalContent)
  }

  const ClickSchedule = () =>{
    setIsSchedule(true);
    setModalContent(true);
  }

  const ClickDiary = () =>{
    setIsSchedule(false);
    setModalContent(false);
  }

  return(
    <ShareModalWrapper>
      { modalContent && isSchedule &&  // 일정 리스트 나열
      <>
      <ModalHeaderWrapper>
        <HeaderBoxWrapper color= 'white' onClick={ ClickSchedule }>일정</HeaderBoxWrapper>
        <HeaderBoxWrapper color= 'trans' onClick={ ClickDiary }>일기</HeaderBoxWrapper>
      </ModalHeaderWrapper>
      <DateWrapper> { format(clickDate, 'yyyy-MM-dd' ) }</DateWrapper>
        <PlusButton onClick={ createTodo }>+</PlusButton>
        <TodoList/>
      </>
      }
      {
        !modalContent && isSchedule &&  // 일정 작성
        <>
        <ModalHeaderWrapper>
        <HeaderBoxWrapper color= 'white' onClick={ ClickSchedule }>일정</HeaderBoxWrapper>
        <HeaderBoxWrapper color= 'trans' onClick={ ClickDiary }>일기</HeaderBoxWrapper>
      </ModalHeaderWrapper>
        <Todo type='공유'/>
        </>
      }

      {
        !modalContent && !isSchedule &&  //일기 리스트 나열
        <>
        <ModalHeaderWrapper>
            <HeaderBoxWrapper color= 'trans' onClick={ ClickSchedule }>일정</HeaderBoxWrapper>
            <HeaderBoxWrapper color= 'white' onClick={ ClickDiary }>일기</HeaderBoxWrapper>
        </ModalHeaderWrapper>
        <DateWrapper> { format(clickDate, 'yyyy-MM-dd' ) }</DateWrapper>
        <DiaryList diaries = { diaries } diaryId = { diaryId }/>
        </>
      }
    </ShareModalWrapper>
  )
}

export default ShareModal