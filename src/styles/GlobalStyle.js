import { Global, css } from "@emotion/react";

const baseStyle = css`
  @import url("https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@100;300;400;500;700;900&display=swap");

  html,
  body,
  #root {
    height: 100%;
  }

  * {
    margin: 0;
    padding: 0;
    border: 0;
    font-family: "Noto Sans KR", sans-serif;
  }

  input {
    outline: none;
    border: none;
  }
  button {
    cursor: pointer;
    outline: none;
    background: none;
    border: none;
  }
  label {
    cursor: pointer;
  }
  img {
    -webkit-user-drag: none;
    -khtml-user-drag: none;
    -moz-user-drag: none;
    -o-user-drag: none;
    user-drag: none;
  }
  .required:after {
    content: " *";
    color: red;
  }
`;

const GlobalStyle = () => <Global styles={baseStyle} />;

export default GlobalStyle;
