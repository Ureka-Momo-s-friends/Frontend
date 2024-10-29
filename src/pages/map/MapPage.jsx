import React, { useEffect, useState } from "react";
import Bottombar from "components/Main/Bottombar";

const MapPage = () => {
  const [map, setMap] = useState(null);
  const [isHovered1, setIsHovered1] = useState(false);

  useEffect(() => {
    const kakaoApiKey = process.env.REACT_APP_KAKAO_MAP_API_KEY;

    const script = document.createElement("script");
    script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${kakaoApiKey}&libraries=services&autoload=false`;
    script.async = true;

    script.onload = () => {
      window.kakao.maps.load(() => {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const userLat = position.coords.latitude;
            const userLng = position.coords.longitude;

            const container = document.getElementById("map");
            const options = {
              center: new window.kakao.maps.LatLng(userLat, userLng),
              level: 3,
            };

            const mapInstance = new window.kakao.maps.Map(container, options);
            setMap(mapInstance);

            // 현재 위치에 마커 추가
            const markerPosition = new window.kakao.maps.LatLng(
              userLat,
              userLng,
            );
            const marker = new window.kakao.maps.Marker({
              position: markerPosition,
              map: mapInstance,
            });

            // 마커 위에 커스텀 오버레이 표시
            const overlayContent = `
              <div style="position: relative; bottom: 30px; width: 100px; padding: 5px; text-align: center; font-size: 12px; background: #fff; border: 1px solid #ccc; border-radius: 5px;">
                <small>현재 위치</small>
              </div>`;
            const customOverlay = new window.kakao.maps.CustomOverlay({
              position: markerPosition,
              content: overlayContent,
              yAnchor: 1.4, // 오버레이 위치 조정
            });
            customOverlay.setMap(mapInstance);
          },
          (error) => {
            console.error("Geolocation error:", error);
            const defaultPosition = new window.kakao.maps.LatLng(
              33.450701,
              126.570667,
            );
            const container = document.getElementById("map");
            const options = {
              center: defaultPosition,
              level: 3,
            };
            const mapInstance = new window.kakao.maps.Map(container, options);
            setMap(mapInstance);
          },
        );
      });
    };

    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script);
    };
  }, []);

  const goToShelterList = () => {
    window.open(
      "https://www.animal.go.kr/front/awtis/institution/institutionList.do?menuNo=1000000059",
      "_blank",
    );
  };

  const styles = {
    mapPage: {
      width: "90%",
      maxWidth: "600px",
      margin: "0 auto",
      minHeight: "100vh",
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-between",
    },
    header: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      backgroundColor: "#f8f9fa",
      padding: "10px 20px",
      height: "50px",
      boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)",
    },
    headerTitle: {
      margin: 0,
      fontSize: "18px",
      textAlign: "center",
      flexGrow: 1,
      fontFamily: "Inter, sans-serif",
    },
    backButton: {
      fontSize: "24px",
      fontWeight: "bold",
      background: "none",
      border: "none",
      cursor: "pointer",
    },
    mapContainer: {
      flex: 1,
      width: "100%",
      height: "60vh",
      cursor: "url(/img/cat-paw.png), auto",
    },
    buttonsContainer: {
      display: "flex",
      justifyContent: "space-around",
      alignItems: "center",
      margin: "20px 0",
      padding: "0 20px",
    },
    footerButton1: {
      flex: 4,
      marginRight: "10px",
      padding: "15px",
      fontSize: "16px",
      cursor: "pointer",
      border: "none",
      backgroundColor: isHovered1 ? "#A9826C" : "#D2B48C",
      color: "#4B2E2E",
      borderRadius: "10px",
      transition: "background-color 0.3s ease",
    },
    allSheltersButton: {
      padding: "10px 20px",
      fontSize: "16px",
      cursor: "pointer",
      border: "none",
      backgroundColor: "#4F4F4F",
      color: "#ffffff",
      borderRadius: "5px",
    },
  };

  return (
    <div style={styles.mapPage}>
      <header style={styles.header}>
        <button onClick={() => window.history.back()} style={styles.backButton}>
          &lt;
        </button>
        <h1 style={styles.headerTitle}>길냥이 찾기</h1>
      </header>

      <div id="map" style={styles.mapContainer}></div>

      <div style={styles.buttonsContainer}>
        <button
          style={styles.footerButton1}
          onMouseEnter={() => setIsHovered1(true)}
          onMouseLeave={() => setIsHovered1(false)}
        >
          내 길냥이 도감 보기
        </button>
        <button style={styles.allSheltersButton} onClick={goToShelterList}>
          전체 보호소 목록
        </button>
      </div>

      <Bottombar />
    </div>
  );
};

export default MapPage;
