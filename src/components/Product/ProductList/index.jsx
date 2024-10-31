import React from "react";
import * as S from "./style";
import { useNavigate } from "react-router-dom";
import products from "assets/products.json";

const ProductList = ({ categoryId }) => {
  const route = useNavigate();

  return (
    <S.Layer>
      <S.ItemsWrapper>
        {products.map((product) => (
          <S.Item
            key={product.id}
            onClick={() => route(`/product/${product.id}`)}
          >
            <img src={product.thumbnail} alt={product.name} />
            <h6>{product.name}</h6>
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
          </S.Item>
        ))}
      </S.ItemsWrapper>
    </S.Layer>
  );
};

export default ProductList;
