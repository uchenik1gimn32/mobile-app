import React from "react";
import ReactDOM from "react-dom";
import styled from "styled-components";
import {Icon} from "@components/Icon";

export const Modal = ({ children, onClose, title, size }) => {
  return ReactDOM.createPortal(
    <Overlay>
      <Container size={size}>
        <Header>
            <ModalClose>
                <Icon onClick={onClose} name={'close'} width={19} height={19} style={{fill: 'rgb(255, 255, 255)'}}/>
            </ModalClose>

            <ModalLogo>
                <Icon name="logoWhite" width={55} height={55} />
            </ModalLogo>

            <Name>
                <TitleName dangerouslySetInnerHTML={{__html: title}} />
            </Name>
        </Header>
        <BodyContainer>{children}</BodyContainer>
      </Container>
    </Overlay>,
    document.body
  );
};

const TitleName = styled.h1`
    text-align: center;
    box-sizing: border-box;
    margin: 0;
    padding: 0;
    border: 0;
    font: inherit;
    vertical-align: baseline;
    font-weight: 400;
    font-family: Exo2-Regular,sans-serif;
    font-size: 1em;
    color: #063b87;
    margin-bottom: 5px;
`

const ModalLogo = styled.div`
    width: 50px;
    margin: 20px 0 10px;
`

const ModalClose = styled.div`
    text-align: center;
    color: #063b87;
    box-sizing: border-box;
    margin: 0;
    padding: 0;
    border: 0;
    font: inherit;
    vertical-align: baseline;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: row;
    position: absolute;
    top: 10px;
    right: 10px;
    width: 40px;
    height: 40px;
`

const Overlay = styled.div`
    color: #040424;
    box-sizing: border-box;
    margin: 0;
    padding: 0;
    border: 0;
    font-size: 100%;
    font: inherit;
    vertical-align: baseline;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: row;
    width: 100vw;
    height: 100%;
    background: hsla(0,0%,100%,.9);
    position: fixed;
    left: 0;
    top: 0;
    z-index: 999;
`;

export const Container = styled.div`
    color: #040424;
    box-sizing: border-box;
    margin: 0;
    padding: 0;
    border: 0;
    font-size: 100%;
    font: inherit;
    vertical-align: baseline;
    position: relative;
    max-width: 90%;
    box-shadow: 0 6px 7px -4px rgba(0,0,0,.2),0 11px 15px 1px rgba(0,0,0,.14),0 4px 20px 3px rgba(0,0,0,.12);
    border-radius: 15px;
    border-right: 5px;
    overflow: hidden;
    width: 90%;
    background-color: rgb(6, 59, 135);
    
`;
export const Header = styled.div`
    display: flex;
    padding: 10px;
    flex-direction: column;
    align-items: center;
    position: relative;
    background-color: rgb(6, 59, 135);
    color: white;
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
`;
export const Name = styled.div`
    text-align: center;
    color: #063b87;
    box-sizing: border-box;
    font-size: 100%;
    vertical-align: baseline;
    width: 100%;
    border: 1px solid #fefefe;
    border-radius: 25px;
    background: #fefefe;
    padding: 5px 0;
    margin: 5px auto;
`;


const BodyContainer = styled.div`
    padding: 20px 10px;
    overflow-y: auto;
`;
