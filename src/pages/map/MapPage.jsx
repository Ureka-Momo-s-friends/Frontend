import React, { useEffect, useState } from "react";
import { OverlayTrigger } from "react-bootstrap";
import Cam from "../../components/Map/Cam";
import BottomSheet from "../../components/Map/MapBottomSheet";
const MapPage = () => {
  const loggedInUser = JSON.parse(localStorage.getItem("user"));
  const userId = loggedInUser ? loggedInUser.id : null;

  const [map, setMap] = useState(null);
  const [isHovered1, setIsHovered1] = useState(false);
  const [showOffcanvas, setShowOffcanvas] = useState(false);
  const [strayCats, setStrayCats] = useState([]);
  const [userLatLng, setUserLatLng] = useState(null);
  const [showBottomSheet, setShowBottomSheet] = useState(false); // 바텀 시트 상태 추가
  const [selectedLatLng, setSelectedLatLng] = useState(null);
  const [selectedMarker, setSelectedMarker] = useState(null); // 마커 추가
  const [selectedOverlay, setSelectedOverlay] = useState(null); // 마커 오버레이 추가

  useEffect(() => {
    if (map) {
      // 클릭 이벤트 핸들러 정의
      const handleMapClick = (mouseEvent) => {
        const latLng = mouseEvent.latLng;
        const clickedLatLng = { lat: latLng.getLat(), lng: latLng.getLng() };

        // 이미 선택된 위치와 동일한 곳을 클릭했을 때 마커 제거
        if (
          selectedLatLng &&
          selectedLatLng.lat === clickedLatLng.lat &&
          selectedLatLng.lng === clickedLatLng.lng
        ) {
          if (selectedMarker) {
            selectedMarker.setMap(null); // 기존 마커 제거
            selectedOverlay.setMap(null);
          }
          setSelectedLatLng(null); // 선택된 위치 초기화
          setSelectedMarker(null); // 마커 상태 초기화
          setSelectedOverlay(null);
        } else {
          // 새로운 위치에 마커 추가
          if (selectedMarker) {
            selectedMarker.setMap(null); // 기존 마커 제거
            selectedOverlay.setMap(null);
          }

          // 새로운 마커 생성
          const marker = new window.kakao.maps.Marker({
            position: latLng,
            map,
          });

          const overlayContent = `
              <div style="position: relative; bottom: 30px; width: 75px; padding: 5px; text-align: center; font-size: 12px; background: #fff; border: 1px solid #ccc; border-radius: 5px;">
                <medium>새 길냥이</medium>
              </div>`;
          const customOverlay = new window.kakao.maps.CustomOverlay({
            position: latLng,
            content: overlayContent,
            yAnchor: 1.4,
          });
          customOverlay.setMap(map);

          setSelectedLatLng(clickedLatLng); // 선택된 위치 업데이트
          setSelectedMarker(marker); // 새로운 마커 상태 업데이트
          setSelectedOverlay(customOverlay);
        }
      };

      // 지도 클릭 이벤트 리스너 등록 (한 번만 등록)
      window.kakao.maps.event.addListener(map, "click", handleMapClick);

      // 컴포넌트가 언마운트되거나 리렌더링될 때 이벤트 리스너 제거
      return () => {
        window.kakao.maps.event.removeListener(map, "click", handleMapClick);
      };
    }
  }, [map, selectedLatLng, selectedMarker]);

  const handleCatImageClick = (lat, lng) => {
    if (map) {
      const newCenter = new window.kakao.maps.LatLng(lat, lng);
      map.setCenter(newCenter); // 클릭한 고양이 위치로 지도 중심 이동
      setShowOffcanvas(false);
    }
  };
  const handleShowOffcanvas = () => {
    if (userId) {
      setShowOffcanvas(!showOffcanvas);
    } else {
      setShowBottomSheet(true); // 비로그인 시 바텀 시트 표시
    }
  };
  const closeOffcanvas = () => {
    setShowOffcanvas(false);
  };
  const closeBottomSheet = () => setShowBottomSheet(false); // 바텀 시트 닫기

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

            setUserLatLng({ lat: userLat, lng: userLng });

            const container = document.getElementById("map");
            const options = {
              center: new window.kakao.maps.LatLng(userLat, userLng),
              level: 3,
            };

            const mapInstance = new window.kakao.maps.Map(container, options);
            setMap(mapInstance);

            const markerPosition = new window.kakao.maps.LatLng(
              userLat,
              userLng,
            );
            const markerImage = new window.kakao.maps.MarkerImage(
              "/img/markerimg/marker-me.png",
              new window.kakao.maps.Size(70, 70),
              new window.kakao.maps.Point(20, 45),
            );
            const marker = new window.kakao.maps.Marker({
              position: markerPosition,
              map: mapInstance,
              image: markerImage,
            });

            const overlayContent = `
              <div style="position: relative; margin-left: 30px; bottom: 30px; width: 50px; padding: 5px; text-align: center; font-size: 12px; background: #fff; border: 1px solid #ccc; border-radius: 5px;">
                <medium>현위치</medium>
              </div>`;
            const customOverlay = new window.kakao.maps.CustomOverlay({
              position: markerPosition,
              content: overlayContent,
              yAnchor: 1.2,
            });
            customOverlay.setMap(mapInstance);

            fetch("/shelter.json")
              .then((response) => response.json())
              .then((data) => {
                placeClosestShelters(data, mapInstance, userLat, userLng);
              })
              .catch((error) => console.error("Error loading JSON:", error));

            // userId가 있을 때만 fetchStrayCats 실행
            if (userId) {
              fetchStrayCats();
            }
          },
          (error) => {
            console.error("Geolocation error:", error);
          },
        );
      });
    };

    document.head.appendChild(script);

    return () => {
      const scriptTag = document.querySelector(`script[src*="dapi.kakao.com"]`);
      if (scriptTag) {
        document.head.removeChild(scriptTag);
      }
    };
  }, []);

  useEffect(() => {
    if (map) {
      strayCats.forEach((cat) => {
        const catPosition = new window.kakao.maps.LatLng(cat.lat, cat.lon);
        const markerImageSrc = "/img/markerimg/marker-cat.png";
        const markerImageSize = new window.kakao.maps.Size(43, 56);
        const markerImageOption = {
          offset: new window.kakao.maps.Point(20, 40),
        };
        const markerImage = new window.kakao.maps.MarkerImage(
          markerImageSrc,
          markerImageSize,
          markerImageOption,
        );

        const marker = new window.kakao.maps.Marker({
          position: catPosition,
          image: markerImage,
          map,
        });

        const overlayContent = `
          <div style="padding:5px; background:#fff; border:1px solid #ccc; border-radius:5px;">
            <img src="${cat.catImgUrl}" alt="Cat Image" style="width:50px; height:50px; border-radius:5px;" />
          </div>`;
        const customOverlay = new window.kakao.maps.CustomOverlay({
          position: catPosition,
          content: overlayContent,
          yAnchor: 1.7,
        });

        window.kakao.maps.event.addListener(marker, "click", () => {
          customOverlay.setMap(customOverlay.getMap() ? null : map);
        });

        // "새 길냥이" 마커 제거
        if (selectedMarker) {
          selectedMarker.setMap(null); // 기존 마커 제거
          selectedOverlay.setMap(null);
        }
        setSelectedLatLng(null); // 선택된 위치 초기화
        setSelectedMarker(null); // 마커 상태 초기화
        setSelectedOverlay(null);
      });
    }
  }, [map, strayCats]);

  const addStrayCat = (newStrayCat) => {
    setStrayCats([...strayCats, newStrayCat]);
  };

  const fetchStrayCats = (mapInstance) => {
    fetch(`https://ureca-momo.store/api/strayCats?memberId=${userId}`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    })
      .then((response) => response.json())
      .then((cats) => {
        if (Array.isArray(cats)) {
          setStrayCats(cats);
        } else {
          console.error("Expected an array, but received:", cats);
        }
      })
      .catch((error) => console.error("Error fetching stray cat data:", error));
  };

  const getDistance = (lat1, lng1, lat2, lng2) => {
    const R = 6371e3;
    const φ1 = (lat1 * Math.PI) / 180;
    const φ2 = (lat2 * Math.PI) / 180;
    const Δφ = ((lat2 - lat1) * Math.PI) / 180;
    const Δλ = ((lng2 - lng1) * Math.PI) / 180;

    const a =
      Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
      Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    return R * c;
  };

  const placeClosestShelters = async (
    shelters,
    mapInstance,
    userLat,
    userLng,
  ) => {
    const geocoder = new window.kakao.maps.services.Geocoder();

    const shelterDistances = await Promise.all(
      shelters.map(async (shelter) => {
        return new Promise((resolve) => {
          geocoder.addressSearch(shelter.주소, (result, status) => {
            if (status === window.kakao.maps.services.Status.OK) {
              const shelterLat = result[0].y;
              const shelterLng = result[0].x;
              const distance = getDistance(
                userLat,
                userLng,
                shelterLat,
                shelterLng,
              );
              resolve({ shelter, distance, lat: shelterLat, lng: shelterLng });
            } else {
              resolve(null);
            }
          });
        });
      }),
    );

    const closestShelters = shelterDistances
      .filter((item) => item)
      .sort((a, b) => a.distance - b.distance)
      .slice(0, 5);

    closestShelters.forEach(({ shelter, lat, lng }) => {
      const coords = new window.kakao.maps.LatLng(lat, lng);

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
    });
  };

  const goToShelterList = () => {
    window.open(
      "https://www.animal.go.kr/front/awtis/institution/institutionList.do?menuNo=1000000059",
      "_blank",
    );
  };

  const styles = {
    mapPage: {
      width: "100%",
      height: "90vh",
      display: "flex",
      flexDirection: "column",
      position: "relative",
      paddingBottom: "10vh",
      marginTop: "-17px",
    },
    mapContainer: {
      position: "relative",
      flex: 1,
      width: "100%",
      minHeight: 0,
    },
    buttonsContainer: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      padding: "10px 0 20px 0",
      flexShrink: 0, // 버튼 컨테이너 크기 고정
      gap: "10px",
      marginBottom: "-50px",
    },
    footerButton1: {
      flex: 4,
      height: "44px", // 높이 통일
      padding: "0 15px", // 패딩 수정
      fontSize: "16px",
      cursor: "pointer",
      border: "none",
      backgroundColor: isHovered1 ? "#65b0ba" : "#a1dde6",
      color: "#4B2E2E",
      borderRadius: "7px",
      transition: "background-color 0.3s ease",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
    allSheltersButton: {
      height: "44px",
      padding: "0 20px",
      fontSize: "16px",
      cursor: "pointer",
      border: "none",
      backgroundColor: "#4F4F4F",
      color: "#ffffff",
      borderRadius: "7px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
  };

  return (
    <div style={styles.mapPage}>
      <div id="map" style={styles.mapContainer}>
        <Cam
          addStrayCat={addStrayCat}
          userLatLng={userLatLng}
          selectedLatLng={selectedLatLng}
        />
      </div>
      {showOffcanvas && (
        <div
          onClick={handleShowOffcanvas}
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0, 0, 0, 0.2)", // 반투명 검은색
            zIndex: 2,
            opacity: showOffcanvas ? 1 : 0,
            transition: "opacity 0.3s ease", // 투명도 전환
          }}
        />
      )}
      {/* 커스텀 오프캔버스 */}
      <div
        style={{
          position: "absolute",
          top: 0,
          right: 0,
          width: "40%", // 맵의 30% 너비로 설정
          height: "100%", // 맵의 전체 높이에 맞춤
          backgroundColor: "white",
          boxShadow: showOffcanvas ? "0 0 10px rgba(0, 0, 0, 0.3)" : "none",
          zIndex: 2,
          overflowY: "auto",
          transform: showOffcanvas ? "translateX(0)" : "translateX(100%)",
          transition: "transform 0.3s ease",
        }}
      >
        <div style={{ padding: "10px" }}>
          <button
            onClick={closeOffcanvas}
            style={{
              position: "absolute",
              top: "-5px",
              right: "10px",
              background: "none",
              border: "none",
              fontSize: "30px",
              cursor: "pointer",
            }}
          >
            &times;
          </button>
          <h5 style={{ paddingBottom: "2px" }}>내 길냥이 도감</h5>
          {strayCats.length > 0 ? (
            strayCats.map((cat, index) => (
              <img
                key={index}
                src={cat.catImgUrl}
                alt={`Cat ${index + 1}`}
                onClick={() => handleCatImageClick(cat.lat, cat.lon)} // 클릭 시 지도 이동
                style={{
                  width: "100%",
                  marginBottom: "10px",
                  borderRadius: "8px",
                }}
              />
            ))
          ) : (
            <p>고양이 사진을 불러오는 중입니다...</p>
          )}
        </div>
      </div>

      <div style={styles.buttonsContainer}>
        <OverlayTrigger
          trigger="click"
          placement="top"
          overlay={!userId ? <></> : <></>}
        >
          <button
            style={styles.footerButton1}
            onClick={handleShowOffcanvas}
            onMouseEnter={() => setIsHovered1(true)}
            onMouseLeave={() => setIsHovered1(false)}
          >
            내 길냥이 도감 보기
          </button>
        </OverlayTrigger>
        <button style={styles.allSheltersButton} onClick={goToShelterList}>
          전체 보호소 목록
        </button>
      </div>

      {/* 바텀 시트 표시 조건 */}
      {showBottomSheet && (
        <BottomSheet
          message="홈페이지 우측 상단에서 로그인을 해주세요!"
          onClose={closeBottomSheet}
        />
      )}
    </div>
  );
};

export default MapPage;
