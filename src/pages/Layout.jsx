import React from "react";
import styled from "@emotion/styled";
import Header from "components/Main/Header";
import Bottombar from "components/Main/Bottombar";

const Wrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  max-width: 600px;
  min-width: 320px;
  margin: 0 auto;
  main {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
`;

function Layout({ children }) {
  return (
    <Wrapper>
      <Header />
      <main>{children}</main>
      <Bottombar />
    </Wrapper>
  );
}

export default Layout;
