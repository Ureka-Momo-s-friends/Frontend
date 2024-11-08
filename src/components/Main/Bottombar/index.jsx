import React, { useState, useEffect } from "react";
import * as S from "./style";
import { CartIcon, CatIcon, HomeIcon, UserIcon } from "assets/svgs";
import BottomSheet from "../../Map/MapBottomSheet";

const MenuItem = ({ link, children, onClick }) => {
  return (
    <S.StyledNavLink to={link} onClick={onClick}>
      <S.Item>{children}</S.Item>
    </S.StyledNavLink>
  );
};

const Bottombar = () => {
  const [userId, setUserId] = useState(null);
  const [showBottomSheet, setShowBottomSheet] = useState(false);

  // localStorage 변경 감지 및 userId 업데이트
  useEffect(() => {
    const updateUserId = () => {
      const loggedInUser = JSON.parse(localStorage.getItem("user"));
      setUserId(loggedInUser ? loggedInUser.id : null);
    };

    // 초기 userId 설정
    updateUserId();

    // storage 이벤트 리스너 추가
    const handleStorageChange = (e) => {
      if (e.key === "user") {
        updateUserId();
      }
    };

    window.addEventListener("storage", handleStorageChange);

    // 컴포넌트가 마운트될 때마다 userId 확인
    const interval = setInterval(updateUserId, 1000);

    // 클린업 함수
    return () => {
      window.removeEventListener("storage", handleStorageChange);
      clearInterval(interval);
    };
  }, []);

  const handleProtectedClick = (event) => {
    if (!userId) {
      event.preventDefault();
      setShowBottomSheet(true);
    }
  };

  const closeBottomSheet = () => setShowBottomSheet(false);

  return (
    <S.Layer>
      <MenuItem link="/map">
        <CatIcon />
        길냥이
      </MenuItem>
      <MenuItem link="/">
        <HomeIcon />홈
      </MenuItem>
      <MenuItem link="/cart" onClick={handleProtectedClick}>
        <div className="cart-icon-wrapper">
          <CartIcon />
        </div>
        장바구니
      </MenuItem>
      <MenuItem link="/profile" onClick={handleProtectedClick}>
        <UserIcon />
        마이
      </MenuItem>

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
