import { format } from 'date-fns';
import { Day } from '../components';
import { useQuery } from 'react-query';

import styled from 'styled-components'


const DayListWrapper = styled.div`
  display: flex;
  box-sizing: border-box;
  flex-direction: column;
  width: 100%;
  justify-content: space-around;
  margin-top: 10px;
  padding-bottom: 50px;
`

const WeekWrapper = styled.div`
  display: flex;
  box-sizing: border-box;
  flex-direction: row;
`

const DayList = ( props ) => {
  
  const { list } = props

  const cal = []
  for(let i = 0; i < list.length; i++) {
      i % 7 === 0  && cal.push([])
      cal[ cal.length - 1 ].push( list[i] )
  }

  const param = {
    startDate: `${ format( list[0], 'yyyy-MM-dd' )}`,
    endDate: `${ format( list[ list.length-1 ], 'yyyy-MM-dd' )}`,
  }
  
  // const { data: myCalednar } = useQuery<MyCalendarType[]>([ 'MyCalendar', param ], () => getMyCalendar( param ))


  return(
    <DayListWrapper>
      { cal?.map(( day, index ) => (
          <WeekWrapper key={ index }>
            { day?.map(( day, index ) => (
                  <Day day= { day } index={ index } key={ index } 
                  // myCalendar={ myCalendar }
                  />
            ))}
          </WeekWrapper>
      ))}
    </DayListWrapper>
  )
}

export default DayList