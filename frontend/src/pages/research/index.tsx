import { Box } from "@mui/material";
import music from 'src/asset/images/research/research.png';
import happy from 'src/asset/images/research/happyIcon.png';
import sad from 'src/asset/images/research/sadIcon.png';
import happyText from 'src/asset/images/research/searchHappy.png';
import sadText from 'src/asset/images/research/searchSad.png';
import question from 'src/asset/images/research/searchQuestion.png';
import styled from "styled-components";





const BoxWrapper = styled(Box)`
  border: 1px solid black;
  width: 70%;
  margin: auto; 
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  margin: 2vh;
  @media (max-width: 768px) {
    flex-direction: column;
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

  return (
    <>
      <QuestionWrapper>
        <img src={ music } alt="music" style={{ maxWidth: "100%", height: "auto", margin: '10vh' }} />
        <BoxWrapper>
          <img src={ sad } alt="Sad" style={{ maxWidth: "45%", height: "auto", margin: "10px" }} />
          <img src={ sadText } alt="sadText" style={{ maxWidth: "45%", height: "auto", margin: "10px" }} />
        </BoxWrapper>
        <BoxWrapper>
          <img src={ happy } alt="happy" style={{ maxWidth: "45%", height: "auto", margin: "10px" }} />
          <img src={ happyText } alt="happyText" style={{ maxWidth: "45%", height: "auto", margin: "10px" }} />
        </BoxWrapper>   
      </QuestionWrapper>

      <img src={ question } alt="question" style={{ maxWidth: "40%", height: "auto" }} />
    </>
  );
}

export default Research;
