import React, { useState } from "react";
import * as S from "./style";
import { CartIcon, CatIcon, HomeIcon, UserIcon } from "assets/svgs";
import BottomSheet from "../../Map/MapBottomSheet"; // 바텀 시트 컴포넌트 가져오기
//그냥 맵하고 똑같은 바텀시트 디자인 사용하기 위해서 같은 파일 불러왔습니다.

const MenuItem = ({ link, children, onClick }) => {
  return (
    <S.StyledNavLink to={link} onClick={onClick}>
      <S.Item>{children}</S.Item>
    </S.StyledNavLink>
  );
};

const Bottombar = () => {
  const loggedInUser = JSON.parse(localStorage.getItem("user"));
  const userId = loggedInUser ? loggedInUser.id : null;

  const [showBottomSheet, setShowBottomSheet] = useState(false); // 바텀 시트 상태

  const handleProtectedClick = (event) => {
    if (!userId) {
      event.preventDefault(); // 페이지 이동 막기
      setShowBottomSheet(true); // 바텀 시트 표시
    }
  };

  const closeBottomSheet = () => setShowBottomSheet(false); // 바텀 시트 닫기 함수

  return (
    <S.Layer>
      <MenuItem link="/MapPage">
        <CatIcon />
        길냥이
      </MenuItem>
      <MenuItem link="/">
        <HomeIcon />홈
      </MenuItem>
      <MenuItem link="/cart" onClick={handleProtectedClick}>
        <CartIcon />
        장바구니
      </MenuItem>
      <MenuItem link="/profile" onClick={handleProtectedClick}>
        <UserIcon />
        마이
      </MenuItem>

      {/* 바텀 시트 조건부 렌더링 */}
      {showBottomSheet && (
        <BottomSheet
          message="홈페이지 상단에서 로그인을 해주세요!"
          onClose={closeBottomSheet}
        />
      )}
    </S.Layer>
  );
};

export default Bottombar;
