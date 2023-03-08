import React from 'react';
import styled,{css} from "styled-components";
import {observer} from "mobx-react";

export const Button = observer(({children,onClick,style,disable = false}) => {

    const onClickButton = () => {
        if(!disable && onClick){
            onClick();
        }
    }

    return (
        <ButtonContainer
            onClick={onClickButton}
            style={style}
            disable={disable}
        >
            {children}
        </ButtonContainer>
    );
});

const ButtonContainer = styled.button`
  max-height: 40px;
  width: 100%;
  text-transform: uppercase;
  background: #EBBBBB;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 13px;
  height: 40px;
  min-width: 200px;
  color: #fefefe;
  border: none;
  outline: none;
  cursor: pointer;
  border-radius: 12px;
  
  ${(p)=>p.disable && css`
    background:#EBBBBB;
  `}
`