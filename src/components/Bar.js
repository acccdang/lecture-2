import React from 'react';
import styled from 'styled-components';

const Bar = (props) => {
  return (
    <BarWrapper onClick={props.handleClickBar} isSelected={props.isSelected}>
      <BarInfo>
        <Percent>{props.percent}%</Percent>
        <ItemVaue>{props.itemValue}</ItemVaue>
        <Count>{props.count}</Count>
      </BarInfo>
      <BarGraph width={props.percent} isSelected={props.isSelected}></BarGraph>
    </BarWrapper>
  );
};

const BarWrapper = styled.div`
  position: relative;
  margin-bottom: 3px;
  padding: 8px 0;
  background: ${({ isSelected }) => (isSelected ? '#dddddd' : '#f3f3f3')};
`;
const BarInfo = styled.div`
  width: 100%;
  display: flex;
  z-index: 2;
  position: relative;
`;
const Percent = styled.span`
  text-align: right;
  min-width: 70px;
  flex: 0 0 auto;
`;
const ItemVaue = styled.span`
  padding-left: 60px;
  flex: 1 1 0%;
`;
const Count = styled.span`
  padding-right: 20px;
  flex: 0 0 auto;
`;

/*
기존 : width를 직접 변경
변경 : width는 고정으로 두고, transform 속성을 이용해 bar 그래프의 수치를 표현

width를 직접 변경시키면, 변경할 때 마다 reflow가 발생하기 때문에, 성능 저하가 일어날 수 있다.
가령, frame이 그려져야 하는 시점에 아직 composite layers 작업을 하고 있다던지..
transform, opacity 속성은 GPU를 이용하여 layer를 구성하게 된다. 즉, reflow, repaint 작업이 일어나지 않는다.
이를 이용해 animation 성능 최적화가 가능하다.
 */
const BarGraph = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  transform: scaleX(${({ width }) => width / 100});
  transform-origin: center left;
  transition: transform 1.5s ease;
  height: 100%;
  background: ${({ isSelected }) =>
    isSelected ? 'rgba(126, 198, 81, 0.7)' : 'rgb(198, 198, 198)'};
  z-index: 1;
`;

export default Bar;
