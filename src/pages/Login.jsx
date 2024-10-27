import React from "react";
import { useState } from "react";
import { GoogleLogin, googleLogout } from "@react-oauth/google";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
} from "react-router-dom";

const clientId = process.env.REACT_APP_GOOGLE_CLIENT_ID;

function Login() {
  const [selectedTopic, setSelectedTopic] = useState();
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("user")) || null,
  ); // 사용자 상태 관리
  const navigate = useNavigate(); // 페이지 이동을 위한 useNavigate 훅

  // Base64url 디코딩 함수 추가
  function base64UrlDecode(str) {
    const base64 = str.replace(/-/g, "+").replace(/_/g, "/");
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split("")
        .map((c) => {
          return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
        })
        .join(""),
    );
    return JSON.parse(jsonPayload);
  }

  // 구글 로그인 성공 시 호출되는 함수
  function handleLoginSuccess(credentialResponse) {
    console.log("Google 로그인 성공:", credentialResponse);

    try {
      // JWT 토큰에서 사용자 정보 추출
      const decodedResponse = base64UrlDecode(
        credentialResponse.credential.split(".")[1],
      );
      const userData = {
        googleId: decodedResponse.sub,
        email: decodedResponse.email,
        username: decodedResponse.name,
        contact: "", // contact 정보가 없을 경우 공백으로 설정
      };

      console.log("전송할 유저 데이터:", userData);

      // 서버에 유저 정보 저장 요청
      fetch("http://localhost:8080/api/members/google-login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Failed to save user to database");
          }
          return response.json();
        })
        .then((savedUser) => {
          // 서버에서 저장된 유저 정보를 받아와 상태로 저장
          console.log("저장된 유저 데이터:", savedUser);

          if (!savedUser.id) {
            throw new Error("서버에서 반환된 데이터에 ID가 없습니다.");
          }

          // 사용자 상태 및 로컬 스토리지에 저장
          setUser(savedUser);
          localStorage.setItem("user", JSON.stringify(savedUser));
        })
        .catch((error) => {
          console.error("서버에 유저 정보 저장 중 오류 발생:", error);
        });
    } catch (error) {
      console.error("로그인 정보 파싱 중 오류 발생:", error);
    }
  }

  // 로그아웃 함수
  function handleLogout() {
    if (user && user.id) {
      console.log("User ID:", user.id); // 로그로 ID 확인
      // 서버에 유저 정보 삭제 요청 보내기
      fetch(`http://localhost:8080/api/members/${user.id}`, {
        method: "DELETE",
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Failed to delete user from database");
          }
          console.log("서버에서 유저 정보가 성공적으로 삭제되었습니다.");
        })
        .catch((error) => {
          console.error("서버에서 유저 정보 삭제 중 오류 발생:", error);
        });
    } else {
      console.error("User ID is undefined. Cannot delete user.");
    }

    // 구글 로그아웃 호출 및 상태 초기화
    googleLogout();
    setUser(null);
    localStorage.removeItem("user");
    console.log("사용자 정보가 로그아웃으로 초기화되었습니다.");
    navigate("/"); // 로그아웃 후 메인 페이지로 이동
  }

  return (
    <section>
      {!user ? (
        <div className="login-container">
          <GoogleLogin
            clientId={clientId}
            onSuccess={handleLoginSuccess}
            onError={() => {
              console.log("Login Failed");
            }}
            useOneTap={false}
            auto_select={false}
          />
        </div>
      ) : (
        <div className="logout-container">
          <p>{user.username}님으로 로그인 중</p>{" "}
          {/* 로그인 된 사용자 이름 표시 */}
          <button id="logout" onClick={handleLogout}>
            Logout
          </button>
        </div>
      )}
    </section>
  );
}

export default Login;
