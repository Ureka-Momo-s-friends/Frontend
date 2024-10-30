import React from "react";
import { GoogleLogin, googleLogout } from "@react-oauth/google";
import { useNavigate } from "react-router-dom";

const clientId = process.env.REACT_APP_GOOGLE_CLIENT_ID;

function Login({ setUser, setShowModal }) {
  const navigate = useNavigate();

  const handleLoginSuccess = (credentialResponse) => {
    try {
      const token = credentialResponse.credential;
      const base64Url = token.split(".")[1];
      const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
      const jsonPayload = decodeURIComponent(
        atob(base64)
          .split("")
          .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
          .join(""),
      );

      const decodedResponse = JSON.parse(jsonPayload);
      const userData = {
        googleId: decodedResponse.sub,
        email: decodedResponse.email,
        username: decodedResponse.name,
        contact: decodedResponse.email || "", // 기본값 확인
      };

      fetch("http://localhost:8080/api/members/google-login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      })
        .then((response) => {
          if (response.status === 404) {
            setShowModal(true);
            // 로그인된 유저 정보를 localStorage에 저장합니다.
            localStorage.setItem("user", JSON.stringify(userData));
            return null;
          } else if (!response.ok) {
            throw new Error("Failed to login or register user");
          } else {
            return response.json();
          }
        })
        .then((savedUser) => {
          if (savedUser) {
            const userWithProfileImg = {
              ...savedUser,
              profileImg: savedUser.profileImg
                ? `data:image/jpeg;base64,${savedUser.profileImg}`
                : null,
            };
            setUser(userWithProfileImg);
            localStorage.setItem("user", JSON.stringify(userWithProfileImg));
          }
        })
        .catch((error) => {
          console.error("Error during user login:", error);
        });
    } catch (error) {
      console.error("Error parsing login information:", error);
    }
  };

  return (
    <GoogleLogin
      clientId={clientId}
      onSuccess={handleLoginSuccess}
      onError={() => console.error("Login Failed")}
    />
  );
}

export default Login;
