import React, { useEffect, useState } from "react";
import * as S from "./style";
import { useParams } from "react-router-dom";
import Header from "components/Main/Header";
import BuyAndCart from "../BuyAndCart";

const ProductDetail = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(
          `http://localhost:8080/api/products/${productId}`,
        );

        if (!response.ok) {
          throw new Error("데이터를 가져오는 데 실패했습니다.");
        }
        const data = await response.json();
        setProduct(data);
      } catch (e) {
        console.error(e);
      }
    };
    fetchProducts();
  }, [productId]);

  return (
    <S.Layer>
      <Header isBack={true} />
      {product ? (
        <>
          <S.Thumnail>
            <img src={product.thumbnail} alt={product.name} width={"100%"} />
          </S.Thumnail>
          <S.Info>
            <h5>{product.name}</h5>
            <div>
              <S.OriginalPrice>
                {product.price.toLocaleString()}원
              </S.OriginalPrice>
              <span>
                <S.DiscountRate>
                  {Math.round(
                    ((product.price - product.salePrice) / product.price) * 100,
                  )}
                  %
                </S.DiscountRate>
                <S.SalePrice>
                  {product.salePrice.toLocaleString()}원
                </S.SalePrice>
              </span>
            </div>
          </S.Info>
          <S.Descripsion>
            <h5>상품 설명</h5>
            <div>{product.detail}</div>
          </S.Descripsion>
          <BuyAndCart productName={product.name} price={product.salePrice} />
        </>
      ) : (
        <div>로딩 중...</div>
      )}
    </S.Layer>
  );
};

export default ProductDetail;
