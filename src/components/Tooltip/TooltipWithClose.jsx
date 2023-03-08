import React, { useState } from "react";
import styled from "styled-components";
import { Tooltip } from "@components/Tooltip";
import { Icon } from "@components/Icon";

export const TooltipWithClose = ({ children, content, title }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleOpen = () => {
    setIsOpen((prevState) => {
      return !prevState;
    });
  };

  return (
    <Errors>
      <Tooltip
        placement="right"
        interactive={true}
        visible={isOpen}
        onClickOutside={() => setIsOpen(false)}
        content={
          <>
            <Container>
              <Header>
                <Title>{title}</Title>
                <IconContainer onClick={toggleOpen}>
                  <Icon name="close" width={20} height={20} style={{ marginTop: "1px", border: "solid 1px gray", borderRadius: "10px" }} />
                </IconContainer>
              </Header>
              <Body>{content}</Body>
            </Container>
          </>
        }
      >
        <InfoContainer onClick={toggleOpen}>{children}</InfoContainer>
      </Tooltip>
    </Errors>
  );
};

const Container = styled.div``;

const Title = styled.div`
  font-size: 18px;
  width: 100%;
  display: flex;
  justify-content: center;
`;

const Body = styled.div``;

const Header = styled.div`
  display: flex;
  position: sticky;
  top: -10px;
  background-color: white;
  margin-bottom: 10px;
`;

const IconContainer = styled.div`
  cursor: pointer;
  opacity: 0.5;
  padding: 2px 2px;
  &:hover {
    opacity: 1;
  }
`;

const InfoContainer = styled.div``;

const Errors = styled.div``;
