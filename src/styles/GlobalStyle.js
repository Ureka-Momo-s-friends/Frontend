import { Global, css } from "@emotion/react";

const baseStyle = css`
  html,
  body,
  #root {
    height: 100%;
  }

  * {
    margin: 0;
    padding: 0;
    border: 0;
    font-family: "Kodchasan-Light", "NanumSquareRoundExtraBold", "Sans-serif";
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
