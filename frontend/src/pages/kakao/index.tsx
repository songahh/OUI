import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";

const REDIRECT_URI = 'http://localhost:8080/auth/login/kakao';

const Kakao = () => {

      const code = new URL(window.location.href).searchParams.get("code");
      const navigator = useNavigate();
      console.log(code);
 
      useEffect(() => {
        const kakaoLogin = async () => {
          await axios(
            {
            method: "GET",
            url: `${REDIRECT_URI}?code=${code}`,
            headers: {
              "Content-Type": "application/json;charset=utf-8",
            },
          }).then((res) => { 
            console.log("sucesss!!!!!!!!!!!!!!!!!!!!!")
            navigator( '/main' );
          });
        };
        kakaoLogin();
      }, []);
 
  return (
    <div>
      <h1>로그인 중입니다.</h1>
    </div>
  );
}
export default Kakao;