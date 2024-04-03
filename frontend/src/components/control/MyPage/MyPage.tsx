import { useEffect, useState } from "react";
import { useMutation, useQuery } from 'react-query';
import Modal from "@mui/material/Modal";
import Paper from "@mui/material/Paper";
import { IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import UserIcon from 'src/asset/images/image-icon/User_Icon.png';
import UploadIcon from 'src/asset/images/icon/upload-icon.png';
import { getMyInfo, getMyType, putMyInfo, putDeleteMember, putMyType } from './api';
import useStore from "src/store";
import styled, { css } from "styled-components";

const ModalImg = styled.img`
    height: 200px;
    width: 200px;
    border-radius: 50%;
    border: 2px solid #CDCDCD;
    margin: 40px 30px 10px 30px;
`

const ImageInputContainer = styled.div`
  position: relative;
  display: inline-block;
`;

const FileInput = styled.input`
  opacity: 0;
  position: absolute;
  right: 0;
  bottom: 0;
  width: 65px;
  height: 65px;
  cursor: pointer;
`;

const FileInputLabel = styled.label`
  position: absolute;
  right: 25px;
  bottom: 25px;
  background-image: url(${UploadIcon});
  background-size: cover;
  width: 65px;
  height: 65px;
  cursor: pointer;
  z-index: 1;
`;

const MyInfoWrapper = styled.div`
    display: flex;
    margin: 30px 0;
`

const InfoTitle = styled.div`
    font-weight: bold;
    font-size: 26px;
    margin: 10px 80px 0 30px;
    padding-top: 10px;
`

const InfoItem = styled.div`
    display: flex;
    height: 50px;
    border-radius: 10px;
    width: 60%;
    border: 1px solid lightgrey;
    padding-top: 5px;
    padding-left: 24px;
    margin-left: 17px;
    align-items: center;
    font-size: 22px;
`

const TypeBtnWrapper = styled.div`
    display: flex;
    margin: 0 auto 0 2px;
    padding: 5px;
    border: 1px solid lightgrey;
    border-radius: 10px;
    gap: 4px;
`

const TypeBtn = styled.button<ButtonType>`
    display: flex;
    padding-top: 6px;
    height: 40px;
    border: none;
    border-radius: 10px;
    font-size: 20px;
    justify-content: center;
    background-color: #fff;
    align-items: center;
    width: 80px;
    ${(props) => props.$flag === "true" && css`
        background-color: #FBD14B;
    `}
`

const Button = styled.button`
    display: flex;
    justify-content: center;
    height: 50px;
    font-size: 20px;
    align-items: center;
    background-color: #88B3E2;
    color: #fff;
    border-radius: 10px;
    width: 80px;
    border: none;
    cursor: pointer;
    padding-top: 8px;
`

const BottomWrapper = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: end;
    margin: 30px 20px 10px 30px;
`

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
  height: 100%;
  margin-top: 10px;
  padding: 0 20px; 
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
  margin-top: 25px;
  flex-grow: 1;
  font-size: 32px;
  font-weight: bold;
`;

const MyPage = ({ isOpen, closeModal }) => {
    const { data: myData, refetch: refetchMyInfo } = useQuery('myData', getMyInfo);
    const { data: myType, refetch: refetchMyType } = useQuery( 'myType', () => getMyType())

    const [ edit, setEdit ] = useState<boolean>( false )
    const [ email, setEmail ] = useState( myData?.data?.memberEmail )
    const [ nickname, setNickName ] = useState( myData?.data?.nickName )
    const profileImage= ( myData?.data?.img==='' || myData?.data?.img===null ) ? UserIcon : myData?.data?.img
    
    const [ uploadedImage, setUploadedImage ] = useState(profileImage)
    const [ newProfileImage, setNewProfileImage ] = useState( profileImage )
    const [ flag, setFlag ] = useState(myType?.data==='Blue' ? true : false)
    const [ flag2 ] = useState(myType?.data==='Blue' ? true : false)
    const { setAccessToken } = useStore()

    const updateInfo = useMutation( putMyInfo )
    const updateType = useMutation( putMyType )
    const typeDic = {
        'Blue': '표현형', 
        'Yellow': '전환형'
    }

    const editMyPage = () =>{
        setEdit( !edit )
    }

    const saveMyPage = async() => {
        if( nickname === '' ) {
            alert( '닉네임을 입력하세요' )
            return
        }
        // preference변경 api 요청도 같이 날려야 함.
        await updateInfo.mutateAsync({ memberNickname: nickname, ImgUrl: uploadedImage })
        if(flag !== flag2 ){
            //변경되면 api 요청
            let type: string
            flag === true ? type = "Blue" : type = "Yellow" 
            await updateType.mutateAsync(type)
        }
        refetchMyInfo();
        refetchMyType();
        setEdit( !edit )
    }

    

    const onChangeImage = ( e ) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            const imageUrl = URL.createObjectURL(file);
            setNewProfileImage(imageUrl);
            const formData = new FormData();
            formData.append("file", file);
            formData.append("memberNickname", nickname);
            setUploadedImage(formData);
        }
    };

    const deleteMember = () =>{
        putDeleteMember().then(()=>{
            setAccessToken('')
            window.location.href = '/login';
        })
    }

    useEffect(() => {
        setEmail( myData?.data?.memberEmail );
        setNickName( myData?.data?.nickName );
        const loadedProfileImage = ( myData?.data?.img === '' || myData?.data?.img === null ) ? UserIcon : myData?.data?.img;
        setNewProfileImage( loadedProfileImage );
        setFlag( myType?.data === 'Blue' ? true : false );
    }, [ myData, myType ]); 

    return (
        <>
        { !edit && 
            <Modal open={ isOpen } onClose={closeModal}>
                <PaperWrapper>
                    <IconButton onClick={closeModal} sx={{ position: 'absolute', right: 22, top: 20, zIndex: 2 }}>
                    <CloseIcon />
                    </IconButton>
                    <StyledPaper elevation={2}>
                        <MainWrapper>
                            <div style={{ width: "50px" }}></div>
                            <TitleWrapper>마이페이지</TitleWrapper>
                        </MainWrapper>
                        <hr style={{ color: "#D1D1D1" }}/>
                        <ModalImg src = { profileImage } alt={ UserIcon }/>
                        <MyInfoWrapper>
                            <InfoTitle>이메일</InfoTitle>
                            <InfoItem >
                                { email }
                            </InfoItem>
                        </MyInfoWrapper>
                        <MyInfoWrapper>
                            <InfoTitle>닉네임</InfoTitle>
                            <InfoItem>
                                { nickname }
                            </InfoItem>
                        </MyInfoWrapper>
                        <MyInfoWrapper>
                            <InfoTitle>음악취향</InfoTitle>
                            <TypeBtnWrapper>
                                <TypeBtn $flag={ flag.toString() }>표현형</TypeBtn>
                                <TypeBtn $flag={ ( !flag ).toString() }>전환형</TypeBtn>
                            </TypeBtnWrapper>
                        </MyInfoWrapper>
                        <BottomWrapper >
                            <div onClick={ deleteMember } style={{marginTop:'20px', textDecoration: 'underline', color: 'gray'}}>회원탈퇴</div>
                            <Button onClick={ editMyPage } >수정</Button>
                        </BottomWrapper>
                    </StyledPaper>
                </PaperWrapper>
            </Modal>
        }
        { edit && 
            <Modal open={ isOpen } onClose={closeModal}>
                <PaperWrapper>
                    <IconButton onClick={closeModal} sx={{ position: 'absolute', right: 22, top: 20, zIndex: 2 }}>
                    <CloseIcon />
                    </IconButton>
                    <StyledPaper elevation={2}>
                        <MainWrapper>
                            <div style={{ width: "50px" }}></div>
                            <TitleWrapper>마이페이지</TitleWrapper>
                        </MainWrapper>
                        <hr style={{ color: "#D1D1D1" }}/>
                        <div>
                            <ImageInputContainer>
                                {newProfileImage ? (
                                    
                                    <ModalImg src={newProfileImage} alt="User Icon" />
                                    ) : (
                                    <ModalImg src={UserIcon} alt="User Icon" />
                                )}
                                <FileInput type="file" id="fileInput" onChange={onChangeImage} />
                                <FileInputLabel htmlFor="fileInput"></FileInputLabel>
                            </ImageInputContainer>
                        </div>
                        <MyInfoWrapper>
                            <InfoTitle>이메일</InfoTitle>
                            <InfoItem style={{backgroundColor: '#EBEBEB', color: 'gray'}}>
                                { email }
                            </InfoItem>
                        </MyInfoWrapper>
                        <MyInfoWrapper>
                            <InfoTitle>닉네임</InfoTitle>
                            <input type="text"
                                    style={{ height:'50px', borderRadius: '10px', fontSize: '22px', paddingTop: '5px',
                                    width: '60%', border: '1px solid lightgray', paddingLeft: '20px', marginLeft: '17px'}}
                                    value= { nickname } onChange={(e) => { setNickName( e.target.value )}}
                            />
                        </MyInfoWrapper>
                        <MyInfoWrapper>
                            <InfoTitle>음악취향</InfoTitle>
                            <TypeBtnWrapper>
                                <TypeBtn $flag={ flag.toString() } onClick={() => setFlag( true )}>표현형</TypeBtn>
                                <TypeBtn $flag={( !flag ).toString() } onClick={() => setFlag( false )}>전환형</TypeBtn>
                            </TypeBtnWrapper>
                        </MyInfoWrapper>
                        <BottomWrapper >
                            <div onClick={ deleteMember }  style={{marginTop:'20px', textDecoration: 'underline', color: 'gray'}}>회원탈퇴</div>
                            <Button onClick={ saveMyPage } >완료</Button>
                        </BottomWrapper>
                    </StyledPaper>
                </PaperWrapper>
            </Modal>
        }
        </>
    );
}

type ButtonType = {
    $flag?: string;
}

export default MyPage;