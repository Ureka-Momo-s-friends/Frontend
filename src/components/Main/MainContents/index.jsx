import React, { useState } from "react";
import * as S from "./style";
import SearchBox from "../SearchBox";
import CategoryMenus from "../CategoryMenus";
import ProductList from "components/Product/ProductList";

const MainContents = () => {
  const [categoryId, setCategoryId] = useState(0);
  return (
    <S.Layer>
      <S.CategoryWrapper>
        <S.Category>
          <div>
            <img
              src="img/categoryimg/cateitem.png"
              alt="사료"
              width={"40px"}
              height={"70px"}
            />
          </div>
          <p>사료</p>
        </S.Category>
        <S.Category>
          <div>
            <img
              src="img/categoryimg/cateitem2.png"
              alt="간식"
              width={"40px"}
              height={"70px"}
            />
          </div>
          <p>캔/간식</p>
        </S.Category>
        <S.Category>
          <div>
            <img
              src="img/categoryimg/cateitem3.png"
              alt="모래"
              width={"80px"}
              height={"70px"}
            />
          </div>
          <p>모래/탈취제</p>
        </S.Category>
        <S.Category>
          <div>
            <img
              src="img/categoryimg/cateitem4.png"
              alt="스크래쳐"
              width={"80px"}
              height={"50px"}
            />
          </div>
          <p>
            스크래쳐
            <br />
            캣타워
          </p>
        </S.Category>
      </S.CategoryWrapper>
      <SearchBox />
      categoryId: {categoryId}
      <CategoryMenus categoryId={categoryId} setCategoryId={setCategoryId} />
      <S.MainWrapper>
        <ProductList categoryId={categoryId} />
      </S.MainWrapper>
    </S.Layer>
  );
};

export default MainContents;
