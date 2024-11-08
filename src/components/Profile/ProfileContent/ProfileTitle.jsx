import React from "react";
import * as S from "../style";
import { BackArrowIcon } from "assets/svgs";
import { useNavigate } from "react-router-dom";

const ProfileTitle = ({ title }) => {
  const navigate = useNavigate();
  return (
    <S.ProfileTitle>
      <BackArrowIcon
        onClick={() => navigate(-1)}
        style={{ cursor: "pointer" }}
      />
      {title}
    </S.ProfileTitle>
  );
};

export default ProfileTitle;
