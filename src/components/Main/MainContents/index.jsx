import React, { useEffect, useState } from "react";
import * as S from "./style";
import SearchBox from "../SearchBox";
import CategoryMenus from "../CategoryMenus";
import ProductList from "components/Product/ProductList";

const MainContents = () => {
  const [products, setProducts] = useState([]);
  const [categoryId, setCategoryId] = useState(0);
  const categorys = ["", "사료", "캔_간식", "모래_탈취제", "화장실_매트"];

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(
          `http://localhost:8080/api/products?category=${encodeURIComponent(categorys[categoryId])}`,
        );

        if (!response.ok) {
          throw new Error("데이터를 가져오는 데 실패했습니다.");
        }
        const data = await response.json();
        setProducts(data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchProducts();
  }, [categoryId]);

  return (
    <S.Layer>
      <SearchBox />
      <CategoryMenus categoryId={categoryId} setCategoryId={setCategoryId} />
      <S.MainWrapper>
        <ProductList products={products} />
      </S.MainWrapper>
    </S.Layer>
  );
};

export default MainContents;
