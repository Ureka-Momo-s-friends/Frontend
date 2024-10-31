import React, { useState } from "react";
import * as S from "./style";
import SearchBox from "../SearchBox";
import CategoryMenus from "../CategoryMenus";
import ProductList from "components/Product/ProductList";

const MainContents = () => {
  const [categoryId, setCategoryId] = useState(0);
  return (
    <S.Layer>
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
