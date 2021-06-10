import styled from "styled-components";
import React from "react";

export const DropLine = props => {
  const Wrapper = styled.div`
    height: 1px;
    align-self: center;
    width: 100%;
  `;
  const Line = styled.div`
    position: relative;
    background-color: blue;
    width: 100%;
    height: 1px;
  `;
  const Circle = styled.div`
    height: 6px;
    width: 6px;
    border-radius: 6px;
    position: absolute;
    background-color: blue;
    left: -2px;
    top: -2px;
  `;

  return (
    <Wrapper {...props}>
      <Line>
        <Circle />
      </Line>
    </Wrapper>
  );
};
