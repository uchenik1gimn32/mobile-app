import React from 'react';
import styled,{css} from "styled-components";

export const Title = ({name,size,style,icon}) => {
    return (
        <TextContainer style={style}>
            {icon && icon}
            {size=== "big" && <H1>{name}</H1>}
            {size=== "small" && <H2>{name}</H2>}
        </TextContainer>
    );
};

const H1 = styled.h1`
  color: #063b87;
  font-size: 26px;
  font-weight: 400;
  font-family: 'Ropa Sans', sans-serif !important;
`

const H2 = styled.div`
  color: white;
  font-size: 43px;
  padding: 59px 0px 0px;
  font-family: 'Ropa Sans', sans-serif !important;
`

const TextContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: row;
`