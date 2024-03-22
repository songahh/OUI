import { format } from 'date-fns'
import edit from 'src/asset/images/edit.png'
import trash from 'src/asset/images/trash.png'
import useStore from '../store'
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


    const { modalContent, setModalContent } = useStore();

    const { color } = props

    const editTodo = () =>{
        setModalContent()
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
                <img onClick={ editTodo } src={ edit } alt ='' style={{ width: '30px', height: '30px'}}/>
                <img onClick={ deletTodo } src={ trash } alt ='' style={{ width: '30px', height: '30px'}}/>
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