import styled from 'styled-components';

const ContentWrapper = styled.div`
  box-sizing: border-box;
  padding: 10px 20px;
`

const ImageContent = ( props: ContentProps ) => {

  return (
    <ContentWrapper>
      <input type="file" />
    </ContentWrapper>
  )
}

export default ImageContent;

type ContentProps = {

}