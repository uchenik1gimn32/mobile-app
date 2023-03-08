import styled from "styled-components";

import {observer} from "mobx-react";
import React, {useEffect, useState} from "react";
import {Title, Input, InputCustom, Button, Modal} from "~/components";
import {Form, LoginButton} from "@containers/AuthPage/AuthPageStyle";
import {useStores} from "@stores/useStore";
import * as storage from "~/lib/localStorage";
import timezone, {tz} from 'moment-timezone'



export const MassageModal = observer(({onClose, item}) => {
    const {calendarStore} = useStores();


    return (
        <>
            <Modal
                onClose={onClose}
                size="big"
                title={`${item.name ? item.name : item.senderName ? `сообщение от ${item.senderName}` : ''}<br/>
                ${timezone(item.createdDate).format('DD.MM.YYYY HH.mm')+ ' ' + ''}`}
            >
                <TextSpan>{item.senderUserLogin ?  item.text : '' }</TextSpan>

            </Modal>
        </>
    );
});

const TextSpan = styled.span`
    color: white;
    text-align: center;
    width: 100%;
    display: block;
    max-height: 320px;
    overflow: auto;
`
