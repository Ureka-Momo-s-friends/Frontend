import React from "react";

function ProfileUpdatePage() {
  return (
    <div>
      <h1>프로필 수정</h1>
      <div className="rectangle-border">
        <div className="user-avatar"></div>
        <div className="line line-2"></div>

        <div className="info-label name">이름</div>
        <div className="info-label phone">전화번호</div>
        <div className="info-label address">배송지</div>

        <div className="rectangle">
          <div className="cat-profile">고양이 프로필</div>
        </div>
      </div>
    </div>
  );
}

export default ProfileUpdatePage;
