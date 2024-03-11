import { useEffect, useState } from 'react';
import { addDays, addMonths, format, subMonths } from 'date-fns'
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


const Home = () => {


  return(
          <Title>"!"</Title>
  )
}

export default Home