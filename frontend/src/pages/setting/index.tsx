import { useState, useEffect } from "react";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import Switch from '@mui/material/Switch';
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { Button } from "src/components/control/Button";
import { Header } from "src/components/control/Header";
import CheckCircle from 'src/asset/images/image-icon/checkCircle.png';
import diary1 from 'src/asset/images/diary1.png';
import diary2 from 'src/asset/images/diary2.png';
import diary3 from 'src/asset/images/diary3.png';
import diary4 from 'src/asset/images/diary4.png';
import diary5 from 'src/asset/images/diary5.png';
import searchBtn from 'src/asset/images/image-icon/search.png';
import { getFIndMember, getDiary, putModify, putDelete } from "./api";
import useStore from "src/store";
import { BottomNavi, Drawer } from "src/components";
import Swal from 'sweetalert2';

const PaperWrapper = styled( Paper )`
  width: 80%;
  height: 80%;
  max-height: 90vh;
  overflow-y: auto;
  margin: 0px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: start;
  padding: 20px 20px 40px 20px;
  margin-bottom: 17%;
  margin-top:3%;
  border-radius: 20px;
  background-color: #FFFEFC;
`;

const BoxWrapper = styled(Box)`
  width: auto;
  display: flex;
  justify-content: space-around;
  align-items: center;
  gap: 15px;
  border: 1px solid #ccc;
  padding: 10px;
  border-radius: 10px;
  margin-bottom: 50px;
`;

const ModalContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 95%;
  height: 100%;
`;

const DiaryImage = styled.img`
  border-radius: 8px;
  object-fit: cover;
  cursor: pointer;
  transition: transform 0.3s ease;
  width: 100%;
  height: auto;

  @media (max-width: 768px) {
    width: 100%;
  }

  @media (max-width: 480px) {
    width: 100%;
  }
`;

const ImageContainer = styled.div`
  position: relative;
  flex-basis: calc(25% - 40px);
  height: auto;
  border-radius: 8px;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;

  @media (max-width: 768px) {
    flex-basis: calc(50% - 40px);
  }

  @media (max-width: 480px) {
    flex-basis: 100%;
  }
`;

const SearchButton = styled.button`
  width: 35px;
  height: 30px;
  background-image: url(${ searchBtn });
  background-color: white;
  background-size: cover;
  border: none;
  cursor: pointer;
  color: transparent;
`;

const EntireWrapper = styled.div`
  width: 100%;
  height: auto;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const NotificationContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  font-size: 26px;
  font-weight: bold;
`;

const ExitWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  width: 100%;
  color: #a9a9a9; 
  text-decoration: underline; 
  cursor: pointer;
  font-size: 18px;
  margin-top: 5%;
`;

const Setting = () => {
  const [keyImage, setSelectedImage] = useState(-1);
  const [searchName, setSearchName] = useState('');
  const [title, setTitle] = useState('');
  const [ basicMembers, setBasicMembers ] = useState([]);
  const [memberList, setMemberList] = useState([]);
  const [switchState, setSwitchState] = useState( 0 );
  const { diaryId, type } = useStore();
  const label = { inputProps: { 'aria-label': 'Color switch demo' } };
  const navigator = useNavigate()

  useEffect(() => {
    getDiary( diaryId ).then(( res ) => {
      console.log( res.data )
      setTitle( res.data.name );
      setSelectedImage( res.data.templateId );
      if( res.data.alarm == 'ON' ){
        setSwitchState( 1 )
      }
      else{
        setSwitchState( 0 )
      }
      if ( res.data.memberList !== null ) {
        setBasicMembers( res.data.memberList );
      }
    });
  }, [diaryId]);

  const handleInputChange = ( event ) => {
    setSearchName(event.target.value);
  };

  const handleTitleChange = ( event ) => {
    setTitle(event.target.value);
  };

  const handleSelection = ( index ) => {
    setSelectedImage(index === keyImage ? null : index);
  };

  const handleSearch = () => {
    if (searchName !== '') {
      getFIndMember(searchName)
        .then((res) => {
          if (res !== undefined && !memberList.includes( searchName )) {
            setMemberList([ ...memberList, searchName ]);
          } else {
            // alert("검색 결과 없음");
            Swal.fire({
              text: '검색된 친구가 없습니다.',
              icon: 'error',
            });
          }
          setSearchName('');
        })
        .catch((err) => {
          console.error('Error:', err);
        });
    }
  };

  const modify = ( title, templateId, memberList, alarm ) => {
    
    putModify(diaryId, { name: title, templateId: templateId, alarm: alarm, memberList: memberList }).then(( res )=>{
      navigator('/main')
    })
  }
  
  const delelte = () =>{
    Swal.fire({
      text: "정말 이 다이어리에서 나가시겠습니까?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "네",
      confirmButtonColor: '#88B3E2',
      cancelButtonText: "아니요",
      cancelButtonColor: "#F09690",
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        putDelete(diaryId).then(( res )=>{
        })
        navigator('/main');
      }
    });
  }

  const handleSwitchChange = ( event ) => {
    setSwitchState(event.target.checked ? 1 : 0);
  };

  return (
    <>
      <Header>
        <span style={{ marginTop: "39px", marginLeft: "8px" }}>
            <Drawer />
        </span>
        <Button></Button>
        <Button></Button>
      </Header>
      <div style={{marginTop:'3%',textAlign:'center', fontSize:'40px'}}>설정</div>
      <EntireWrapper>
        <PaperWrapper>
          <ModalContentWrapper>
            <div style={{ display: 'flex', justifyContent: 'center', marginTop: '25px' }}>
            </div>
            <NotificationContainer>
              알림
              <div>
                <Switch onChange={ handleSwitchChange } {...label} checked={switchState === 1} />
              </div>
            </NotificationContainer>
            <div style={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', width: '100%' }}>
              <div style={{ marginBottom: '8px', marginTop: '15px' ,fontSize:'26px', fontWeight:'bold'}}>제목</div>
              <div>
                <TextField
                  id="outlined-basic"
                  variant="outlined"
                  value={title}
                  onChange={ handleTitleChange }
                  InputProps={{
                    style: { fontFamily:'JGaegujaengyi',fontSize: '23px', borderRadius: '10px' },
                  }}
                  style={{ width: '100%', backgroundColor: 'white' }}
                />
              </div>
            </div>
            <div style={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', width: '100%' }}>
            <div style={{ fontSize:'26px', fontWeight:'bold',marginBottom: '10px', marginTop: '50px' }}>다이어리 표지</div>
              <BoxWrapper>
                {[ diary1, diary2, diary3, diary4, diary5 ].map(( diaryImage, index ) => (
                  <ImageContainer
                    key={index}
                    onClick={() => handleSelection( index )}
                    style={{
                      border: keyImage === index ? '5px solid rgba(248, 224, 197, 0.35)' : 'none',
                    }}
                  >
                    <DiaryImage src={diaryImage} alt={`Diary ${index + 1}`} />
                    {keyImage === index && <img src={ CheckCircle } alt="Selected" style={{ position: 'absolute', color: 'green', fontSize: '48px' }} />}
                  </ImageContainer>
                ))}
              </BoxWrapper>
            </div>
            {type !== '개인' && (
              <>
                <div style={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', width: '100%' }}>
                  <div style={{ fontSize:'26px', fontWeight:'bold',marginBottom: '10px' }}>친구 추가</div>
                  <div style={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', width: '100%' }}>
                    <TextField
                      id="outlined-basic"
                      variant="outlined"
                      placeholder="이메일을 입력해주세요."
                      value={ searchName }
                      onChange={ handleInputChange }
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="start">
                            <SearchButton onClick={ handleSearch } />
                          </InputAdornment>
                        ),
                        style: { borderRadius: '10px', width: '100%', backgroundColor: 'white', fontFamily:'JGaegujaengyi',fontSize: '23px' },
                      }}
                    />
                  </div>
                  <div style={{  marginTop: '25px', display: 'flex', flexWrap: 'wrap', alignItems: 'start', gap: '10px' }}>
                    {basicMembers.length !== 0 &&
                      basicMembers.map(( email, index ) => (
                        <div
                          key={index}
                          style={{
                            border: '5px solid #F9F3EE',
                            backgroundColor: '#F9F3EE',
                            borderRadius: '6px',
                            boxShadow: '0px 3px 4px rgba(0, 0, 0, 0.1)',
                            fontSize: '21.5px',
                            paddingTop: '8px',
                            paddingBottom: '8px',
                            paddingLeft: '7px',
                            paddingRight: '7px',
                            display: 'flex',
                            alignItems: 'center',
                          }}
                        >
                          { email }
                        </div>
                      ))}
                      {memberList.length !== 0 &&
                      memberList.map(( email, index ) => (
                        <div
                          key={index}
                          style={{
                            border: '5px solid #F8E0C5',
                            backgroundColor: '#F8E0C5',
                            borderRadius: '6px',
                            boxShadow: '0px 3px 4px rgba(0, 0, 0, 0.1)',
                            fontSize: '21.5px',
                            paddingTop: '8px',
                            paddingBottom: '8px',
                            paddingLeft: '7px',
                            paddingRight: '7px',
                            display: 'flex',
                            alignItems: 'center',
                          }}
                        >
                          {email}
                          <button
                            onClick={() => setMemberList(memberList.filter(( e ) => e !== email))}
                            style={{ marginLeft: '15px', backgroundColor: 'transparent', border: 'none', cursor: 'pointer', fontWeight:'bold' }}
                          >
                            X
                          </button>
                        </div>
                      ))}
                  </div>
                </div>
                <ExitWrapper onClick={ delelte }>
                  나가기
                </ExitWrapper>
              </>
            )}

            <button
              style={{
                width: '100%', 
                height: '60px', 
                backgroundColor: '#88B3E2',
                color: 'white', // 텍스트 색상을 하얀색으로 지정
                border: 'none', // 테두리 없음
                borderRadius: '10px', // 둥근 모서리
                boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.2)', // 그림자 효과
                fontSize:'26px',
                marginTop: '3%'
              }} 
              onClick={() => {
                if (title !== '' && keyImage !== -1 && keyImage !== null) {
                  let text;
                  switchState === 1 ? text='ON' : text='OFF'
                  console.log(text)
                  modify(title, keyImage, memberList, text )
                } else {
                  if (title === '') {
                    // alert("제목을 입력해주세요.");
                    Swal.fire({
                      text: '제목을 입력해주세요."',
                      icon: 'warning',
                    });
                  } else if ( keyImage === -1  ||  keyImage === null ) {
                    // alert("다이어리 표지를 선택해주세요.");
                    Swal.fire({
                      text: '다이어리 표지를 선택해주세요.',
                      icon: 'warning',
                    });
                  }
                }
              }}
            >
              완  료
            </button>
          </ModalContentWrapper>
        </PaperWrapper>
      </EntireWrapper>
      <BottomNavi />
    </>
  );
};

export default Setting;
