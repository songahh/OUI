import { useState } from 'react';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import alarmIcon from 'src/asset/images/icon/alarm-icon.svg'
import mypageIcon from 'src/asset/images/icon/mypage-icon.svg'
import MainLogo from 'src/asset/images/image-icon/logo.png';
import { useNavigate } from 'react-router-dom';
import useStore from 'src/store'
import styled from 'styled-components';
import AlarmModal from 'src/components/modal/AlarmModal';
import MyPage from 'src/components/control/MyPage/MyPage';

const BottomNaviWrapper = styled( BottomNavigation )`
    background-color: white;
    display: flex;
    justify-content: space-around;
    position: fixed;
    bottom: 0;
    left: 50%;
    height: 7%;
    transform: translateX(-50%);
    max-width: 1024px;
    width: 100%;
`;

export default function BottomNavi() {
  const [value, setValue] = useState(0);

  // const { isModalOpened, updateModal } = useStore()
  const [ isModalOpen, setIsModalOpen ] = useState( false );

  const [ isMyPageOpen, setIsMyPageOpen ] = useState( false );
  const navigator = useNavigate();

  const goMain = () => {
    navigator('/main');
  };

  const toggleModal = () => { 
    setIsModalOpen( !isModalOpen );
  }

  const toggleMyPage = () => { 
    setIsMyPageOpen( !isMyPageOpen );
  }
  
  // const viewMyPage = () =>{
  //   updateModal()
  // }

  return (
    <>
      <BottomNaviWrapper
        showLabels
        value={value}
        onChange={( event, newValue ) => {
          setValue( newValue );
        }}
      >
        <BottomNavigationAction icon={<img style={{ width: '47px', height: '47px' }} src={ mypageIcon } alt="MyPage" />} onClick={ toggleMyPage } />
        <BottomNavigationAction icon={<img src={ MainLogo } style={{ width: '45px', height: '45px' }} onClick={ goMain } alt="Logo" />} />
        <BottomNavigationAction icon={<img style={{ width: '35px', height: '35px' }} src={ alarmIcon } alt="Alarm" />} onClick={ toggleModal } />
      </BottomNaviWrapper>
      {isModalOpen && <AlarmModal isOpen={isModalOpen} closeModal={ toggleModal } />} 
      {isMyPageOpen && <MyPage isOpen={isMyPageOpen} closeModal={ toggleMyPage } />} 
    </>
  );
}
