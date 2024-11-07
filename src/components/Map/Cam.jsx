import React, { useRef, useState } from "react";
import BottomSheet from "./MapBottomSheet"; // 바텀 시트 컴포넌트 가져오기
import imageCompression from "browser-image-compression";

function Cam({ addStrayCat, userLatLng, selectedLatLng }) {
  const fileInputRef = useRef(null);
  const camImgSrc = "/img/cam-button.png";
  const loggedInUser = JSON.parse(localStorage.getItem("user"));
  const userId = loggedInUser ? loggedInUser.id : null;

  const [showBottomSheet, setShowBottomSheet] = useState(false); // 바텀 시트 상태 추가

  // 이미지 버튼 클릭 시 파일 입력창 트리거
  const handleButtonClick = () => {
    if (userId) {
      if (fileInputRef.current) {
        fileInputRef.current.click();
      }
    } else {
      setShowBottomSheet(true); // 비로그인 시 바텀 시트 표시
    }
  };

  // 파일 선택 후 처리
  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    const location = selectedLatLng || userLatLng;

    if (file) {
      try {
        let options = {
          maxSizeMB: 1,
          maxWidthOrHeight: 1024,
          initialQuality: 0.5,
          useWebWorker: true,
        };

        let compressedFile = file;
        compressedFile = await imageCompression(compressedFile, options);

        if (compressedFile.size > 5 * 1024 * 1024) {
          alert("Please select a smaller file.");
          return;
        }

        const formData = new FormData();
        formData.append("catImg", compressedFile);
        formData.append("lat", location.lat);
        formData.append("lon", location.lng);
        formData.append("memberId", userId);

        const apiResponse = await fetch("http://localhost:8080/api/strayCats", {
          method: "POST",
          body: formData,
        });

        if (!apiResponse.ok) {
          throw new Error(
            "Network response was not ok " + apiResponse.statusText,
          );
        }

        const newStrayCat = await apiResponse.json();
        console.log("Upload success:", newStrayCat);

        addStrayCat(newStrayCat);
      } catch (error) {
        console.error("Upload failed:", error);
        alert("File size should be less.");
      }
    }
  };

  const closeBottomSheet = () => setShowBottomSheet(false); // 바텀 시트 닫기 함수

  return (
    <div
      style={{
        position: "absolute",
        bottom: "20px",
        left: "50%",
        transform: "translateX(-50%)",
        zIndex: 2,
      }}
    >
      {/* 파일 입력창 숨기기 */}
      <input
        type="file"
        ref={fileInputRef}
        style={{ display: "none" }}
        onChange={handleFileChange}
        accept="image/*"
      />

      {/* 파일 선택 트리거 역할을 하는 이미지 버튼 */}
      <button
        onClick={handleButtonClick}
        style={{
          background: "none",
        }}
      >
        <img
          src={camImgSrc}
          alt="파일 선택"
          style={{
            cursor: "pointer",
            width: "70px",
            height: "70px",
            zIndex: "1",
          }}
        />
      </button>

      {/* 바텀 시트 표시 조건 */}
      {showBottomSheet && (
        <BottomSheet
          message="로그인이 필요합니다!"
          onClose={closeBottomSheet}
        />
      )}
    </div>
  );
}

export default Cam;
