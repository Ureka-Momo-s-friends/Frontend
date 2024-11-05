import React, { useState } from "react";
import * as S from "./style";
import BottomSheetLoggedIn from "./Bottomsheet"; // 로그인 상태에서 사용할 바텀 시트
import BottomSheetNotLoggedIn from "../../Map/MapBottomSheet"; // 비로그인 상태에서 사용할 바텀 시트

const BuyAndCart = ({ productName, price, productId }) => {
  const [showBottomSheet, setShowBottomSheet] = useState(false);

  const loggedInUser = JSON.parse(localStorage.getItem("user"));
  const userId = loggedInUser ? loggedInUser.id : null;

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
          {userId ? (
            <BottomSheetLoggedIn
              onClose={handleCloseBottomSheet}
              productName={productName}
              price={price}
              productId={productId}
            />
          ) : (
            <BottomSheetNotLoggedIn
              onClose={handleCloseBottomSheet}
              message="홈페이지 상단에서 로그인을 해주세요!"
            />
          )}
        </>
      )}
    </>
  );
};

export default BuyAndCart;
