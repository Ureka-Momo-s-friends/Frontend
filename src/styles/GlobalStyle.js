import { Global, css } from "@emotion/react";

const baseStyle = css`
  * {
    font-family: "Kodchasan-Light", "NanumSquareRoundExtraBold", "Sans-serif";
  }

  * {
    margin: 0;
    padding: 0;
    border: 0;
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
`;

const GlobalStyle = () => <Global styles={baseStyle} />;

export default GlobalStyle;
