import React from "react";
import { Outlet } from "react-router-dom";
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
  overflow: hidden;
  main {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
`;

const Layout = () => {
  return (
    <Wrapper>
      <Header />
      <main>
        <Outlet />
      </main>
      <Bottombar />
    </Wrapper>
  );
};

export default Layout;
