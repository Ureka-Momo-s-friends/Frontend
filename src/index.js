import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { RecoilRoot } from 'recoil';
import GlobalStyle from './styles/GlobalStyle';
const root = ReactDOM.createRoot(document.getElementById('root'));
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { RecoilRoot } from "recoil";
import GlobalStyle from "./styles/GlobalStyle";

import { GoogleOAuthProvider } from "@react-oauth/google";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <RecoilRoot>
      <GlobalStyle />
      <GoogleOAuthProvider clientId="307131914161-mp331ecodiej5fcbi3sv91gk6bj0f80k.apps.googleusercontent.com">
        <App />
      </GoogleOAuthProvider>
    </RecoilRoot>
  </React.StrictMode>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
