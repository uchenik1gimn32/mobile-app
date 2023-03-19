import React, {useState, useEffect} from 'react';
import {PageLayout} from "@layouts/PageLayout";
import styled,{css} from "styled-components";
import {Title, Input, Button,TextArea} from "../../components";
import {useHistory} from "react-router-dom";
import {Icon} from "@components/Icon";
import axios from "axios";
import {stores} from "@stores/RootStore";
import { Redirect } from "react-router-dom";
import {useStores} from "@stores/useStore";

const urlconfig = {
    HEADERS : {
        'Host':  'api.uzkanova.ru',

        'Authorization': 'Bearer dfa93495acb0aca22d68556ac349866471c38b649dbc9f06b33539eb5c357d6b57fa7fad3541ee2f47fb26ccb39f2a8d98030ebc253e842eb54f8223cdef8a0e',
        'Accept': 'application/json',
    },
    URL:'api.uzkanova.ru'
}

export const RegistrationPage = () => {
    const {authStore} = useStores();

    let history = useHistory();

    const [email,setEmail] = useState('');
    const [inn,setInn] = useState('');
    const [innAggregator,setInnAggregator] = useState('');
    const [password,setPassword] = useState('');
    const [city,setCity] = useState('');
    const [comments,setComments] = useState('');
    const [age,setAge] = useState('');
    const [sex,setSex] = useState('F');



    const isDisable = email.split(``).length === 0 ||
        inn.split(``).length === 0 ||
        innAggregator.split(``).length === 0 ||
        password.split(``).length === 0

    return (
        <PageLayout>
            <Windows>
                <Form>
                    <LogoContainer>
                        <Icon name="logoNative" width={80} height={100} />
                    </LogoContainer>
                    <Title name="Форма регистрации" size="medium" />
                    <Input label="Почта*" value={email} onChange={setEmail} placeholder="Введите почту" icon="user" />
                    <Input label="Фамилия*" value={innAggregator} onChange={setInnAggregator} placeholder="Введите Фамилию" icon="key" />
                    <Input label="Имя*" value={inn} onChange={setInn} placeholder="Введите Имя" icon="key" />
                    <Input label="Возраст*" value={age} onChange={setAge} placeholder="Введите Возраст" icon="key" />
                    <Input label="Пароль*" value={password} onChange={setPassword} placeholder="Введите Пароль ..." secureTextEntry icon="password" />
                    <Input label="Город*" value={city} onChange={setCity} placeholder="Введите город ..." secureTextEntry icon="user" />
                    <p>
                        <input  value={'M'} type="radio" id="test1" name="radio-group" checked/>
                            <Labels htmlFor="test1">Мужчина</Labels>
                    </p>
                    <p>
                        <input value={'F'} type="radio" id="test2" name="radio-group"/>
                            <Labels htmlFor="test2">Женщина</Labels>
                    </p>
                    <ForgetButton name="Забыли пароль" size="small"  />
                    <TextContainer>
                        <LoginButton>
                            <Button  onClick ={() => {

                                let urlReg = 'https://api.uzkanova.ru/api/register'

                                axios.post(urlReg, {
                                        name: inn,
                                        password: password,
                                        age: age,
                                        city: city,
                                        sex: document.querySelector('input[name="radio-group"]:checked').value,
                                        email:email

                                    },{headers: urlconfig.HEADERS}).then(res => {
                                    history.push(`/login`)
                                    stores.notificationStore.addNotification({
                                        title: 'Вы успешно зарегистррованны',
                                        description: '',
                                        icon: "save",
                                        type: "done",
                                    });
                                }).catch(res => {
                                    stores.notificationStore.addNotification({
                                        title: 'Заполните все поля',
                                        description: res?.response?.data?.message || 'Ошибка сервера!',
                                        icon: "error",
                                        type: "error",
                                    });
                                })
                            }} >Зарегистрироваться</Button>
                        </LoginButton>
                        <DownContainer>
                            <NotFoundAcc>Есть аккаунт?</NotFoundAcc>
                                <ForgetLink onClick={()=>{

                                    history.push(`/login`)
                                }}>
                                    Войти
                                </ForgetLink>
                        </DownContainer>
                    </TextContainer>
                </Form>
            </Windows>
        </PageLayout>
    );
};

const Labels = styled.label`
color: white;
  
`

const LoginButton = styled.div`
  padding: 0 15px;
`

const NotFoundAcc = styled.div`
  color:white ;
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
  color: white;
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
  
  ${(p)=>p.isWeb && css`
    cursor: pointer;
  `}
`

const Windows = styled.div`
  width: 100%;
  height: 104%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 15px;
  background: linear-gradient(180deg, rgba(252, 52, 112, 0.23) -3.3%, rgba(242, 14, 14, 0.260417) -3.3%, rgba(198, 22, 60, 0.844717) 65.97%, rgba(198, 22, 60, 0.844717) 75.35%, #BA1849 96.25%, rgba(198, 22, 60, 0.844717) 40.7%);
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