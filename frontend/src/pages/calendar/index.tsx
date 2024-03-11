import { useEffect, useState } from 'react';
import { addDays, addMonths, format, subMonths } from 'date-fns'
import { DateList, DayList, MyModal }  from './components'
import { useNavigate } from 'react-router-dom'
import { LeftIcon, RightIcon } from 'src/components'
import { useQuery } from 'react-query'
import { createPortal } from 'react-dom'
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

const ModalBackground = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 400;
`

const Modal = styled.div`
    width: 100%;
    height: 50%;
    background-color: #FFF;
    position: fixed;
    bottom: 0;
    box-shadow: 0px -3px 0px 0px rgba(211, 211, 211, 0.2);
    border-radius: 10px 10px 0 0;
`

const Calendar = () => {

  const navigator = useNavigate()

  const { currentMonth, setCurrentMonth, calculateDateRange } = useDate()
  const { startDate, endDate } = calculateDateRange()
  const [ isModalOpened, setIsModalOpened ] = useState<boolean>( false )

  const html = document.querySelector( 'html' )

  const openModal = () => {
     setIsModalOpened( !isModalOpened )
      html?.classList.add( 'scroll-locked' )
  }
  const closeModal = () => {
      setIsModalOpened( !isModalOpened )
      html?.classList.remove( 'scroll-locked' )
  }

  const ModalPortal = ({ children, onClose  }) => {
    const handleBackgroundClick = (e) => {
      ( e.target === e.currentTarget ) && onClose()
    }
    return createPortal(
      <ModalBackground onClick={ handleBackgroundClick }>
        <Modal>{ children }</Modal>
      </ModalBackground>,
      document.body
    )
  }
  
  const move = () => {
    navigator( '/home' )
  }

  const days = []
  let day = startDate

  while( day < endDate ){
    days.push( day )
    day = addDays( day, 1 )
  }

  const movePrevMonth = () =>{ setCurrentMonth( subMonths( currentMonth, 1) ) }
  const moveNextMonth = () => { setCurrentMonth( addMonths( currentMonth, 1) ) }



  return(
          <CalendarWrapper>
            <CalendarHeaderWrapper>
              <LeftIcon size= { 20 } onClick={ movePrevMonth }/>
              <Title>{ format( currentMonth, 'yyyy' )}년 { format( currentMonth, 'M' )}월</Title>
              <RightIcon size= { 20 } onClick={ moveNextMonth }/>
            </CalendarHeaderWrapper>
            <button onClick={ openModal }>
        모달창 오픈!
        </button>
        { 
          isModalOpened 
          && createPortal(
            <ModalPortal onClose={ closeModal }>
              <Modal><MyModal></MyModal></Modal>
            </ModalPortal>,
            document.body )
        }
            <DateList/>
            <DayList list = { days }/>
            <button onClick={ move }>!!!</button>
          </CalendarWrapper>
        
  )
}

export default Calendar