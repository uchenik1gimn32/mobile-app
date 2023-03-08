import React from "react";
import styled from "styled-components";

import { Tooltip } from "@components/Tooltip";
import { ReactComponent as WarningIcon } from "~/icons/warning.svg";

export const ErrorTooltip = ({ errors }) => {
  const moreThanOne = errors.length > 1;
  return (
    <Errors>
      <Tooltip
        placement="right"
        interactive={true}
        content={
          <ErrorListContainer>
            <Title>{`Ошибк${moreThanOne ? "и" : "а"} валидации`}</Title>
            <ErrorList>
              {errors.map((error, index) => (
                <ErrorItem key={index}>
                  {moreThanOne && <ErrorItemNumber>{index + 1}.</ErrorItemNumber>}
                  <ErrorItemText>{error}</ErrorItemText>
                </ErrorItem>
              ))}
            </ErrorList>
          </ErrorListContainer>
        }
      >
        <WarningContainer>
          <Warning />
        </WarningContainer>
      </Tooltip>
    </Errors>
  );
};
export const Title = styled.div`
  display: flex;
  padding: 3px 12px;
  border-radius: 5px 5px 0 0;
  background: #e2dede61;
  color: gray;
`;
export const ErrorListContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 300px;
`;
export const Errors = styled.div`
  display: flex;
  position: absolute;
  top: 0px;
  right: 0px;
`;
export const WarningContainer = styled.div`
  width: 14px;
  height: 14px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #ffffff75;
  border-radius: 5px;
  padding: 3px;
`;
export const Warning = styled(WarningIcon)`
  width: 100%;
  color: red;
  width: 100%;
`;
export const ErrorList = styled.div`
  display: flex;

  flex-direction: column;

  width: 100%;
  border-radius: 5px;
  overflow: hidden;
`;
export const ErrorItem = styled.div`
  display: flex;
  align-items: center;
  padding: 6px 15px;
`;
export const ErrorItemNumber = styled.div`
  display: flex;
  color: gray;
  opacity: 0.5;
  width: 15px;
`;
export const ErrorItemText = styled.div`
  display: flex;
`;
