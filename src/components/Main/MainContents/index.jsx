import React from 'react';
import * as S from './style';

const MainContents = () => {
  return (
    <S.Layer>
      <S.CategoryWrapper>
        <S.Category>
          <div>
            <img
              src="img/categoryimg/cateitem.png"
              alt="사료"
              width={'40px'}
              height={'70px'}
            />
          </div>
          <p>사료</p>
        </S.Category>
        <S.Category>
          <div>
            <img
              src="img/categoryimg/cateitem2.png"
              alt="간식"
              width={'40px'}
              height={'70px'}
            />
          </div>
          <p>캔/간식</p>
        </S.Category>
        <S.Category>
          <div>
            <img
              src="img/categoryimg/cateitem3.png"
              alt="모래"
              width={'80px'}
              height={'70px'}
            />
          </div>
          <p>모래/탈취제</p>
        </S.Category>
        <S.Category>
          <div>
            <img
              src="img/categoryimg/cateitem4.png"
              alt="스크래쳐"
              width={'80px'}
              height={'50px'}
            />
          </div>
          <p>
            스크래쳐
            <br />
            캣타워
          </p>
        </S.Category>
      </S.CategoryWrapper>
      <S.MainWrapper>
        <S.MapBox>map</S.MapBox>
        <S.BannerWrapper>
          <img src="img/banner/banner1.jpg" alt="banner1" />
          <img src="img/banner/banner2.jpg" alt="banner2" />
          <img src="img/banner/banner3.jpg" alt="banner3" />
          <img src="img/banner/banner4.jpg" alt="banner4" />
          <img src="img/banner/banner5.jpg" alt="banner5" />
        </S.BannerWrapper>
      </S.MainWrapper>
    </S.Layer>
  );
};

export default MainContents;
