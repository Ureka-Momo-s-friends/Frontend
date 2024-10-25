import React from 'react';
import { useState } from 'react';
import { GoogleLogin, googleLogout } from '@react-oauth/google';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
} from 'react-router-dom';

function Login() {
  const [selectedTopic, setSelectedTopic] = useState();
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem('user')) || null,
  ); // 사용자 상태 관리
  const navigate = useNavigate(); // 페이지 이동을 위한 useNavigate 훅

  // 구글 로그인 성공 시 호출되는 함수
  function handleLoginSuccess(credentialResponse) {
    console.log('Google 로그인 성공:', credentialResponse);

    try {
      // JWT 토큰에서 사용자 정보 추출
      const decodedResponse = JSON.parse(
        atob(credentialResponse.credential.split('.')[1]),
      );
      const userData = {
        googleId: decodedResponse.sub,
        email: decodedResponse.email,
        name: decodedResponse.name,
      };

      setUser(userData); // 사용자 정보를 상태로 저장
      localStorage.setItem('user', JSON.stringify(userData)); // localStorage에 사용자 정보 저장
    } catch (error) {
      console.error('로그인 정보 파싱 중 오류 발생:', error);
    }
  }

  // 로그아웃 함수
  function handleLogout() {
    googleLogout(); // 구글 로그아웃 호출
    setUser(null); // 사용자 상태 초기화
    localStorage.removeItem('user'); // localStorage에서 사용자 정보 제거
    navigate('/'); // 로그아웃 후 메인 페이지로 이동
  }

  return (
    <section>
      {!user ? (
        <div className="login-container">
          <GoogleLogin
            onSuccess={handleLoginSuccess}
            onError={() => {
              console.log('Login Failed');
            }}
            useOneTap={false} // 자동 로그인 방지
            auto_select={false} // 자동 계정 선택 방지
          />
        </div>
      ) : (
        <div className="logout-container">
          <button id="logout" onClick={handleLogout}>
            Logout
          </button>
        </div>
      )}
    </section>
  );
}

export default Login;
