import React, {useState} from 'react';
import {PageLayout} from "@layouts/PageLayout";
import styled,{css} from "styled-components";
import {Title, Input, Button} from "../../components";
import {Icon} from "@components/Icon";
import {useHistory} from "react-router-dom";
import {useStores} from "@stores/useStore";

export const ForgetPasswordPage = () => {

    let history = useHistory();

    const {authStore} = useStores();

    const [email,setEmail] = useState("");

    const sendMessageOnEmail = async () => {
       await authStore.forgetPassword(email)
    }

    return (
        <PageLayout isHead>
            <Windows>
                <Form>
                    <LogoContainer>
                        <Icon name="logo" width={50} height={50.5} />
                    </LogoContainer>
                    <Title name="Demand Response Mobile" size="small" />
                    <Title name="Форма восстановления пароля" size="medium" />
                    <Input value={email} onChange={setEmail} label="Почта*" placeholder="Введите почту" icon="user" />
                    <TextContainer>
                        <LoginButton>
                            <Button onClick={sendMessageOnEmail} disable={email.split(``).length === 0}>Отправить</Button>
                        </LoginButton>
                        {/*<DownContainer>*/}
                        {/*    <NotFoundAcc>Нет аккаунта?</NotFoundAcc>*/}
                        {/*        <ForgetLink onClick={()=>{*/}
                        {/*            history.push(`/registration`)*/}
                        {/*        }}>*/}
                        {/*            Зарегистрироваться в качестве потребителя*/}
                        {/*        </ForgetLink>*/}
                        {/*</DownContainer>*/}
                    </TextContainer>
                </Form>
            </Windows>
        </PageLayout>
    );
};

const LoginButton = styled.div`
  padding: 0 15px;
`

const NotFoundAcc = styled.div`
  color: #063b87;
  font-size: 13px;
`

const DownContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  margin-top: 20px;
`

const ForgetLink = styled.div`
  font-weight: 900;
  color: #063b87;
  font-size: 12px;
  margin-left: 5px;
  cursor: pointer;
`

const TextContainer = styled.div`
  margin-top: 10px;
`

const ForgetButton = styled.div`
  align-items: flex-end;
  justify-content: flex-start;
  cursor: pointer;
`

const Windows = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 15px;
`

const Form = styled.div`
  width: 100%;
  padding: 15px;
`

const LogoContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`