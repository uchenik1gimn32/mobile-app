import React, {useRef, useState} from 'react';
import styled,{css} from "styled-components";
import {Icon} from "@components/Icon";

export const InputCustom = ({label,placeholder,icon,colorIcon,sizeIcon = '16px',secureTextEntry,type="text",value,onChange,color}) => {

    const [isFocus,setIsFocus] = useState(false);

    const onChangeText = (e) => {
        if(onChange){
            onChange(e.target.value)
        }
    }

    return (
        <Container>
            <LabelContainer>
                <Label type={type}>{label}</Label>
            </LabelContainer>
            <InputContainer isFocused={isFocus}>
                <IconContainer>
                    {icon && <Icon name={icon} style={{fill: colorIcon, width: sizeIcon, height: sizeIcon}}/>}
                </IconContainer>
                <InputTextField
                    onFocus={()=>setIsFocus(true)}
                    onBlur={()=>setIsFocus(false)}
                    value={value}
                    onChange={onChangeText}
                    type={type}
                    secureTextEntry={secureTextEntry}
                    placeholder={placeholder}
                    style={{color: color ? color :"black"}}
                />
            </InputContainer>
        </Container>
    );
};

const IconContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 10px;
`

const InputTextField = styled.input`
  width: 100%;
  height: 40px;
  outline-style: none;
  border: none;
  background: transparent;
`

const InputContainer = styled.div`
  display: flex;
  flex-direction: row;
  border: none;
  border-bottom: solid 1px  #cfd2e1;
  
  ${(p)=>p.isFocused && css`
    border-bottom-color: #ffc31e;
  `}
`

const Container = styled.div`
  margin: 10px 0;
  max-width: 100%;
  padding-top: 16px;
  position: relative;
`

const LabelContainer = styled.div`
  
`
const Label = styled.div`
    font-size: 12px;
    color: white;
    position: absolute;
    font-family: Exo2-Regular,sans-serif;
    top: 4px;
    z-index: 10;
  
  ${(p)=>p.type === "white" && css`
    color: #ffffff;
  ` }
`