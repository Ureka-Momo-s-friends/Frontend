import React from "react";
import * as S from "./style";
import { CartIcon, CatIcon, HomeIcon, UserIcon } from "assets/svgs";

const MenuItem = ({ link, children }) => {
  return (
    <S.StyledNavLink to={link}>
      <S.Item>{children}</S.Item>
    </S.StyledNavLink>
  );
};

const Bottombar = () => {
  return (
    <S.Layer>
      <MenuItem link="/MapPage">
        <CatIcon />
        길냥이
      </MenuItem>
      <MenuItem link="/">
        <HomeIcon />홈
      </MenuItem>
      <MenuItem link="/cart">
        <CartIcon />
        장바구니
      </MenuItem>
      <MenuItem link="/profile">
        <UserIcon />
        마이
      </MenuItem>
    </S.Layer>
  );
};

export default Bottombar;
