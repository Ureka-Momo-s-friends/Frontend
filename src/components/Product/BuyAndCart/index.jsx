import React, { useState } from "react";
import * as S from "./style";
import BottomSheet from "./Bottemsheet";

const BuyAndCart = ({ productName, price, productId }) => {
  const [showBottomSheet, setShowBottomSheet] = useState(false);

  const handleOpenBottomSheet = () => setShowBottomSheet(true);
  const handleCloseBottomSheet = () => setShowBottomSheet(false);

  return (
    <>
      <S.Layer>
        <S.Button onClick={handleOpenBottomSheet}>구매하기</S.Button>
      </S.Layer>
      {showBottomSheet && (
        <>
          <S.Overlay onClick={handleCloseBottomSheet} />
          <BottomSheet
            onClose={handleCloseBottomSheet}
            productName={productName}
            price={price}
            productId={productId}
          />
        </>
      )}
    </>
  );
};

export default BuyAndCart;
