import React from "react";
import styled, { keyframes } from "styled-components";

export const Spinner = ({ color = "#208cff" }) => {
  return (
    <SpinnerContainer>
      <Image color={color} />
    </SpinnerContainer>
  );
};

const SpinnerContainer = styled.div`
  display: flex;

  height: 26px;
  position: relative;
`;

const anim = keyframes`
  0% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(360deg);
  }
`;

const Image = styled.div`
  position: absolute;
  width: 20px;
  height: 20px;
  border: 3px solid ${(p) => p.color};
  border-top-color: transparent;
  border-radius: 50%;
  animation: ${anim} 1s linear infinite;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  margin: auto;
`;
