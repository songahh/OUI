import { format } from 'date-fns'
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
    
    return(
        <DayWrapper index={ index }>
            { format( day, 'd' ) }
        </DayWrapper>
    )
}

export default Day;


type DayProps = {
    children?: React.ReactNode
    index?: number,
    day?: string
}