import React, { useEffect, useState } from "react";
import * as S from "./style";
import ProductList from "../ProductList";
import { useSearchParams } from "react-router-dom";

const Search = () => {
  const [searchParams] = useSearchParams();
  const keyword = searchParams.get("keyword") || "";
  const [products, setProducts] = useState([]);

  const fetchProducts = async () => {
    try {
      const response = await fetch(
        `http://localhost:8080/api/products/search?keyword=${encodeURIComponent(keyword)}`,
      );
      const data = await response.json();
      setProducts(data);
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    if (keyword) {
      fetchProducts();
    }
  }, [keyword]);

  return (
    <S.Layer>
      {products.length === 0 ? (
        <S.NoResults>검색 결과가 없습니다.</S.NoResults>
      ) : (
        <>
          <S.YesResults>
            {keyword} 검색 결과 {products.length}건
          </S.YesResults>
          <ProductList products={products} />
        </>
      )}
    </S.Layer>
  );
};

export default Search;
