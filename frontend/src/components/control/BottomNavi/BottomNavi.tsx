import { useState } from 'react';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import NotificationsNoneOutlinedIcon from '@mui/icons-material/NotificationsNoneOutlined';
import MainLogo from 'src/asset/images/image-icon/logo.png';
import { useNavigate } from 'react-router-dom';
import useStore from 'src/store'
import styled from 'styled-components';
import AlarmModal from 'src/components/modal/AlarmModal';

const BottomNaviWrapper = styled( BottomNavigation )`
    background-color: white;
    display: flex;
    justify-content: space-between;
    position: fixed;
    bottom: 0;
    left: 50%;
    height: 8%;
    transform: translateX(-50%);
    max-width: 1024px;
    width: 100%;
`;

export default function BottomNavi() {
  const [value, setValue] = useState(0);

  const { isModalOpened, updateModal } = useStore()
  const [ isModalOpen, setIsModalOpen ] = useState( false );
  const navigator = useNavigate();

  const goMain = () => {
    navigator('/main');
  };

  const toggleModal = () => { 
    setIsModalOpen( !isModalOpen );
  }
  
  const viewMyPage = () =>{
    updateModal()
  }

  return (
    <>
      <BottomNaviWrapper
        showLabels
        value={value}
        onChange={( event, newValue ) => {
          setValue( newValue );
        }}
      >
        <BottomNavigationAction icon={<PersonOutlineOutlinedIcon style={{ width: '35%', height: '35%' }} />} onClick={ viewMyPage } />
        <BottomNavigationAction icon={<img src={ MainLogo } style={{ width: '35%', height: '35%' }} onClick={ goMain } />} />
        <BottomNavigationAction icon={<NotificationsNoneOutlinedIcon style={{ width: '35%', height: '35%' }} />} onClick={ toggleModal } />
      </BottomNaviWrapper>
      {isModalOpen && <AlarmModal isOpen={isModalOpen} closeModal={ toggleModal } />} 
    </>
  );
}
