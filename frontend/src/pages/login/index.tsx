import styled from "styled-components";


const API_KEY = process.env.REACT_APP_REST_API_KEY;
const REDIRECT_URI = 'http://localhost:3000/oauth';
const KAKAO_AUTH_URI = `https://kauth.kakao.com/oauth/authorize?client_id=${API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code`;

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
            <a href={KAKAO_AUTH_URI}><img src='/images/kakao.png' /></a>
        </LoginWrapper>
    );
}

export default Login;