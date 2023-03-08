import React from "react";
import * as Icons from "./Icons";
import styled from "styled-components";

export const Icon = (props) => {
  const { name, width, height, style, title, margin, ...rest } = props;
  const Svg = Icons[name];

  return (
    <Container title={title} {...rest}>
      <Svg width={width} height={height} style={style} />
    </Container>
  );
};

export const Container = styled.div`
  display: flex;
`;
