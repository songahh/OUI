import { useEffect, useState } from "react";
import Modal from "@mui/material/Modal";
import Paper from "@mui/material/Paper";
import { IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { AlarmMessage } from "./components";
import { getAlarm } from "./api";
import useStore from "src/store";
import { postAccept, postRefuse, postRead } from './api/'
import styled from "styled-components";


const PaperWrapper = styled( Paper )`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 75%; 
  max-width: 900px; 
  height: 60%; 
  max-height: 90vh; 
  overflow-y: auto; 
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: start;
  padding: 20px;
  border-radius: 15px;
`;

const StyledPaper = styled(Paper)`
  width: 100%; 
  height: 95%;
  margin-top: 6%;
  padding: 20px 40px; 
  box-sizing: border-box;
  overflow-y: auto; 
  border: none;
  box-shadow: none;
`;

const MainWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  margin-bottom: 10px; 
`;

const TitleWrapper = styled.div`
  text-align: center;
  flex-grow: 1;
  font-size: 32px;
  font-weight: bold;
`;

const DeleteWrapper = styled.div`
  cursor: pointer;
  text-align: center;
  width: 100%;
  display: flex;
  justify-content: flex-end;
  margin-top: 10px;
  margin-bottom: 0px;
  margin-right: 20px;
  padding-bottom: 0px;
  font-size: 20px;
`;

const AlarmWrapper = styled.div`
  border-top: 2px solid #9E9D9D;
  border-bottom: 2px solid #9E9D9D;
  height: 84%;
  overflow-y: auto;
  overflow-x: hidden;
`;

function AlarmModal({ isOpen, closeModal }) {

  const [ alarmList, setAlarmList ] = useState([ ]);
  const [alarmUpdateFlag, setAlarmUpdateFlag] = useState(false);
  const { setDailyDiaryId } = useStore()


  const fetchAlarms = () => {
    getAlarm().then((res) => {
      setAlarmList([ ...res.data ]);
      console.log( res.data )
    }).catch((err) => {
      console.log(err);
    });
  };

  const Accept = ( diaryId: number ) => {
    postAccept({ diaryId }).then(() => {
      console.log("수락");
      fetchAlarms(); 
    });
  };

  const Refuse = ( diaryId: number ) => {
    postRefuse({ diaryId }).then(() => {
      console.log("거절");
      fetchAlarms(); 
    });
  };

  const goDiary = ( link: String, alarmId: number ) => {
    if(link !== null){
      const array = link.split("/")
      setDailyDiaryId(Number(array[array.length - 1]))
      postRead({ alarmId }).then(()=>{
        window.location.href = `${ link }`;
      })
    }
  }

  useEffect(()=>{
    if (isOpen) {
      fetchAlarms();
    }
  }, [isOpen, alarmUpdateFlag])

  return (
    <Modal open={ isOpen } onClose={closeModal}>
      <PaperWrapper>
        <IconButton onClick={closeModal} sx={{ position: 'absolute', right: 22, top: 20, zIndex: 2 }}>
          <CloseIcon />
        </IconButton>
        <StyledPaper elevation={2}>
          <MainWrapper>
            <div style={{ width: "50px" }}></div>
            <TitleWrapper>알림</TitleWrapper>
            <DeleteWrapper onClick={() => console.log('삭제삭제')}>전체 삭제</DeleteWrapper>          
          </MainWrapper>
          <AlarmWrapper>
          {
            alarmList.map((alarm, index) => (
              <AlarmMessage key={index} Type={ alarm.alarmContentType } Title={ alarm.title } Content={ alarm.content } diaryId={alarm.diaryId}
              Accept={Accept} Refuse={Refuse} onClick={ goDiary } link = { alarm.link } alarmId = { alarm.alarmId }
              />
            ))
          }
          </AlarmWrapper>
        </StyledPaper>
      </PaperWrapper>
    </Modal>
  );
}

export default AlarmModal;