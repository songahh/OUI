import styled from 'styled-components';

const ContentWrapper = styled.div`
  box-sizing: border-box;
  padding: 10px 20px;
`

const ImageContent = ( props: ContentProps ) => {
  const { onImageUpload } = props;
  
  // 이미지 파일 업로드 핸들러
  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files[0];
    if (file && onImageUpload) {
      onImageUpload(file);
    }
  };

  return (
    <ContentWrapper>
      <input type="file" onChange={ handleImageUpload }  />
    </ContentWrapper>
  )
}

export default ImageContent;

type ContentProps = {
  onImageUpload?: (file: File) => void;
}