import React from 'react';
import * as S from './style';
import { CartIcon, CatIcon, HomeIcon, UserIcon } from 'assets/svgs';

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
        <p>길냥이</p>
      </MenuItem>
      <MenuItem link="/">
        <HomeIcon />
        <p>홈</p>
      </MenuItem>
      <MenuItem link="/cart">
        <CartIcon />
        <p>장바구니</p>
      </MenuItem>
      <MenuItem link="/profile">
        <UserIcon />
        <p>마이</p>
      </MenuItem>
    </S.Layer>
  );
};

export default Bottombar;
