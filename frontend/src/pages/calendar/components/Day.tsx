import { format } from 'date-fns'
import { MyModal }  from '../components'
import styled from 'styled-components'

const DayWrapper = styled.div<{ index: number }>`
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  width: 100%;
  height: 200px;
  border-bottom: 2px solid #000;
  padding: 10px 5px;
  font-size: 20px;
  color: 
  ${( props ) => props.index === 0 ? 'red' : ( props.index === 6 ? 'blue': 'black' )}
`


const Day = ( props: DayProps ) =>{

    const { index, day } = props

    const listTodo = () =>{

    }
    
    return(
        <DayWrapper index={ index }>
            <button onClick={ listTodo }>
            { format( day, 'd' ) }
            </button>
        </DayWrapper>
    )
}

export default Day;


type DayProps = {
    children?: React.ReactNode
    index?: number,
    day?: string
}