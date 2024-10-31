import React, { useEffect, useState } from "react";
import Bottombar from "components/Main/Bottombar";

const MapPage = () => {
  const [map, setMap] = useState(null);
  const [isHovered1, setIsHovered1] = useState(false);

  useEffect(() => {
    const kakaoApiKey = process.env.REACT_APP_KAKAO_MAP_API_KEY;
    if (!kakaoApiKey) {
      console.error("Kakao API Key가 설정되지 않았습니다.");
      return;
    }

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

            const overlayContent = `
              <div style="position: relative; bottom: 30px; width: 100px; padding: 5px; text-align: center; font-size: 12px; background: #fff; border: 1px solid #ccc; border-radius: 5px;">
                <small>현재 위치</small>
              </div>`;
            const customOverlay = new window.kakao.maps.CustomOverlay({
              position: markerPosition,
              content: overlayContent,
              yAnchor: 1.5,
            });
            customOverlay.setMap(mapInstance);

            // 보호소 데이터 로드 및 표시
            fetch("/shelter.json")
              .then((response) => response.json())
              .then((data) => {
                placeMarkersWithDelay(data, mapInstance);
              })
              .catch((error) => console.error("Error loading JSON:", error));

            // 길냥이 데이터 로드 및 지도에 표시
            fetch("http://localhost:8080/api/strayCats?memberId=1", {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
              },
            })
              .then((response) => response.json())
              .then((cats) => {
                if (Array.isArray(cats)) {
                  cats.forEach((cat) => {
                    const catPosition = new window.kakao.maps.LatLng(
                      cat.lat,
                      cat.lon,
                    );

                    // 길냥이 마커 생성
                    const marker = new window.kakao.maps.Marker({
                      position: catPosition,
                      map: mapInstance,
                    });

                    // 길냥이 정보 오버레이 설정
                    const overlayContent = `
                      <div style="padding:5px; background:#fff; border:1px solid #ccc; border-radius:5px;">
                        <img src="${cat.catImgUrl}" alt="Cat Image" style="width:50px; height:50px; border-radius:50%;" />
                        <div style="text-align: center; margin-top: 5px;">${cat.id}</div>
                      </div>`;
                    const customOverlay = new window.kakao.maps.CustomOverlay({
                      position: catPosition,
                      content: overlayContent,
                      yAnchor: 1.2,
                    });

                    // 마커 클릭 시 오버레이 표시/숨김 토글
                    window.kakao.maps.event.addListener(marker, "click", () => {
                      customOverlay.setMap(
                        customOverlay.getMap() ? null : mapInstance,
                      );
                    });
                  });
                } else {
                  console.error("Expected an array, but received:", cats);
                }
              })
              .catch((error) =>
                console.error("Error fetching stray cat data:", error),
              );
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

  // 지연을 위한 비동기 함수
  const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  // 보호소 데이터 마커에 지연 추가
  const placeMarkersWithDelay = async (shelters, mapInstance) => {
    const geocoder = new window.kakao.maps.services.Geocoder();

    for (let i = 0; i < shelters.length; i++) {
      const shelter = shelters[i];
      await delay(200);

      geocoder.addressSearch(shelter.주소, (result, status) => {
        if (status === window.kakao.maps.services.Status.OK) {
          const coords = new window.kakao.maps.LatLng(result[0].y, result[0].x);

          const imageSrc = "/img/markerimg/marker-shelter.png";
          const imageSize = new window.kakao.maps.Size(43, 56);
          const imageOption = { offset: new window.kakao.maps.Point(16, 32) };
          const markerImage = new window.kakao.maps.MarkerImage(
            imageSrc,
            imageSize,
            imageOption,
          );

          const marker = new window.kakao.maps.Marker({
            map: mapInstance,
            position: coords,
            image: markerImage,
          });

          const overlayContent = `
            <div style="position: relative; bottom: 30px; width: 150px; padding: 5px; text-align: center; font-size: 12px; background: #fff; border: 1px solid #ccc; border-radius: 5px;">
              <small>${shelter.보호센터명}<br>${shelter.전화번호}</small>
            </div>`;
          const customOverlay = new window.kakao.maps.CustomOverlay({
            position: coords,
            content: overlayContent,
            yAnchor: 1.2,
            map: null,
          });

          window.kakao.maps.event.addListener(marker, "click", () => {
            customOverlay.setMap(customOverlay.getMap() ? null : mapInstance);
          });
        }
      });
    }
  };

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
