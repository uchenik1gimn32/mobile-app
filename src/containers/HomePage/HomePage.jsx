import React, {useState, useEffect} from 'react';
import styled from "styled-components";
import { LogoContainer} from "@containers/AuthPage/AuthPageStyle";
import {Icon} from "@components/Icon";
import { useHistory } from "react-router-dom";
import {useStores} from "@stores/useStore";


export const HomePage = () => {
    const {authStore} = useStores();

    const history = useHistory();


    const dashBord = [
        {
            "name": "кабинет",
            "link": "/profile",
            "icon": "account_box",
            "prop": "cabinet",
            "show": false
        },
        // {
        //     "name": "пользр",
        //     "link": "/events",
        //     "icon": "event",
        //     "prop": "calendar",
        //     "show": false
        // },
        {
            "name": "сообщения",
            "link": "/notifications",
            "icon": "email",
            "prop": "notifications",
            "show": false
        }
    ];

    return (
        <>
           <HomeCabinet>
               {/*<LogoContainer>*/}
               {/*    <Icon name="logo" width={150} height={166} />*/}
               {/*</LogoContainer>*/}
               {/*<TitleDR></TitleDR>*/}

               <Dashboard>
                   {dashBord.map((item, index) => {
                       return (
                           <WrapItem key={`link-nav-${index}`}>
                               <LinkNavigation onClick={()=>history.push(item.link)}>
                                   <IconWrap>
                                       <Icon name={item.icon} width={40} height={40} style={{fill: '#063B87'}}/>
                                   </IconWrap>
                               </LinkNavigation>
                               <SpanName>
                                   {item.name}
                               </SpanName>
                           </WrapItem>
                       )
                   })}
               </Dashboard>
           </HomeCabinet>
        </>
    );
};

const TitleDR = styled.h2`
    padding: 15px 0;
    text-align: center;
    font-size: 100%;
    font-weight: 400;
    vertical-align: baseline;
    font-family: 'Exo2-Regular', sans-serif;
    color: #063b87;
    @media (max-width: 440px) { 
      font-size: 12px;
    }
`

const SpanName = styled.div`
    font-family: Nunito-Regular,sans-serif;
    text-align: center;
    position: absolute;
    font-size: 1em;
    padding: 10px 0;
    top: 100%;
    color: #063b87;
`

const WrapItem = styled.div`
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
`

const HomeCabinet = styled.div`
    display: block;
    width: 100%;
    height: 100%;
    overflow: hidden;
    padding-top: 15vh;
`

const Dashboard = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-evenly;
    flex-direction: row;
    width: 400px;
    max-width: 90%;
    margin: auto;
    @media (max-width: 440px) { 
      width: 320px;
    }
`

const LinkNavigation = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    width: 80px;
    height: auto;
    border-width: 2px;
    border-color: #fefefe;
    text-decoration: none;
    position: relative;
`

const IconWrap = styled.div`
    border: 4px solid #063b87!important;
    width: 100px;
    height: 100px;
    border-radius: 15px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: row;
    @media (max-width: 440px) {
        width: calc(100vw / 1920 * 350);
        height: calc(100vw / 1920 * 350);
    }
`

