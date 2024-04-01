import { useState, useEffect } from "react";
import { Card } from "src/pages/main/components/Card";
import { Header } from "src/components/control/Header";
import { Button } from "src/components";
import { CustomModal } from "./components/Modal";
import { AlarmModal } from "src/components/modal";
import { getDiary, getMember, postCreateDiary, postDeviceToken, getLogout } from './api';
import profile from 'src/asset/images/profile.png'
import logoutBtn from 'src/asset/images/image-icon/logout.png'
import alarmIcon from 'src/asset/images/icon/alarm-icon.svg'
import { useQuery } from 'react-query'
import Slider from "react-slick";
import useStore from 'src/store'
import { useNavigate } from 'react-router-dom'
import { messaging } from 'src/firebase'; 
import { getToken } from "firebase/messaging";
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import styled from "styled-components";


const CarouselContainer = styled.div`
  max-width: 100%;
  // margin: auto;
  overflow: hidden; 
  padding: 20px 0; 
`;

const SliderWrapper = styled( Slider )`
  
  .slick-track{
    display: flex;
    margin: 0 -125px;
  }

  .slick-slide {
    padding:0;
    display: flex;
    align-items: center;
    justify-content: center;
    transform: scale(0.8); 
    opacity: 0.5;
    transition: transform 0.5s ease, opacity 0.5s ease;
  }

  .slick-slide > div { 
    width: 100%;
    height: 100%;
    background-size: cover;
    background-position: center;
  }

  .slick-center {
    transform: scale(1); 
    opacity: 1;
    display: flex;
    alignItems: center;
    justifyContent: center; 
    z-index: 10;
  }

  .slick-slide:not(.slick-center) > div {
    background-image: none !important; 
  }

`;


const YellowBox = styled.div`
  width: 750px;
  height: 5.5vh;
  background-color: rgba(255, 225, 125, 0.6);
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
  display: flex;
  justify-content: center;
  margin-top: 12vh;
  margin-bottom: 1vh;
  align-items: center;
  margin-left: 6%;
  @media (max-width: 768px) {
    margin-left: 2%; 
    width: 50vw;
  }

  @media (max-width: 480px) {
    margin-left: 1%; 
    width: 50vw;
    height: 4vh;
  }
  position: relative;
`;

const UserRecord = styled.div`
  width: 750px;
  margin-bottom: 8%;
  margin-left: 8%
  background: transparent;
  padding: 5px 10px;
  border: 0px;
  font-size: 59px;
  font-weight: bold;
  font-family: "Dovemayo",
  @media (max-width: 768px) {
    font-size: 35px;
    top: -30px; 
  }

  @media (max-width: 480px) {
    font-size: 20px;
    top: -20px; 
  }
`;

const ProfileImage = styled.img`
  width: 50%;
  max-width: 190px;
  max-height: 190px;
  border-radius: 50%;
  object-fit: cover;
  margin-top: 25%;
  margin-left: 8%;
`;

const requestPermission = async () => {
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register("/firebase-messaging-sw.js").then(registration => {
        registration.update(); // 서비스 워커 갱신 강제 실행
        console.log('Service Worker 등록 성공:', registration);
  Notification.requestPermission().then(permission => {
    if (permission === 'granted') {
      console.log('알림 권한 승인됨.');

      navigator.serviceWorker.ready.then((registration) => {
        getToken(messaging, {
          serviceWorkerRegistration: registration,
          vapidKey: process.env.REACT_APP_VAPID_KEY
        }).then((currentToken) => {
          if (currentToken) {
            console.log("디바이스 토큰:", currentToken);
            postDeviceToken(currentToken) 
              .then(response => {
                console.log('Device token posted successfully:', response);
              })
              .catch((error) => {
                console.error('Error posting device token:', error);
              });
          } else {
            console.log('디바이스 토큰을 가져올 수 없습니다. 알림 권한을 요청해주세요.');
          }
        }).catch((err) => {
          console.error('토큰 가져오기 실패:', err);
        });
      });
    } else {
      console.log('알림 권한 거부됨.');
      showAlertToChangePermission();
    }
  });
})}}

function showAlertToChangePermission() {
  alert('알림을 받기 위해서는 브라우저 설정에서 알림 권한을 허용해주세요.');
}


const Main = () => {

  const settings = {
    className: 'center',
    infinite: false,
    centerMode: true, 
    focusOnSelect: true,
    slidesToShow: 3,
    speed: 500,
    accessibility: true,
  };

  const navigator = useNavigate()
  
  const { setDiaryId, setType, setAccessToken, setIsLogin, setDailyDiaryId } = useStore()
  const [ isModalOpen, setIsModalOpen ] = useState( false );
  const [ diaryList, setDiaryList ] = useState( [] );
  const [ userName, setUserName ] = useState( "" );
  const [ userImage, setUserImage ] = useState( null );
  const [ modalSubmitted, setModalSubmitted ] = useState( false );
  const [ alarmModalOpen, setAlarmModalOpen ] = useState(false);

  const openModal = () => setIsModalOpen( true );
  const closeModal = () => {
    console.log( '모달 닫기!!!!!!' );
    setIsModalOpen( false );
  }

  const addCard = ( props: { title: string; key: number; members: String[]; } ) => {
    const { title, key, members } = props;
    const templateId = key; 
    const data = {
      diaryName: title,
      templateId: templateId,
      members: members,
    };
  
    try {
      const response = postCreateDiary( data ).then(
        ()=>{
          setModalSubmitted( true );
        }
      );
      console.log( '추가추가:', response );
      closeModal();
    } catch ( error ) {
      console.error( '생성실패:', error );
    }
  };

  const cards = diaryList.map(( diary ) => ({
    id: diary.diaryId,
    buttonText: diary.createdAt,
    isDiary: "diary",
    template: diary.templateId,
    title: diary.diaryName,
    type: diary.type,
  })).concat({
    id: diaryList.length,
    buttonText: "",
    isDiary: "addButton",
    template: -1,
    title: "",
    type: "",
  });

  const moveDiary = ( type: string, id: number ) => {
    setDiaryId( id )
    setType( type )
    type === '개인' &&
      navigator('/calendar') 
    type === '공유' && 
    navigator(`/calendar/${ id }`)
  }

  const { data: diaryData, refetch: refetchDiary } = useQuery(['diaryData'], getDiary, {
    onSuccess: ( res ) => {
      const updatedDiaryList = res.data.map(( diary: { createdAt: any[]; }) => ({
        ...diary,
        createdAt: `${ diary.createdAt[0] }.${ diary.createdAt[1] }.${ diary.createdAt[2] }`,
      }));
      setDiaryList( updatedDiaryList );
      console.log( res.data );
    }
  });
  
  const { data: memberData, refetch: refetchMember } = useQuery(['memberData'], getMember, {
    onSuccess: ( res ) => {
      setUserImage( res.data.img );
      setUserName( res.data.nickName );
      console.log( res.data );
    }
  });


  function isHangul(str) {
    const pattern = /[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/;
    return pattern.test(str);
  }
  

  const Logout = () =>{
    getLogout().then(( res )=>{
      setAccessToken('')
      setIsLogin(false)
      setDiaryId(null)
      setType('')
      setDailyDiaryId(null)
      navigator('/login')
    })
  }

  
  useEffect(() => {
    if ( modalSubmitted ) {
      refetchDiary();
      refetchMember();
      setModalSubmitted( false );
    }
  }, [ modalSubmitted, refetchDiary, refetchMember]);
  
  useEffect(() => {
    if (!alarmModalOpen) {
      refetchDiary();
    }
  }, [alarmModalOpen, refetchDiary]);

  useEffect(()=>{
    requestPermission();
  },[])


  return (
    <>
    <div style={{paddingRight:'4%', paddingTop:'4%'}}>
      <Header>
        <ProfileImage src={ userImage || profile } alt="유저 프로필 이미지" />
        <div style={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center' }}>
          <button style={{backgroundColor:'transparent', border:'none', marginRight:'10px'}} onClick={() => Logout()}>
          <img style={{height:'4em'}} src={logoutBtn} alt="Logout" />
          </button>
          <button style={{backgroundColor:'transparent', border:'none', marginRight:'10px'}} onClick={() => setAlarmModalOpen(true)}>
          <img style={{height:'4.3em'}} src={alarmIcon} alt="Logout" />
          </button>
        </div>
      </Header>
    </div>
    <YellowBox>
      <UserRecord>
      {isHangul(userName) ? (userName.length > 6 ? `${userName.slice(0, 6)}...` : userName) : (userName.length > 10 ? `${userName.slice(0, 10)}...` : userName)} 님의 감정기록 :)
      </UserRecord>
    </YellowBox>

    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <CarouselContainer>
      {/* <div className="slider-container" style={{ minHeight: '100%', minWidth: '100%' }}>       */}
        <SliderWrapper { ...settings }>
        {cards.map(( card, index ) => (
          <div key={index}>
            <Card buttonText={ card.buttonText } templateId={ card.template } title={ card.title }
              onClick={ card.isDiary === "addButton" ? openModal : () => moveDiary( card?.type, card.id ) } />
                </div> 
               ))}
            <Card/>
        </SliderWrapper>
      </CarouselContainer>
      {/* </div> */}
    </div>
    <AlarmModal isOpen={ alarmModalOpen } closeModal={() => setAlarmModalOpen(false)} />
    <CustomModal isOpen={ isModalOpen } closeModal={ closeModal } isFinish={ addCard } />
    </>
  );
}

export default Main;