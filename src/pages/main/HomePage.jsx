import React from "react";
import * as S from "./style"; // 스타일 임포트
import Header from "components/Main/Header";
import MainContents from "components/Main/MainContents";
import Bottombar from "components/Main/Bottombar";

function HomePage() {
  return (
    <S.Wrapper>
      <Header />
      <section>
        {/* 메인 콘텐츠 */}
        <MainContents />
      </section>
      <Bottombar />
    </S.Wrapper>
  );
}

export default HomePage;
