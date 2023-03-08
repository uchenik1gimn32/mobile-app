import React, {useRef, useState, useEffect} from 'react';
import styled,{css} from "styled-components";
import {Icon} from "@components/Icon";
import {LogoContainer} from "@containers/AuthPage/AuthPageStyle";
import {NavLink} from "react-router-dom";
import {useStores} from "@stores/useStore";
import {observer} from "mobx-react";
import {useOnClickOutside} from "@hooks/useOnClickOutside";

export const DrNavigation = observer(() => {
    const {authStore} = useStores();

    const [open, setOpen] = useState(false);


    const nav = [
        // {
        //     "icon": "directions_run",
        //     "name": "Выйти",
        //     "link": false,
        //     "show": true,
        //     "prop": ""
        // },
        {
            "icon": "account_box",
            "name": "профиль",
            "link": "/profile",
            "show": false,
            "prop": "cabinet"
        },
        {
            "name": "уведомления",
            "icon": "email",
            "link": "/notifications",
            "show": false,
            "prop": "notifications"
        },
        {
            "icon": "favorites",
            "name": "Юзеры",
            "link": "/users",
            "show": false,
            "prop": "favorites"
        },
    ];


    const refNavButton = useRef();

    useOnClickOutside(refNavButton,()=>setOpen(false))

    return (
        <Nav ref={refNavButton}>

                {nav.map((i, index) => {
                    return (
                        <LinkNavigation to={i.link} active={open} index={index} key={index+'_'+i.icon}>
                            <Icon name={i.icon} width={28} height={28} style={{fill: 'white'}}/>
                        </LinkNavigation>
                    )
                })}
        </Nav>
    );
});


const LinkNavigation = styled(NavLink)`
    box-sizing: border-box;

    vertical-align: baseline;
    align-items: center;
    flex-direction: row;
    justify-content: center;

    width: 50px;
    height: 50px;
    border-radius: 50px;
    background: transparent;
    transition: all .2s ease-in;
    z-index: 9;
    display: flex;

`

const NavBtn = styled.div`
    color: #040424;
    box-sizing: border-box;
    margin: 0;
    padding: 0;
    border: 0;
    vertical-align: baseline;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 50px;
    width: 50px;
    border-radius: 50px;
    flex-direction: row;
    position: absolute;
    z-index: 10;
    -webkit-box-flex: 0;
    flex: 0 0 50px;
    background: #fefefe;
    box-shadow: 0 6px 7px -4px rgba(0,0,0,.2),0 11px 15px 1px rgba(0,0,0,.14),0 4px 20px 3px rgba(0,0,0,.12);
`

const Nav = styled.nav`
    display: flex;
    align-items: center;
    justify-content: space-around;
    flex-direction: row;
    height: 50px;
    width: 100%;
    position: fixed;
    z-index: 1001;
    bottom: 0;
    right: 0;
    border-radius: 0;
    background: lightpink;
`