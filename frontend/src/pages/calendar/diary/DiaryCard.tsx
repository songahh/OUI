import { format } from 'date-fns'
import edit from 'src/asset/images/edit.png'
import trash from 'src/asset/images/trash.png'
import useStore from '../store'
import joy from 'src/asset/images/emotion/joy.png'
import styled from 'styled-components'

const CardWrapper = styled.img`
  display: flex;
  height: 100%;
`

const TodoInside = styled.div`
  display: flex;
  height: 100%;
`

const TodoWrapper = styled.div`
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


const DiaryCard = ( props: TodoCardProps ) =>{


    const { diary } = props


    return(
        <TodoWrapper>
            <TodoInside>
            <CardWrapper src={ joy } />
            <div>
                <TodoCardHeader>
                    <TodoTitle>
                        'OOO'의 일기
                    </TodoTitle>
                    <div style={{ display:'flex', marginTop:'1%', gap: '2%'}}>
                    </div>
                </TodoCardHeader>
                <TodoBody>
                        Diary Contents Diary Contents Diary Contents Diary Content....
                </TodoBody>
            </div>
            </TodoInside>
        </TodoWrapper>
    )
}

export default DiaryCard;


type TodoCardProps = {
    children?: React.ReactNode
    diary?: string
}