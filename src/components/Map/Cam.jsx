import React, { useRef } from "react";

function Cam({ addStrayCat, userLatLng }) {
  const fileInputRef = useRef(null);
  const camImgSrc = "/img/cam-button.png";
  const loggedInUser = JSON.parse(localStorage.getItem("user"));
  const userId = loggedInUser ? loggedInUser.id : null;

  // 이미지 버튼 클릭 시 파일 입력창 트리거
  const handleButtonClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  // 파일 선택 후 처리
  const handleFileChange = async (event) => {
    const file = event.target.files[0];

    if (file && file.size <= 5 * 1024 * 1024) {
      try {
        const formData = new FormData();
        formData.append("catImg", file); // 이미지 추가
        formData.append("lat", userLatLng.lat);
        formData.append("lon", userLatLng.lng);
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
      }
    } else {
      alert("File size should be 5 MB or less.");
    }
  };

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
          }}
        />
      </button>
    </div>
  );
}

export default Cam;