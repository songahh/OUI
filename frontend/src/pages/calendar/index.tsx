import { addDays, addMonths, format, subMonths } from 'date-fns'
import { DateList, DayList }  from './components'
import { LeftIcon, RightIcon } from 'src/components'
import { useEffect } from 'react'
import useStore from './store'
import { useQuery } from 'react-query'
import useDate from 'src/util/date'
import styled from 'styled-components'

const Title = styled.div`
    font-size: 20px;
    font-weight: 600;
    margin-bottom: 10px;
`

const CalendarWrapper = styled.div`
  box-sizing: border-box;
  display: flex;
  width: 100%;
  height: 100%;
  align-items: center;
  flex-direction: column
`

const CalendarHeaderWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 30px; 
  margin-top: 10px;
`

const Calendar = () => {

    const{ isMonth, updateIsMonth } = useStore()

  const { currentMonth, setCurrentMonth, calculateDateRange } = useDate()
  const { startDate, endDate } = calculateDateRange()

  const days = []
  let day = startDate

  while( day < endDate ){
    days.push( day )
    day = addDays( day, 1 )
  }

  const movePrevMonth = () =>{ setCurrentMonth( subMonths( currentMonth, 1) ) }
  const moveNextMonth = () => { setCurrentMonth( addMonths( currentMonth, 1) ) }
  const onMoveHandler = () => { 
    updateIsMonth() 
  }
  
  const param = {
    startDate: `${ format( days[0], 'yyyy-MM-dd' )}`,
    endDate: `${ format( days[ days.length-1 ], 'yyyy-MM-dd')}`,
  }
 

  return(
          <CalendarWrapper>
            <CalendarHeaderWrapper>
              <LeftIcon size= { 20 } onClick={ movePrevMonth }/>
              <Title>{ format( currentMonth, 'yyyy' )}년 { format( currentMonth, 'M' )}월</Title>
              <RightIcon size= { 20 } onClick={ moveNextMonth }/>
            </CalendarHeaderWrapper>
            <DateList/>
            <DayList list = { days }/>
          </CalendarWrapper>
        
  )
}

export default Calendar