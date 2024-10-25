import React, { useEffect, useState } from 'react';
import 'bootstrap-icons/font/bootstrap-icons.css'; // 부트스트랩 아이콘 CSS 불러오기
import 'bootstrap/dist/css/bootstrap.min.css'; // 부트스트랩 CSS 불러오기

const MapPage = () => {
  const [map, setMap] = useState(null);
  const [searchKeyword, setSearchKeyword] = useState('');
  const [markers, setMarkers] = useState([]);
  const [isHovered1, setIsHovered1] = useState(false);

  useEffect(() => {
    const script = document.createElement('script');
    script.src =
      '//dapi.kakao.com/v2/maps/sdk.js?appkey=bc8bb3ad17d2d029b002292dc9ca5d78&libraries=services&autoload=false';
    script.async = true;

    script.onload = () => {
      window.kakao.maps.load(() => {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const userLat = position.coords.latitude;
            const userLng = position.coords.longitude;

            const container = document.getElementById('map');
            const options = {
              center: new window.kakao.maps.LatLng(userLat, userLng),
              level: 3, // 줌 레벨 설정
            };

            const mapInstance = new window.kakao.maps.Map(container, options);
            setMap(mapInstance); // 지도 객체 저장

            // 현재 위치에 마커 표시
            const markerPosition = new window.kakao.maps.LatLng(
              userLat,
              userLng,
            );
            const marker = new window.kakao.maps.Marker({
              position: markerPosition,
              map: mapInstance,
            });

            // 간단한 부트스트랩 스타일 InfoWindow, 너비 조정 추가
            const infowindowContent = `
            <div style="width: 147px; padding: 7px; text-align: center; font-size: 12px; background: #fff; border: 1px solid #ccc; border-radius: 5px;">
            <small class="text-muted">현재 위치</small>
              </div>`;

            const infowindow = new window.kakao.maps.InfoWindow({
              content: infowindowContent,
            });
            infowindow.open(mapInstance, marker); // 정보 창을 마커 위에 표시
          },
          (error) => {
            console.error('Geolocation error:', error);
            const defaultPosition = new window.kakao.maps.LatLng(
              33.450701,
              126.570667,
            );
            const container = document.getElementById('map');
            const options = {
              center: defaultPosition,
              level: 3,
            };
            const mapInstance = new window.kakao.maps.Map(container, options);
            setMap(mapInstance); // 지도 객체 저장
          },
        );
      });
    };

    document.head.appendChild(script);
  }, []);

  // 보호센터 검색
  const searchShelters = () => {
    if (!searchKeyword || !map) return;

    // 이전에 표시된 마커 제거
    markers.forEach((marker) => marker.setMap(null));
    setMarkers([]);

    const places = new window.kakao.maps.services.Places();
    places.keywordSearch(searchKeyword, (data, status) => {
      if (status === window.kakao.maps.services.Status.OK) {
        const newMarkers = data.map((place) => {
          const markerPosition = new window.kakao.maps.LatLng(place.y, place.x);
          const marker = new window.kakao.maps.Marker({
            position: markerPosition,
            map,
          });

          // 마커 클릭 시 정보 표시
          const infowindow = new window.kakao.maps.InfoWindow({
            content: `<div style="padding:5px;">${place.place_name}</div>`,
          });
          window.kakao.maps.event.addListener(marker, 'click', () => {
            infowindow.open(map, marker);
          });

          return marker;
        });

        setMarkers(newMarkers);
      } else {
        alert('검색 결과가 없습니다.');
      }
    });
  };

  // 스타일 객체
  const styles = {
    mapPage: {
      width: '90%',
      maxWidth: '600px',
      margin: '0 auto',
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
    },
    header: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      backgroundColor: '#f8f9fa',
      padding: '10px 20px',
      height: '50px',
      boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
    },
    headerTitle: {
      margin: 0,
      fontSize: '18px',
      textAlign: 'center',
      flexGrow: 1,
      fontFamily: 'Inter, sans-serif',
    },
    backButton: {
      fontSize: '24px',
      fontWeight: 'bold',
      background: 'none',
      border: 'none',
      cursor: 'pointer',
    },
    mapContainer: {
      flex: 1,
      width: '100%',
      height: '60vh',
    },
    buttonsContainer: {
      display: 'flex',
      justifyContent: 'space-around',
      alignItems: 'center',
      margin: '20px 0',
      padding: '0 20px',
    },
    footerButton1: {
      flex: 4,
      marginRight: '10px',
      padding: '15px',
      fontSize: '16px',
      cursor: 'pointer',
      border: 'none',
      backgroundColor: isHovered1 ? '#A9826C' : '#D2B48C',
      color: '#4B2E2E',
      borderRadius: '10px',
      transition: 'background-color 0.3s ease',
    },
    searchContainer: {
      flex: 6,
      display: 'flex',
      alignItems: 'center',
    },
    searchInput: {
      flex: 1,
      padding: '10px',
      fontSize: '16px',
      borderRadius: '5px',
      border: '1px solid #ccc',
      marginRight: '10px',
    },
    searchButton: {
      padding: '10px 20px',
      fontSize: '16px',
      cursor: 'pointer',
      border: 'none',
      backgroundColor: '#4F4F4F',
      color: '#ffffff',
      borderRadius: '5px',
    },
    footer: {
      display: 'flex',
      justifyContent: 'space-around',
      alignItems: 'center',
      backgroundColor: '#f8f9fa',
      padding: '10px 0',
      boxShadow: '0 -2px 5px rgba(0, 0, 0, 0.1)',
    },
    navButton: {
      flex: 1,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: '12px',
      color: '#4B2E2E',
    },
    navIcon: {
      fontSize: '24px',
      marginBottom: '5px',
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

      {/* "내 길냥이 도감 보기" 버튼과 검색창 */}
      <div style={styles.buttonsContainer}>
        <button
          style={styles.footerButton1}
          onMouseEnter={() => setIsHovered1(true)}
          onMouseLeave={() => setIsHovered1(false)}
        >
          내 길냥이 도감 보기
        </button>
        <div style={styles.searchContainer}>
          <input
            type="text"
            style={styles.searchInput}
            placeholder="동물 보호센터 검색"
            value={searchKeyword}
            onChange={(e) => setSearchKeyword(e.target.value)}
          />
          <button style={styles.searchButton} onClick={searchShelters}>
            검색
          </button>
        </div>
      </div>

      {/* 네비게이션 바 */}
      <footer style={styles.footer}>
        <div style={styles.navButton}>
          <i className="bi bi-patch-question" style={styles.navIcon}></i>
          <span>길냥이</span>
        </div>
        <div style={styles.navButton}>
          <i className="bi bi-house-door" style={styles.navIcon}></i>
          <span>홈</span>
        </div>
        <div style={styles.navButton}>
          <i className="bi bi-cart3" style={styles.navIcon}></i>
          <span>장바구니</span>
        </div>
        <div style={styles.navButton}>
          <i className="bi bi-person-circle" style={styles.navIcon}></i>
          <span>마이</span>
        </div>
      </footer>
    </div>
  );
};

export default MapPage;
