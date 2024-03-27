import axios from "axios";
import { useEffect } from "react";
import kakao from 'src/asset/images/kakao.png';
import styled from "styled-components";

const API_KEY = process.env.REACT_APP_API_KEY
const REDIRECT_URI = process.env.REACT_APP_REDIRECT_URI
const KAKAO_AUTH_URI = `https://kauth.kakao.com/oauth/authorize?client_id=${API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code&scope=account_email`


const LoginWrapper = styled.div`
    width:100%;
    height:100vh;
    display: flex;
    align-items: center;
    justify-content: center;
`;


const Login = () => {
      
    return(
        <LoginWrapper>
            <a href={KAKAO_AUTH_URI}><img src= { kakao } /></a>
        </LoginWrapper>
    );
}

export default Login;