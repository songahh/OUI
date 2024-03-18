import styled from "styled-components"

const DateListWrapper = styled.div`
  display: flex;
  box-sizing: border-box;
  flex-direction: rows;
  width: 100%;
  font-weight: bold;
  justify-content: space-around;
  margin-top: 20px;
  padding-bottom: 12px;
  border-bottom: 2px solid #000;
`

const DateList = () => {

  const date = [ 'SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'  ]

  return(
    <DateListWrapper>
      {
        date?.map( ( day, index ) => {
          return(
            <div key={ index }>
              { day }
            </div>
          )
        })
      }
    </DateListWrapper>
  )
}

export default DateList