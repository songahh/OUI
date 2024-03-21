import { useState, useEffect } from 'react';
import { Select, MenuItem } from '@mui/material';
import styled from 'styled-components';

const SelectLabel = styled.span`
  margin: 10px;
  font-size: 20px;
`;

const DateSelect = (props: DateSelectProps) => {
  const { onDateChange, dailyDate } = props;
  
  const [ year, setYear ] = useState(new Date(dailyDate).getFullYear());
  const [ month, setMonth ] = useState(new Date(dailyDate).getMonth() + 1);
  const [ day, setDay ] = useState(new Date(dailyDate).getDate());
  const [ daysInMonth, setDaysInMonth ] = useState([]);

  useEffect(() => {
    setYear(new Date(dailyDate).getFullYear());
    setMonth(new Date(dailyDate).getMonth() + 1);
    setDay(new Date(dailyDate).getDate());
  }, [ dailyDate]);

  useEffect(() => {
    const updateDaysInMonth = () => {
      const days = new Date(year, month, 0).getDate();
      let daysArray = Array.from({ length: days }, (_, i) => i + 1);

      // 현재 선택된 연도와 월이 오늘 날짜의 연도와 월과 같으면 오늘 일자 이후를 제거
      if (year === new Date().getFullYear() && month === new Date().getMonth() + 1) {
        daysArray = daysArray.filter(day => day <= new Date().getDate());
      }

      setDaysInMonth(daysArray);
    };

    updateDaysInMonth();

    const formattedDate = `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    onDateChange && onDateChange(formattedDate);
  }, [ year, month, day ]);

  return (
    <div>
      <Select 
        value={ year } 
        style={{ fontSize: "20px" }} 
        onChange={(e) => setYear(e.target.value as number)}
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
        onChange={(e) => setMonth(e.target.value as number)}
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
        onChange={(e) => setDay(e.target.value as number)}
        MenuProps={{
          PaperProps: {
            style: {
              maxHeight: 48 * 4.5 + 8,
            },
          },
        }}
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
  dailyDate: string,
  onDateChange?: (formattedDate: string) => void;
}


