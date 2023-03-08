import styled from "styled-components";

import {observer} from "mobx-react";
import React, {useEffect, useState} from "react";
import {Title, Input, InputCustom, Button, Modal} from "~/components";
import {Form, LoginButton} from "@containers/AuthPage/AuthPageStyle";
import {useStores} from "@stores/useStore";
import * as storage from "~/lib/localStorage";



export const ModalChangePassword = observer(({onClose, onBlocked, name}) => {
    const {authStore} = useStores();

    const [password, setPassword] = useState("");
    const [passwordNew, setPasswordNew] = useState("");
    const [passwordNews, setPasswordNews] = useState("");

    const getUserInfos = () => {
        return storage.getInfoUser()
    }

    const changePassword = () => {
        authStore.changePassword({
            "currentPassword": password,
            "email": getUserInfos().email,
            "newPassword": passwordNew
        }).then(()=>{
            onClose();
        })
    }


    return (
        <Modal
            onClose={onClose}
            size="big"
            title={'Изменение пароля'}
        >
            <InputCustom color="white" type="password" value={password} colorIcon={'white'} onChange={setPassword} label="текущий пароль*"  icon="lock" />
            <InputCustom color="white" type="password" value={passwordNew} colorIcon={'white'} onChange={setPasswordNew} label="новый пароль*"  icon="vpn_key" />
            <InputCustom color="white" type="password" value={passwordNews} colorIcon={'white'} onChange={setPasswordNews} label="повторите новый пароль*"  icon="vpn_key" />

            <Button style={{boxShadow: '0 0 4px 1px rgba(0,0,0,.5)'}} disable={password === ""} onClick={changePassword}>Изменить</Button>

        </Modal>
    );
});


