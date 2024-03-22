import { useState } from "react";
import { Card } from "src/pages/main/components/Card";
import { Header } from "src/components/control/Header";
import { BottomNavi } from "src/components/control/BottomNavi";
import { Drawer } from "src/components/control/Drawer";
import { Button } from "src/components";
import { CustomModal } from "./components/Modal";
import { getDiary } from './api/getDiary';
import { useQuery } from 'react-query'
import Slider from "react-slick";
import { useNavigate } from 'react-router-dom'
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import styled from "styled-components";

const SliderWrapper = styled( Slider )`
  

  .slick-track{
    display: flex;
    margin: 0 -10px;

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

  .slick-center {
    transform: scale(1); 
    opacity: 1;
    display: flex;
    alignItems: center;
    justifyContent: center; 
    z-index: 10;
  }
`;

const Main = () => {

  const settings = {
    className: 'center',
    infinite: false,
    centerMode: true, 
    focusOnSelect: true,
    slidesToShow: 3,
    speed: 500,
  };

  const navigator = useNavigate()

  const [ isModalOpen, setIsModalOpen ] = useState( false );
  const [ diaryCount, setDiaryCount ] = useState(0); 
  const [ diaryList, setDiaryList ] = useState([]);
  const openModal = () => setIsModalOpen( true );
  const closeModal = () => {
    console.log( '모달 닫기!!!!!!' );
    setIsModalOpen( false );
  }

  const [cards, setCards] = useState([
    { id: 1, buttonText: "1", isDiary: "diary", type: '개인' },
    { id: 2, buttonText: "2", isDiary: "diary" , type: '개인'},
    { id: 3, buttonText: "3", isDiary: "diary", type: '개인' },
    { id: 4, buttonText: "4", isDiary: "diary", type: '공유' },
    { id: 5, buttonText: "카드 추가", isDiary: "addButton" },
  ]);


  const addCard = ( props:addProps ) => { // 카드 추가 완료
    console.log(props);
    const { title, key, members } = props;

    const newCardNumber = cards.length; 
    const newCards = cards.slice( 0, -1 ); 
    const newCard = { id: newCardNumber, buttonText: `${ key }`, isDiary: "diary" };
    const addButtonCard = cards[ cards.length - 1 ]; 
    setCards([ ...newCards, newCard, addButtonCard ]);
    console.log( '추가 완료!!!!!' );
    closeModal();
  };

  const moveDiary = (type) => {
    type=='개인' && 
    navigator('/calendar', {state : {diaryId: 1, type: '개인'}})
    type=='공유' && 
    navigator('/calendar', {state : {diaryId: 3, type: '공유'}})
  }


  return (
    <>
    <Header>
    <Drawer></Drawer>
    <Button path='/diary/write' btType='user' name="temp"></Button>
    </Header>
    <hr></hr>
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <div className="slider-container" style={{ minHeight: '100%', minWidth: '100%' }}>      
        <SliderWrapper { ...settings }>
        {cards.map(( card, index ) => (
          <div key={index}>
            <Card buttonText={ card.buttonText } onClick={ card.isDiary === "addButton" ? openModal : () => moveDiary(card?.type) } />
          </div> 
        ))}
          <Card/>
          <Card/>
        </SliderWrapper>
      </div>
    </div>
    <CustomModal isOpen={ isModalOpen } closeModal={ closeModal } isFinish={ addCard }></CustomModal>
    <BottomNavi></BottomNavi>
    </>
  );
}

type addProps = {
  title?: string;
  key?: number;
  members?: string[];
}

export default Main;