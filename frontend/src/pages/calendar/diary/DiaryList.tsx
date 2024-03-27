import styled from "styled-components"
import DiaryCard from "./DiaryCard"
import useStore from "../store"

const TodoListWrapper = styled.div`
  display: flex;
  box-sizing: border-box;
  flex-direction: column;
  width: 100%;
  justify-content: space-around;
  margin-top: 20px;
  padding-bottom: 12px;
`

const TodoList = () => {

    const { clickDate } = useStore()


    const diaries = ['1','2','3','4','5']

  return(
    <TodoListWrapper>
      {
        diaries?.map( ( diary, index ) => {
          return(
            <DiaryCard key={ index } diary = { diary }>
              !!
            </DiaryCard>
          )
        })
      }
    </TodoListWrapper>
  )
}

export default TodoList