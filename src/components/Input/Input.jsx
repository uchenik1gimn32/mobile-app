import React, {useRef, useState} from 'react';
import styled,{css} from "styled-components";
import {Icon} from "@components/Icon";

export const Input = ({label,placeholder,icon,secureTextEntry,type="text",value,onChange,isErrors=false}) => {

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
            <InputContainer isFocused={isFocus} isErrors={isErrors}>
                <IconContainer>
                    {icon && <Icon name={icon} height={20} width={20} style={{color: "white"}} />}
                </IconContainer>
                <InputTextField
                    onFocus={()=>setIsFocus(true)}
                    onBlur={()=>setIsFocus(false)}
                    value={value}
                    onChange={onChangeText}
                    type={type}
                    secureTextEntry={secureTextEntry}
                    placeholder={placeholder} />
            </InputContainer>
        </Container>
    );
};

const IconContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 10px;
  color: #f0f8ff;

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

  ${(p)=>p.isErrors && css`
    border-bottom-color: red !important;
  `}
`

const Container = styled.div`
  margin: 10px 0;
  max-width: 100%;
`

const LabelContainer = styled.div`
`
const Label = styled.div`
  font-size: 12px;
  color: white;
  
  ${(p)=>p.type === "white" && css`
    color: #ffffff;
  ` }
`