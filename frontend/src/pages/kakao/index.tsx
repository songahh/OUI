import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import useStore from "src/store";
import { useQuery } from 'react-query'
import { getLogin } from './api';

const Kakao = () => {
  const navigate = useNavigate();
  const { setAccessToken } = useStore();

  const code = new URL(window.location.href).searchParams.get("code");

  const { data, status } = useQuery(['login', code], () => getLogin(code), {
    enabled: !!code, 
    onSuccess: (response) => {
      setAccessToken(response);
    },
  });

  useEffect(() => {
    if ( status === 'success' ) {
      console.log( "성공" )
      navigate( "/main" );
    }
  }, [status, navigate]);

  return (
    <div>
      <h1>로그인 중입니다.</h1>
    </div>
  );
};

export default Kakao;

