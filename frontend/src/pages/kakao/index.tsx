import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";

const Kakao = () => {
  const navigator = useNavigate();

  // Axios 인스턴스 생성
  const api = axios.create({
    baseURL: 'http://localhost:8080', 
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    withCredentials: true,
  });

  useEffect(() => {
    const REDIRECT_URI = '/auth/login/kakao'; 
    const code = new URL(window.location.href).searchParams.get("code");
    console.log(code);

    const kakaoLogin = async () => {
      try {
        const res = await api.get(`${REDIRECT_URI}?code=${code}`);
        console.log(res);
        navigator("/main");
      } catch (error) {
        console.log("로그인 에러 발생");
        console.log(error);
      }
    };

    kakaoLogin();
  }, [navigator]); 

  return (
    <div>
      <h1>로그인 중입니다.</h1>
    </div>
  );
};

export default Kakao;
