import { useState, useEffect } from "react";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import Switch from '@mui/material/Switch';
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
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
  padding: 20px;
  margin-bottom: 10%;
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
  height: calc(100vh - 120px);
  display: flex;
  align-items: center;
  justify-content: center;
`;

const NotificationContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  font-size: 24px;
  font-weight: bold;
`;

const ExitWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  width: 100%;
  color: #a9a9a9; 
  text-decoration: underline; 
  cursor: pointer;
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
            alert("검색 결과 없음");
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
    putDelete(diaryId).then(( res )=>{
      navigator('/main')
    })
  }

  const handleSwitchChange = ( event ) => {
    setSwitchState(event.target.checked ? 1 : 0);
  };

  return (
    <>
      <Drawer />
      <EntireWrapper>
        <PaperWrapper>
          <ModalContentWrapper>
            <div style={{ display: 'flex', justifyContent: 'center', marginTop: '25px' }}>
              <h1>다이어리 수정</h1>
            </div>
            <NotificationContainer>
              알림
              <div>
                <Switch onChange={ handleSwitchChange } {...label} checked={switchState === 1} />
              </div>
            </NotificationContainer>
            <div style={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', width: '100%' }}>
              <h2 style={{ marginBottom: '8px', marginTop: '15px' }}>제목</h2>
              <div>
                <TextField
                  id="outlined-basic"
                  variant="outlined"
                  value={title}
                  onChange={ handleTitleChange }
                  InputProps={{
                    style: { fontFamily: 'Dovemayo', fontSize: '20px', borderRadius: '10px' },
                  }}
                  style={{ width: '100%', backgroundColor: 'white' }}
                />
              </div>
            </div>
            <div style={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', width: '100%' }}>
              <h2 style={{ marginBottom: '5px', marginTop: '35px' }}>다이어리 표지</h2>
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
                  <h2 style={{ marginBottom: '10px', marginTop: '35px' }}>친구 추가</h2>
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
                        style: { borderRadius: '10px', width: '100%', backgroundColor: 'white', fontFamily: 'Dovemayo', fontSize: '21.5px' },
                      }}
                    />
                  </div>
                  <div style={{ height: '100px', marginTop: '25px', display: 'flex', flexWrap: 'wrap', alignItems: 'start', gap: '10px' }}>
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
                  </div>
                  <h3>추가된 친구</h3>
                  <div style={{ height: '100px', marginTop: '25px', display: 'flex', flexWrap: 'wrap', alignItems: 'start', gap: '10px' }}>
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
                width: '90%',
                height: '60px',
                marginTop: '5%',
                backgroundColor: '#88B3E2',
                color: 'white',
                border: 'none',
                borderRadius: '10px',
                boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.2)',
                fontSize: '22px',
                bottom: '4%',
              }}
              onClick={() => {
                if (title !== '' && keyImage !== -1 && keyImage !== null) {
                  let text;
                  switchState === 1 ? text='ON' : text='OFF'
                  console.log(text)
                  modify(title, keyImage, memberList, text )
                } else {
                  if (title === '') {
                    alert("제목을 입력해주세요.");
                  } else if ( keyImage === -1  ||  keyImage === null ) {
                    alert("다이어리 표지를 선택해주세요.");
                  }
                }
              }}
            >
              완료
            </button>
          </ModalContentWrapper>
        </PaperWrapper>
      </EntireWrapper>
      <BottomNavi />
    </>
  );
};

export default Setting;
