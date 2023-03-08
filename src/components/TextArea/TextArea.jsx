import React, {useRef, useState} from 'react';
import styled,{css} from "styled-components";
import {Icon} from "@components/Icon";

export const TextArea = ({label,placeholder,icon,secureTextEntry,type="text",value,onChange,maxLength,...props}) => {

    const [isFocus,setIsFocus] = useState(false);

    const onChangeTextArea = (e) => {
        if(onChange){
            onChange(e.target.value)
        }
    }

    const countMax = maxLength  -  (value ? value.split("").length : 0);

    return (
        <Container>
            <LabelContainer>
                <Label>{label}</Label>
            </LabelContainer>
            <InputContainer isFocused={isFocus}>
                <IconContainer>
                    {icon && <Icon name={icon} height={20} width={20} style={{color: "#063b87"}} />}
                </IconContainer>
                <TextAreaField
                    onFocus={()=>setIsFocus(true)}
                    onBlur={()=>setIsFocus(false)}
                    value={value}
                    onChange={onChangeTextArea}
                    type={type}
                    secureTextEntry={secureTextEntry}
                    placeholder={placeholder}
                    maxLength={maxLength}
                    {...props}
                />
            </InputContainer>
            <LabelContainer>
                <Label>осталось символов {countMax}</Label>
            </LabelContainer>
        </Container>
    );
};

const IconContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 10px;
`

const TextAreaField = styled.textarea`
  width: 100%;
  outline-style: none;
  border: none;
  font-family: Nunito-Regular,sans-serif;
  resize: none;
  font-size: 12px;
  height: 100px;
`

const InputContainer = styled.div`
  color: #063b87;
  border: 1px solid #063b87;
  border-radius: 5px;
  padding: 5px;
`

const Container = styled.div`
  margin: 10px 0;
  max-width: 100%;
`

const LabelContainer = styled.div`
`
const Label = styled.div`
  font-size: 12px;
  color: #063b87;
  
  ${(p)=>p.type === "white" && css`
    color: #ffffff;
  ` }
`