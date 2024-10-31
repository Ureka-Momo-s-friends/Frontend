import React from "react";
import * as S from "./style"; // 스타일 임포트
import Header from "components/Main/Header";
import MainContents from "components/Main/MainContents";
import Bottombar from "components/Main/Bottombar";

function HomePage() {
  return (
    <S.Layout>
      {/* 헤더 추가 */}
      <Header />

      {/* 첫 번째 섹션: 로그인 및 메인 콘텐츠 */}
      <section>
        <Login />
        {/* 메인 콘텐츠 */}
        <MainContents />
      </section>

      {/* 바텀바 추가 */}
      <Bottombar />
    </S.Layout>
  );
}

export default HomePage;
