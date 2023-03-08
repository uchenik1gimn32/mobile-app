import React, { useState, useRef } from "react";
import styled, { css } from "styled-components";
import { useOnClickOutside } from "~/hooks/useOnClickOutside";
import { TooltipErrors } from "~/components/TooltipErrors";

export const TextField = ({textAlign = "start", label, value, onChange, type = "text", icon: Icon, disabled, style, id, placeholder, hasError, hasChanges, focus, onKeyUp, onEsc, onBlur, errors}) => {
  const [isFocused, setIsFocused] = useState(false);
  const isMovedLabel = isFocused || !!value;
  const ref = useRef();
  useOnClickOutside(ref, () => {
    handleonBlur({})
  });

  const handleonBlur = (e) => {
    setIsFocused(false);
    onBlur && onBlur(e);
  };
  const handleonChange = (e) => {
    onChange && onChange(e);
  };

  const handleonFocus = () => {
    setIsFocused(true);
  };

  const onKeyPress = (e) => {
    /*console.log("onKeyPress")
    const keyCode = e.keyCode || e.which;
    const keyValue = String.fromCharCode(keyCode);
    console.log(keyValue)*/
    /*if (/\+|-/.test(keyValue))
    e.preventDefault();*/
  }
  const handleOnKeyUp = (e) => {
    if(e.keyCode === 27){//ESC
      setIsFocused(false);
      onEsc && onEsc(e);
    } else if(e.keyCode === 13){
      onBlur && onBlur(e);
    }
  }

  return (
    <Container ref={ref}
      style={style} focused={isFocused} error={hasError}
      changes={hasChanges} errors={errors?.length}
    >
      {Icon && (
        <LeftSection>
          <IconWrapper focused={isFocused}>{Icon && <Icon/>}</IconWrapper>
        </LeftSection>
      )}
      <RightSection>
        {placeholder && <Placeholder moved={isMovedLabel}>{placeholder}</Placeholder>}
        <Input
          id={id}
          textAlign={textAlign}
          disabled={disabled}
          type={type}
          value={value}
          onChange={handleonChange}
          onBlur={handleonBlur}
          onFocus={handleonFocus}
          autoFocus={focus}
          onKeyUp={handleOnKeyUp}
          onKeyPress={onKeyPress}
        />
        {label && <Label moved={isMovedLabel}>{label}</Label>}
      </RightSection>

      {errors?.length > 0 && <TooltipErrors errors={errors}/>}
    </Container>
  );
};

const Container = styled.div`
  border-radius: 6px;
  position: relative;
  height: 40px;
  font-size: 14px;
  background: #ffffff;
  outline: none;
  margin: 10px 0;
  display: flex;
  align-items: center;
  border: 1px solid ${(p) => (p.focused ? "#063b87" : "#d4d9dc")};
  width: ${props => props.width ? props.width : 'auto'};
  ${(p) =>
  p.changes &&
  css`
      border: 1px solid green;
    `};

  ${(p) =>
  p.error &&
  css`
      border: 1px solid red;
    `};
  ${(p) =>
  p.errors &&
  css`
      border: 1px solid red;
    `};
`;

const Label = styled.div`
  position: absolute;
  pointer-events: none;
  transition: all 200ms;
  display: flex;
  align-items: center;
  color: black;

  ${(p) =>
  p.moved &&
  css`
      top: 0;
      transform: translate3d(-10px, -100%, 0px);
    `}
`;
const Placeholder = styled.div`
  pointer-events: none;
  color: gray;
  transition: all 200ms;
  position: absolute;
  display: flex;
  top: 0;
  bottom: 0;
  align-items: center;

  ${(p) =>
  p.moved &&
  css`
      position: static;
    `}
`;

const LeftSection = styled.div`
  border-right: 1px solid #8080802b;
  height: 100%;
  display: flex;
  align-items: center;
  padding: 0 20px;
`;
const RightSection = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  flex: 1;
  position: relative;
  padding-right: 20px;
  padding-left: 15px;
`;
const IconWrapper = styled.div`
  width: 17px;
  height: 20px;
  color: #777777;
  opacity: ${(p) => (p.focused ? "1" : "0.5")};
`;
const Input = styled.input`
  width: 100%;
  height: 100%;
  outline: none;
  border: none;
  color: black;
  text-align: ${p => p.textAlign};
`;
