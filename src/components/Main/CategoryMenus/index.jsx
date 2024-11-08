import React from "react";
import * as S from "./style";
import { CategoryIcon } from "assets/svgs";

const CategoryMenus = ({ categoryId, setCategoryId }) => {
  return (
    <S.CategoryWrapper activeid={categoryId}>
      <S.Category onClick={() => setCategoryId(0)}>
        <div>
          <CategoryIcon />
        </div>
        <span>전체</span>
      </S.Category>
      <S.Category onClick={() => setCategoryId(1)}>
        <div>
          <img
            src="/img/categoryimg/cateitem.png"
            alt="사료"
            width={"40px"}
            height={"70px"}
          />
        </div>
        <span>사료</span>
      </S.Category>
      <S.Category onClick={() => setCategoryId(2)}>
        <div>
          <img
            src="/img/categoryimg/cateitem2.png"
            alt="간식"
            width={"40px"}
            height={"70px"}
          />
        </div>
        <span>캔/간식</span>
      </S.Category>
      <S.Category onClick={() => setCategoryId(3)}>
        <div>
          <img
            src="/img/categoryimg/cateitem3.png"
            alt="모래"
            width={"80px"}
            height={"70px"}
          />
        </div>
        <span>모래/탈취제</span>
      </S.Category>
      <S.Category onClick={() => setCategoryId(4)}>
        <div>
          <img
            src="/img/categoryimg/cateitem4.png"
            alt="스크래쳐"
            width={"80px"}
            height={"50px"}
          />
        </div>
        <span>스크래쳐</span>
      </S.Category>
    </S.CategoryWrapper>
  );
};

export default CategoryMenus;
