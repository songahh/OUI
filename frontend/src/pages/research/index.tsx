import { Box } from "@mui/material";
import styled from "styled-components";

const BoxWrapper = styled(Box)`
  border: 1px solid black;
  width: 70%;
  margin: auto; // 중앙 정렬을 위해 추가
  display: flex; // 오타 수정
  justify-content: center;
  align-items: center;
  flex-wrap: wrap; // 내용이 넘칠 경우 줄 바꿈
  margin: 2vh;
  @media (max-width: 768px) {
    flex-direction: column; // 화면이 작을 때 세로 방향으로 요소들을 배열
  }
`;

const QuestionWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 100%; // 전체 너비 사용
`;

const Research = () => {
  const music = `${process.env.PUBLIC_URL}/images/research.png`;
  const happy = `${process.env.PUBLIC_URL}/images/happyIcon.png`;
  const sad = `${process.env.PUBLIC_URL}/images/sadIcon.png`;
  const happyText = `${process.env.PUBLIC_URL}/images/searchHappy.png`;
  const sadText = `${process.env.PUBLIC_URL}/images/searchSad.png`;
  const question = `${process.env.PUBLIC_URL}/images/searchQuestion.png`;

  return (
    <>
      <QuestionWrapper>
        <img src={music} alt="music" style={{ maxWidth: "100%", height: "auto", margin: '10vh' }} />
        <BoxWrapper>
          <img src={sad} alt="Sad" style={{ maxWidth: "45%", height: "auto", margin: "10px" }} />
          <img src={sadText} alt="sadText" style={{ maxWidth: "45%", height: "auto", margin: "10px" }} />
        </BoxWrapper>
        <BoxWrapper>
          <img src={happy} alt="happy" style={{ maxWidth: "45%", height: "auto", margin: "10px" }} />
          <img src={happyText} alt="happyText" style={{ maxWidth: "45%", height: "auto", margin: "10px" }} />
        </BoxWrapper>   
      </QuestionWrapper>

      <img src={question} alt="question" style={{ maxWidth: "40%", height: "auto" }} />
    </>
  );
}

export default Research;
