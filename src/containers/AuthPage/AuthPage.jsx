import React, {useState, useEffect} from 'react';
import {
    LoginButton,
    NotFoundAcc,
    DownContainer,
    ForgetLink,
    TextContainer,
    ForgetButton,
    Windows,
    Form,
    LogoContainer
} from "./AuthPageStyle"
import {Icon} from "@components/Icon";
import {TextField} from "@components/TextField";
import {Title, Input, Button} from "~/components";
import {useStores} from "@stores/useStore";
import {Redirect, useHistory} from "react-router-dom";
import {observer} from "mobx-react";
import styled from "styled-components";
import axios from "axios";
import {stores} from "@stores/RootStore";
import * as storage from "~/lib/localStorage";
import {setToken} from "~/lib/localStorage";

const urlconfig = {
    HEADERS : {
        'Host':  'api.uzkanova.ru',

        'Authorization': 'Bearer dfa93495acb0aca22d68556ac349866471c38b649dbc9f06b33539eb5c357d6b57fa7fad3541ee2f47fb26ccb39f2a8d98030ebc253e842eb54f8223cdef8a0e',
        'Accept': 'application/json',
    },
    URL:'api.uzkanova.ru'
}


export const AuthPage = observer(() => {
    const {authStore} = useStores();
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");
    const [isHasError,setIsHasError] = useState(false);
    const [captchaValue, setCaptcha] = useState("");

    let history = useHistory();


    const clickLogin = async () => {
        console.log(urlconfig, 999)
        let urlauth = `https://${urlconfig.URL}/api/auth`


        axios.post(urlauth,  {
            email :email,
            password: password
        },{headers: urlconfig.HEADERS}).then(res => {
            if (res.data.status === 'error') {
                stores.notificationStore.addNotification({
                    title: 'Заполните все поля',
                    description: res.response.text,
                    icon: "error",
                    type: "error",
                });
                return
            }

            authStore.userInformation = res.data.data.user;
            storage.setInfoUser(res.data.data.user);
            storage.setToken(res.data.data.token)
            history.push(`/profile`);
        }).catch(res => {
            stores.notificationStore.addNotification({
                title: 'Заполните все поля',
                description: res?.response?.data?.message || 'Ошибка',
                icon: "error",
                type: "error",
            });
        })
    };

    if (authStore.isAuth) {
        return <Redirect to="/" />;
    }

    const handleChangeCaptcha = ({ target: { value } }) => {
        setCaptcha(value);
    };

    return (
            <Windows>
                <Form>
                    <TitleBox>
                        <LogoContainer>
                            <Icon name="logoNative" width={66} height={120} />
                        </LogoContainer>
                        <Title name="RIGER" size="small" />
                    </TitleBox>


                    <Input isErrors={isHasError} value={email} onChange={(value)=>{
                        setIsHasError(false);
                        setEmail(value);
                    }} label="Почта*" placeholder="Введите почту" icon="user" />
                    <Input isErrors={isHasError} value={password} onChange={(value)=>{
                        setIsHasError(false);
                        setPassword(value);
                    }} label="Пароль*" placeholder="Введите пароль" type="password" icon="password" />
                    {/*<ForgetButton onClick={()=>{*/}
                    {/*    history.push(`/forget-password`)*/}
                    {/*}} >*/}
                    {/*    <Title name="Забыли пароль" size="small" />*/}
                    {/*</ForgetButton>*/}
                    <TextContainer>
                        <LoginButton>
                            <Button disable={email === "" || password === ""} onClick={clickLogin} >Войти</Button>
                        </LoginButton>
                        {authStore.itsCaptcha && <img id="images" src={authStore.captchaSet.img} alt="captcha" />}
                        {authStore.itsCaptcha && <Input label="Код*" placeholder="Введите код" onChange={handleChangeCaptcha} value={captchaValue} />}
                        <DownContainer>
                            <NotFoundAcc>Нет аккаунта?</NotFoundAcc>
                                <ForgetLink onClick={()=>{
                                    history.push(`/registration`)
                                }}>
                                    Зарегистрироваться
                                </ForgetLink>
                        </DownContainer>
                    </TextContainer>
                </Form>
            </Windows>
    );
});

const TitleBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`