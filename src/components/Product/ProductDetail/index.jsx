import React from "react";
import * as S from "./style";
import { useParams } from "react-router-dom";
import products from "assets/products.json";
import Header from "components/Main/Header";
import BuyAndCart from "../BuyAndCart";

const ProductDetail = () => {
  const { productId } = useParams();
  const product = products[productId - 1];

  return (
    <S.Layer>
      <Header isBack={true} />
      <S.Thumnail>
        <img src={product.thumbnail} alt={product.name} width={"100%"} />
      </S.Thumnail>
      <S.Info>
        <h5>{product.name}</h5>
        <div>
          <S.OriginalPrice>{product.price.toLocaleString()}원</S.OriginalPrice>
          <span>
            <S.DiscountRate>
              {Math.round(
                ((product.price - product.salePrice) / product.price) * 100,
              )}
              %
            </S.DiscountRate>
            <S.SalePrice>{product.salePrice.toLocaleString()}원</S.SalePrice>
          </span>
        </div>
      </S.Info>
      <S.Descripsion>
        <h5>상품 설명</h5>
        <div>{product.detail}</div>
      </S.Descripsion>
      <BuyAndCart productName={product.name} price={product.salePrice} />
    </S.Layer>
  );
};

export default ProductDetail;
