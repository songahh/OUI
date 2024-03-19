import { FileUploadOutlined } from '@mui/icons-material';
import JoyIcon from 'src/asset/images/joyIcon.png';
import ComfortIcon from 'src/asset/images/comfortIcon.png';
import PanicIcon from 'src/asset/images/panicIcon.png';
import AngryIcon from 'src/asset/images/angryIcon.png';
import UnrestIcon from 'src/asset/images/unrestIcon.png';
import SadIcon from 'src/asset/images/sadnessIcon.png';
import styled from 'styled-components';

const ContentWrapper = styled.div`
  box-sizing: border-box;
  padding: 10px 60px;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(20%, auto));
  row-gap: 10px;
  justify-content: center;
  align-items: center;
`

const UploadLabel = styled.label`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100px;
  height: 100px;
  border: 2px dashed gray;
  border-radius: 10px;
  margin: 13px;
`

const ButtonWrapper = styled.button`
    box-sizing: border-box;
    display: flex;
    width: 100px;
    padding: 0px;
    margin: 10px;
    border: none;
    cursor: pointer;
    background-color: transparent;
`

const ImageContent = ( props: ContentProps ) => {
  const { onImageUpload, handleSticker } = props;
  
  // 이미지 파일 업로드 핸들러
  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files[0];
    if (file && onImageUpload) {
      onImageUpload(file);
    }
  };
      
  const stickerList = [ JoyIcon, ComfortIcon, PanicIcon, AngryIcon, UnrestIcon, SadIcon ];

  return (
    <ContentWrapper>
      <UploadLabel htmlFor="upload">
        <FileUploadOutlined fontSize='large' />
      </UploadLabel>
      <input id="upload" style={{ display: "none" }} type="file" accept="image/*" onChange={ handleImageUpload } />
      { stickerList.map( ( sticker, index ) => (
        <ButtonWrapper key={ index } onClick={() => handleSticker(sticker) }>
          <img src={ sticker } alt="emoji" style={{ height: "100px" }}/>
        </ButtonWrapper>
      ))}
    </ContentWrapper>
  )
}

export default ImageContent;

type ContentProps = {
  onImageUpload?: (file: File) => void;
  handleSticker?: (value: string) => void;
}