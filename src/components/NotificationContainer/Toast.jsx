import React from "react";
import styled, { keyframes, css } from "styled-components";
import { observer } from "mobx-react-lite";
import { useStores } from "@stores/useStore";
import { Icon } from "@components/Icon";
import { motion, AnimatePresence } from "framer-motion";

export const Toast = observer(() => {
  const { notificationStore } = useStores();

    return (
    <>
      <NotificationContainer>
        <NotificationMessage>
            <ScrollDiv>
                {notificationStore.toastList.map((toast, index) => {
                  if (toast.timer < 0) {
                    notificationStore.deleteNotification(toast.id);
                  }
                  const type = toast.type || "information";

                  const colorScheme = {
                    done: { backgroundColor: "#F3FBF4", colorBorder: "#51C360", textColor: "#45BF55" },
                    error: { backgroundColor: "#FEEFF0", colorBorder: "#F71A2F", textColor: "#F60A20" },
                    information: { backgroundColor: "#EEF5FF", colorBorder: "#1170FF", textColor: "#0066FF" },
                    warning: { backgroundColor: "#fcede2", colorBorder: "#f6a51e", textColor: "#F8A007FF" },
                  };

                  const variantsAnimations = {
                    hidden: {
                      y: 100,
                      opacity: 0,
                    },
                    visible: {
                      y: 0,
                      opacity: 0.9,
                    },
                    exit: {
                      y: 100,
                      opacity: 0,
                    },
                  };

                  return (
                    <AnimatePresence key={`toast-${index}`}>
                        {toast.timer >= 1 && (
                        <Notification
                          style={{
                            backgroundColor: colorScheme[type].backgroundColor,
                            border: `solid 1px ${colorScheme[type].colorBorder}`,
                          }}
                          transition={{ delay: 0.2 }}
                          initial={"hidden"}
                          animate={"visible"}
                          exit={"exit"}
                          variants={variantsAnimations}
                        >
                            <NotificationImage>
                              <Icon width={20} height={20} style={{ color: colorScheme[type].textColor }} name={toast.icon} />
                            </NotificationImage>
                            <Title>{toast.title} {toast.description}</Title>
                              {/*<TitleDescriptionAndTimer>*/}
                              {/*    <TimerContainer color={colorScheme[type].textColor}>*/}
                              {/*        {toast.timer}*/}
                              {/*        <SpinnerContainer>*/}
                              {/*            <Spinner width={28} height={28} color={colorScheme[type].textColor} />*/}
                              {/*        </SpinnerContainer>*/}
                              {/*    </TimerContainer>*/}
                              {/*</TitleDescriptionAndTimer>*/}
                        </Notification>
                        )}
                    </AnimatePresence>
                  );
                })}
            </ScrollDiv>
        </NotificationMessage>
      </NotificationContainer>
    </>
  );
});

const Up = styled.div`
  width: 100%;
  height: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const Down = styled.div`
  width: 100%;
  height: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s;
`;

const toastinright = keyframes`
  from {
      transform: translateY(100%);
    }
    to {
      transform: translateY(0);
    }
`;

const Notification = styled(motion.div)`
  background: #fff;
  position: relative;
  pointer-events: auto;
  overflow: hidden;
  margin: 0 0 6px;
  margin-bottom: 15px;
  //max-height: 100px;
  border-radius: 12px 12px 12px 12px;
  //box-shadow: 0 0 2px #999;
  opacity: 0.9;
  background-position: 15px;
  background-repeat: no-repeat;
  //min-height: 70px;
  //height: 70px;
  height: auto;
  min-height: auto;
  width: 320px;
  color: black;
  padding: 20px 5px 20px 10px; 
  display: flex;
  align-items: center;
  //transition: all .3s;
  box-shadow: 0 0 5px #999;

  :hover {
    // box-shadow: 0 0 5px #999;
    // opacity: 1;
    // cursor: pointer;
    // min-height: ${(p) => (p.count > 1 ? (p.count - 1) * 25 + 70 : 70)}px;
    // height: ${(p) => (p.count > 1 ? (p.count - 1) * 25 + 70 : 70)}px;
  }
`;

const Button = styled.button`
  //position: relative;
  //right: -0.3em;
  //bottom: 0.5em;
  //float: right;
  margin-right: 10px;
  font-weight: 700;
  color: #000;
  outline: none;
  text-shadow: 0 1px 0 #fff;
  //opacity: 0.8;
  line-height: 1;
  font-size: 16px;
  padding: 0;
  cursor: pointer;
  background: 0 0;
  border: none;
  img {
    width: 14px;
    height: 14px;
  }
`;

const Title = styled.div`
  font-weight: bold;
  font-size: 16px;
  text-align: left;
  width: 700px;
  word-wrap: break-word;
  //word-break: break-all;
  //height: 18px;
`;

const NotificationContainer = styled.div`
  bottom: 0; //20px
  font-size: 14px;
  box-sizing: border-box;
  position: fixed;
  z-index: 200000;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  pointer-events: none;
  transition: transform 0.6s ease-in-out;
  // animation: ${toastinright} 0.7s;
  // border: solid 2px red;
  //max-height: 33%;
`;

const NotificationImage = styled.div`
  float: left;
  margin-right: 15px;
  //margin-top: 5px;
`;

const NotificationMessage = styled.div`
  // background-color: white;
  // border: solid 2px rgba(192, 192, 192, 0.5);
  border-radius: 10px;
  pointer-events: auto;
  // padding: 10px 20px;
  margin-right: 20px;
  display: flex;
  flex-direction: column-reverse;
  //max-height: 300px;
  //cursor: pointer;
`;

const ButtonOption = styled.button`
  cursor: pointer;
  pointer-events: auto;
  color: #444;
  outline: none;
  border: none;
  width: 20px;
  height: 20px;
  border-radius: 100px;
  cursor: pointer;
  background: 0 0;
  border: solid 0.3px black;
  margin-right: 5px;
  margin-top: auto;
  opacity: 0.6;
  :hover {
    color: white;
    opacity: 1;
  }
`;

const Img = styled.div`
  width: 30px;
  height: 30px;
`;

const Header = styled.div`
  display: flex;
  justify-content: flex-end;
  // padding-bottom: 10px;
  z-index: 999;
  left: 0;
`;

const ScrollDiv = styled.div`
  // border: solid 1px green;
  //max-height: 260px;
  padding: 10px 20px;
  //overflow-y: auto;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-bottom: 10px;
`;

const Ring = styled.div`
  display: flex;
  align-items: center;
  margin-right: 20px;
  position: relative;
`;

const Alert = styled.div`
  background: #ff7220;
  width: 15px;
  height: 16px;
  color: white;
  position: absolute;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  top: -6px;
  right: -7px;
  border-radius: 3px;
`;
const TimerContainer = styled.div`
  width: 30px;
  height: 30px;
  font-size: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  position: relative;
  ${(p) =>
    p.color &&
    css`
      color: ${p.color};
    `}
`;

const Left = styled.div`
  width: 90%;
`;
const Right = styled.div`
  width: 10%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const TitleDescriptionAndTimer = styled.div`
  display: flex;
`;

const SpinnerContainer = styled.div`
  position: absolute;
`;
