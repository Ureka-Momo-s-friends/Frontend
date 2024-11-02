import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { RecoilRoot } from "recoil";
import GlobalStyle from "./styles/GlobalStyle";
import { GoogleOAuthProvider } from "@react-oauth/google";

// .env 파일에서 clientId 불러오기
const googleClientId = process.env.REACT_APP_GOOGLE_CLIENT_ID;

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  // <React.StrictMode> // 주석 처리된 부분
  <RecoilRoot>
    <GlobalStyle />
    <GoogleOAuthProvider clientId={googleClientId}>
      <App />
    </GoogleOAuthProvider>
  </RecoilRoot>,
  // </React.StrictMode> // 주석 처리된 부분
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
