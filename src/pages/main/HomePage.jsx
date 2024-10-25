import React from 'react';
import styled from "@emotion/styled";
import Header from "components/Main/Header";
import MainContents from "components/Main/MainContents";
import Bottombar from "components/Main/Bottombar";
import Login from "../Login";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  max-width: 600px;
  min-width: 320px;
  height: 100%;
  margin: 0 auto;
`;

function HomePage() {
  return (
    <Wrapper>
      <Header />
      <section>
        <Login></Login>
      </section>
      <MainContents />
      <Bottombar />
    </Wrapper>
  );
}

export default HomePage;
