import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import useStore from "src/store";
import axios from "axios";

const Kakao = () => {
  const navigate = useNavigate();
  const { accessToken, setAccessToken } = useStore();
  // const { testData, setTestData } = useStore();
  useEffect(() => {
    const REDIRECT_URI = '/auth/login/kakao'; 
    const code = new URL(window.location.href).searchParams.get("code");
    console.log(code);

    const kakaoLogin = async () => {
      // try {
      //   const res = await api.get(`${REDIRECT_URI}?code=${code}`);
      //   const { accessToken } = res.data;
      //   axios.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
      //   console.log(accessToken)
      //   // navigate("/main");
      // } catch (error) {
      //   console.log("로그인 에러 발생", error);
      // }
      axios.get(`${REDIRECT_URI}?code=${code}`).then((response) => {
        const { accessToken } = response.data;
        setAccessToken(accessToken);
        // axios.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;
        
        if (response.status === 200) {
          console.log(accessToken);
          navigate("/main");
        }
    
      }).catch((error) => {
          console.log(error);
        });
    };

    kakaoLogin();
  }, [navigate]); // navigate 함수를 의존성 배열에 추가

  return (
    <div>
      <h1>로그인 중입니다.</h1>
    </div>
  );
};

export default Kakao;
