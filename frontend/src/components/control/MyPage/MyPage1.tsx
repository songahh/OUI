import { Divider } from '@mui/material';
import styled, { css } from 'styled-components'
import UserIcon from 'src/asset/images/image-icon/User_Icon.png';
import UploadIcon from 'src/asset/images/icon/upload-icon.png';
import { useMutation, useQuery } from 'react-query';
import useStore from 'src/store'
import { getMyInfo, getMyType, putMyInfo, putDeleteMember, putMyType } from './api';
import { useState, useEffect } from 'react';

const MyPageModalWrapper = styled.div`
    height: 100%;
    width: 100%;
    display: flex;
    flex-direction: column;
`

const ModalHeader = styled.div`
    display: flex;
    justify-content: center;
    margin: 20px 0;
`
const ModalImg = styled.img`
    height: 160px;
    width: 160px;
    border-radius: 50%;
    margin: 40px;
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
  width: 48px; // 아이콘 크기에 따라 조정
  height: 48px; // 아이콘 크기에 따라 조정
  cursor: pointer;
`;

const FileInputLabel = styled.label`
  position: absolute;
  right: 10px; // 위치 조정
  bottom: 10px; // 위치 조정
  background-image: url(${UploadIcon});
  background-size: cover;
  width: 48px; // 아이콘 크기에 맞게 조정
  height: 48px; // 아이콘 크기에 맞게 조정
  cursor: pointer;
  z-index: 1;
`;

const MyInfoWrapper = styled.div`
    display: flex;
    margin: 20px 0;
`

const InfoTitle = styled.div`
    font-weight: bold;
    font-size: 24px;
    margin: 10px 80px 0 60px;
`

const InfoItem = styled.div`
    display: flex;
    height: 50px;
    border-radius: 10px;
    width: 60%;
    border: 1px solid lightgrey;
    padding-left: 20px;
    align-items: center;
`

const TypeBtnWrapper = styled.div`
    display: flex;
    margin: 0 auto 0 2px;
    padding: 8px;
    border: 1px solid lightgrey;
    border-radius: 10px;
    gap: 6px;
`

const TypeBtn = styled.button<ButtonType>`
    display: flex;
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
`

const BottomWrapper = styled.div`
    display: flex;
    justify-content: space-between;
    margin: auto 20px 10px 20px;
`

const MyPage = () => {
    
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
        await updateInfo.mutateAsync({ memberNickname: nickname, file: uploadedImage })
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


    return(
        <>
        { !edit && 
            <MyPageModalWrapper>
            <ModalHeader>
                <h1>마이페이지</h1>
            </ModalHeader>
            <Divider/>
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
        </MyPageModalWrapper>
        }
        { edit && 
            <MyPageModalWrapper>
            <ModalHeader>
                <h1>마이페이지</h1>
            </ModalHeader>
            <Divider/>
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
                        style={{ height:'50px', borderRadius: '10px',
                        width: '60%', border: '1px solid lightgray', paddingLeft: '20px' }}
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
        </MyPageModalWrapper>
            }
        </>
    );
}


type ButtonType = {
    $flag?: string;
}

export default MyPage;