import React from "react";
import * as S from "./style";
import { BackArrowIcon } from "assets/svgs";
import { useNavigate } from "react-router-dom";

const Header = ({ isBack }) => {
  const route = useNavigate();

  return (
    <S.Layer>
      {isBack && <BackArrowIcon onClick={() => route("/")} />}
      <img
        src="/img/mm.png"
        alt="로고"
        height={"56px"}
        onClick={() => route("/")}
      />
    </S.Layer>
  );
};

export default Header;
