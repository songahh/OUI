import { useState, useEffect } from 'react';
import { Select, MenuItem } from '@mui/material';
import styled from 'styled-components';

const SelectLabel = styled.span`
  margin: 10px;
  font-size: 20px;
`;

const DateSelect = (props: DateSelectProps) => {
  const { onDateChange } = props;

  const initialYear = new Date().getFullYear();
  const initialMonth = new Date().getMonth() + 1;
  const initialDay = new Date().getDate();

  const [year, setYear] = useState(initialYear);
  const [month, setMonth] = useState(initialMonth);
  const [day, setDay] = useState(initialDay);
  const [daysInMonth, setDaysInMonth] = useState([]);

  useEffect(() => {
    const updateDaysInMonth = () => {
      const days = new Date(year, month, 0).getDate();
      let daysArray = Array.from({ length: days }, (_, i) => i + 1);
      
      // 현재 선택된 연도와 월이 오늘 날짜의 연도와 월과 같으면 오늘 일자 이후를 제거
      if (year === new Date().getFullYear() && month === new Date().getMonth() + 1) {
        daysArray = daysArray.filter(day => day <= new Date().getDate());
      }
      
      setDaysInMonth(daysArray);

      // 현재 선택된 일자가 새로운 월에 존재하지 않는 경우, 마지막 날짜로 설정
      if (!daysArray.includes(day)) {
        setDay(daysArray[daysArray.length - 1]);
      }
    };

    updateDaysInMonth();

    const formattedDate = `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    onDateChange && onDateChange(formattedDate);
  }, [ year, month, day, onDateChange ]);

  const handleYearChange = (e) => {
    const selectedYear = parseInt(e.target.value, 10);
    setYear(selectedYear);
  };

  const handleMonthChange = (e) => {
    const selectedMonth = parseInt(e.target.value, 10);
    setMonth(selectedMonth);
  };

  const handleDayChange = (e) => {
    const selectedDay = parseInt(e.target.value, 10);
    setDay(selectedDay);
  };

  return (
    <div>
      <Select 
        value={ year } 
        style={{ fontSize: "20px" }} 
        onChange={ handleYearChange }
        MenuProps={{
          PaperProps: {
            style: {
              maxHeight: 48 * 4.5 + 8,
            },
          },
        }}
      >
        {Array.from({ length: 10 }, (_, i) => new Date().getFullYear() - i).map((year) => (
          <MenuItem key={ year } value={ year }>
            { year }
          </MenuItem>
        ))}
      </Select>
      <SelectLabel>년</SelectLabel>
      <Select 
        value={ month } 
        style={{ fontSize: "20px" }} 
        onChange={ handleMonthChange }
        MenuProps={{
          PaperProps: {
            style: {
              maxHeight: 48 * 4.5 + 8,
            },
          },
        }}
      >
        {Array.from({ length: 12 }, (_, i) => i + 1).map((month) => (
          <MenuItem key={ month } value={ month }>
            { month }
          </MenuItem>
        ))}
      </Select>
      <SelectLabel>월</SelectLabel>
      <Select 
        value={ day } 
        style={{ fontSize: "20px" }} 
        onChange={ handleDayChange }
        MenuProps={{
          PaperProps: {
            style: {
              maxHeight: 48 * 4.5 + 8,
            },
          },
        }}
        multiple={ false}
      >
        {daysInMonth.map((day) => (
          <MenuItem key={ day } value={ day }>
            { day }
          </MenuItem>
        ))}
      </Select>
      <SelectLabel>일</SelectLabel>
    </div>
  );
};

export default DateSelect;

type DateSelectProps = {
  onDateChange?: (formattedDate: string) => void;
}