import React from "react";
import * as S from "./style";
import { SearchIcon } from "assets/svgs";

const Header = () => {
  return (
    <S.Layer>
      <S.Logo>
        <img src="img/mm.png" alt="로고" height={"56px"} />
      </S.Logo>
      <S.SearchBox>
        <input type="text" placeholder="찾고 싶은 상품을 검색해 보세요!" />
        <S.SearchButton>
          <SearchIcon />
        </S.SearchButton>
      </S.SearchBox>
    </S.Layer>
  );
};

export default Header;
