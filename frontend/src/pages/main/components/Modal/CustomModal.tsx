import { useState, useEffect } from "react";
import Modal from "@mui/material/Modal";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import { IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import styled from "styled-components";


const PaperWrapper = styled(Paper)`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: auto; // 너비를 자동으로 조절
  max-width: 90%; // 최대 너비는 화면의 90%로 설정
  height: auto; // 높이를 자동으로 조절
  max-height: 90vh; // 최대 높이는 화면의 높이의 90%로 설정
  overflow-y: auto; // 필요한 경우 내부 스크롤을 허용
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: start;
  padding: 20px;
`;

const BoxWrapper = styled(Box)`
  width: 80%;
  height: 20%;
  border-radius: 8px;
  border: 1px solid black;
  display: flex;
  justify-content: center;
  align-items: center;

  img {
    width: 20%;
    height: auto;
    border-radius: 8px;
    object-fit: cover; 
    align-items: center;
    overflow: hidden; 
  }
`;

const ModalContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%; 
`;


const CustomModal = ( props:ModalProps ) => {

  const {isOpen, closeModal, isFinish } = props

  const [keyImage, setSelectedImage] = useState(-1);
  const [searchName, setSearchName] = useState('');
  const [title, setTitle] = useState('');

  const handleInputChange = (event) => { 
    setSearchName(event.target.value); 
  };

  const handleTitleChange = (event) => { // 다이어리 제목
    setTitle(event.target.value);
  };

  const handleSelection = (index) => {  // 이미지 선택
    if(keyImage === index ){
      setSelectedImage(-1);
    }else{
      setSelectedImage(index);
    }
  };

  const handleSearch = () => {  //친구 검색
    if(searchName === '') {
      console.log('공백이야');
    } else {
      console.log(searchName);
    }
  };


  useEffect(() => {
    if (isOpen) {
      setSelectedImage(-1);
      setSearchName('');
      setTitle('');
    }
  }, [isOpen]); 


  return (
    <Modal open={isOpen} onClose={closeModal}>
      <PaperWrapper>
        <ModalContentWrapper>
        <div style={{ display: 'flex', justifyContent: 'center'}}>
            <h2>다이어리 추가</h2>
            <IconButton onClick={closeModal} sx={{ position: 'absolute', right: 8, top: 8, zIndex: 1 }}>
            <CloseIcon />
            </IconButton>
          </div>
          <div style={{ display: 'flex', justifyContent: 'center', flexDirection: 'column'}}>
            <h3>제목</h3>
            <div>
              <TextField id="outlined-basic" variant="outlined" value={title} onChange={ handleTitleChange }/>
            </div>
          </div>
            <h3>다이어리 표지</h3>
            <BoxWrapper>
            {[ 'diary1.png', 'diary2.png', 'diary3.png', 'diary4.png' ].map(( diaryImage, index ) => (
            <img
            key={index}
            src={`${process.env.PUBLIC_URL}/images/${diaryImage}`}
            alt={`Diary ${index + 1}`}
            onClick={() => handleSelection(index)}
            style={{
              borderRadius: '8px',
              objectFit: 'cover',
              cursor: 'pointer',
              transform: keyImage === index ? 'scale(1.5)' : 'scale(1)',
              transition: 'transform 0.3s ease',
              }}
            />
          ))}
          </BoxWrapper>
            <h3>친구 추가</h3>
            <div>
              <TextField id="outlined-basic" variant="outlined"
                value={searchName}
                onChange={handleInputChange}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <button onClick={handleSearch}>검색</button>
                    </InputAdornment>
                  ),
              }}
              />
            </div>
            <button onClick={() => isFinish ? isFinish({ title: title, key:keyImage, members:[] }) : null}>완료</button>

        </ModalContentWrapper>
      </PaperWrapper>
    </Modal>
  );
}

type ModalProps = {
  isOpen? : boolean;
  closeModal?: () => void;
  isFinish?: (props: addProps) => void;
}

type addProps = {
  title?: string;
  key?: number;
  members?: string[];
}


export default CustomModal;