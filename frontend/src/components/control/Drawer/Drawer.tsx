import * as React from 'react';
import { Button } from '../Button';
import {
  Box,
  SwipeableDrawer as Bottom, 
  List,
  Divider,
  ListItemText,
  IconButton,
  Typography
} from '@mui/material';
import { useNavigate } from 'react-router-dom'
import CloseIcon from '@mui/icons-material/Close';
import useStore from 'src/store'
import { useQuery } from 'react-query';
import { getDiaryTitle } from 'src/pages/calendar/api';
import styled from 'styled-components';
import todayDiary from 'src/asset/images/image-icon/todayDiary.png'
import Calendar from 'src/asset/images/image-icon/Calendar.png'
import analysis from 'src/asset/images/image-icon/analysis.png'
import setting from 'src/asset/images/image-icon/setting.png'
const BottomWrapper = styled( Bottom )`
    max-width: 1024px;
    width: 100%;
    display: flex;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
` 

const TitleWrapper = styled.div`
  font-size: 30px;
  display: flex;
  font-weight: bold;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 60px; 
  text-align: center; 
  background-color: #FFFEFC;
  margin-top: 0.5%;
  margin-bottom: -0.4%
`;

const HamburgerBtn = styled.button`
  border: none;
  width: 100%;
  display: flex;
  background-color: #FFFEFC;
  align-items: center;
  margin-left: 4%;
  margin-bottom: 1%
`

const Drawer = () => {
    const [ open, setOpen ] = React.useState( false );
    const navigator = useNavigate()
    const { diaryId, dailyDiaryId, type } = useStore()
    const toggleDrawer = ( newOpen: boolean ) => () => {
      setOpen( newOpen );
    };

    const goWriteDiary = () => {
      navigator(`/diary/write/${ diaryId }`)
    }

    const goCalendar = () => {
      type === '개인' &&
        navigator('/calendar') 
      type === '공유' && 
        navigator(`/calendar/${ diaryId }`)
    }

    const goAnalysis = () => {
      type === '개인' &&
        navigator('/analysis') 
      type === '공유' && 
        navigator(`/shareanalysis`)
    }

    const { data: diaryTitle } = useQuery( 'diaryTitle', () => getDiaryTitle( diaryId ))

    const goSetting = () => {
      navigator( '/setting' )
    }

  
    const DrawerList = (
      <Box role="presentation">
        <TitleWrapper>
          { diaryTitle?.data }
        </TitleWrapper>
        <Divider/>
        <List>
        {/* 오늘의 일기 */}
          <HamburgerBtn onClick={goWriteDiary}>
              <img width={'28px'} src={todayDiary} alt='오늘의 일기'/>
              <ListItemText primary={<Typography fontFamily="JGaegujaengyi" fontSize={'23px'} display={'flex'} marginLeft={'2%'} marginTop={'0.8%'}> 오늘의 일기</Typography>} />
          </HamburgerBtn>
          <HamburgerBtn onClick={goCalendar}>
              <img width={'28px'} src={Calendar} alt='오늘의 일기'/>
              <ListItemText primary={<Typography fontFamily="JGaegujaengyi" fontSize={'23px'} display={'flex'} marginLeft={'2%'} marginTop={'0.5%'}> 캘린더</Typography>} />
          </HamburgerBtn>
          <HamburgerBtn onClick={goAnalysis}>
              <img width={'28px'} src={analysis} alt='오늘의 일기'/>
              <ListItemText primary={<Typography fontFamily="JGaegujaengyi" fontSize={'23px'} display={'flex'} marginLeft={'2%'} marginTop={'0.8%'}> 감정 통계</Typography>} />
          </HamburgerBtn>
          <HamburgerBtn onClick={goSetting}>
              <img width={'28px'} src={setting} alt='오늘의 일기'/>
              <ListItemText primary={<Typography fontFamily="JGaegujaengyi" fontSize={'23px'} display={'flex'} marginLeft={'2%'} marginTop={'0.8%'}> 설정</Typography>} />
          </HamburgerBtn>
        </List>
      </Box>
    );
    
    return(
        <div>
          <Button btType='hamburger' name="temp" onButtonClick={ toggleDrawer( true )}/>
          <BottomWrapper anchor={'bottom'} open={ open }
                        onClose={ toggleDrawer( false )} onOpen={toggleDrawer( true )} >
            <IconButton onClick={ toggleDrawer( false )}
                            sx={{ position: 'absolute', right: 8, top: 8, zIndex: 1 }} >
              <CloseIcon /> 
            </IconButton>
                { DrawerList }
          </BottomWrapper>
        </div>   
    );

}
export default Drawer;