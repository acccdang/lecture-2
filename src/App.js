import React, { useState, useEffect, Suspense, lazy } from 'react';
import styled from 'styled-components';
import Header from './components/Header';
import InfoTable from './components/InfoTable';
import SurveyChart from './components/SurveyChart';
import Footer from './components/Footer';

function lazyWithPreload(importFunction) {
  const component = lazy(() => import(importFunction));
  component.preload = importFunction;
  return component;
}

// const ImageModal = lazy(() => import('./components/ImageModal'));
const ImageModal = lazyWithPreload(() => import('./components/ImageModal'));

function App() {
  const [showModal, setShowModal] = useState(false);

  // 1. 컴포넌트 preloading :: 버튼에 마우스오버됐을 경우
  // 단점
  // - 번들 사이즈가 너무 큰 경우엔 별로다.
  // - 모바일 환경에서는 무쓸모
  //   const handleMouseOver = () => {
  //     const imageModalComponent = import('./components/ImageModal');
  //   };

  // 2. 컴포넌트 preloading :: 페이지 로드 이후 preloading하기
  useEffect(() => {
    // const imageModalComponent = import('./components/ImageModal');

    // factory 패턴 이용
    ImageModal.preload();
  }, []);

  return (
    <div className="App">
      <Header />
      <InfoTable />
      <ButtonModal
        onClick={() => {
          setShowModal(true);
        }}
        // onMouseOver={handleMouseOver}
      >
        올림픽 사진 보기
      </ButtonModal>
      <SurveyChart />
      <Footer />
      <Suspense fallback={null}>
        {showModal ? (
          <ImageModal
            closeModal={() => {
              setShowModal(false);
            }}
          />
        ) : null}
      </Suspense>
    </div>
  );
}

const ButtonModal = styled.button`
  border-radius: 30px;
  border: 1px solid #999;
  padding: 12px 30px;
  background: none;
  font-size: 1.1em;
  color: #555;
  outline: none;
  cursor: pointer;
`;

export default App;
