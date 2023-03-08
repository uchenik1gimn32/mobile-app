import React, {useEffect, useState} from "react";
import styled from "styled-components";
import {DrNavigation} from "~/components";
import {Icon} from "@components/Icon";
import {useStores} from "@stores/useStore";
import {observer} from "mobx-react";
import * as storage from "~/lib/localStorage";

export const PageLayout = observer(({ children }) => {
    const {authStore} = useStores();
    const [pageInnerWidth, setPageInnerWidth] = useState(800);

    useEffect( () => {
        setPageInnerWidth(window.innerWidth)
    }, []);

    window.addEventListener(`resize`, event => {
        setPageInnerWidth(window.innerWidth)
    }, false);


    return (
    <Page>
        {pageInnerWidth > 814 && <Turn>
            <TurnContent>
                <Icon name="logoNative" width={'40vh'} height={'auto'} />
                <TurnText>Mobile</TurnText>
                <TurnText>доступен только с мобильных устройств</TurnText>
                <TurnText>и в портретном режиме</TurnText>
            </TurnContent>
        </Turn>}
        {Object.keys(storage.getInfoUser()).length !== 0 &&  <DrNavigation/>}
        {children}
    </Page>
  );
});

const TurnText = styled.div`
    box-sizing: border-box;
    margin: 0;
    padding: 0;
    border: 0;
    font: inherit;
    vertical-align: baseline;
    font-family: Exo2-Regular,sans-serif;
    font-size: 2vw;
    color: #063b87;
`

const TurnContent = styled.div`
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
    flex-direction: column;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
`

const Page = styled.div`
  width: 100%;
  height: 104%;
`

const Turn = styled.div`
    color: #040424;
    box-sizing: border-box;
    margin: 0;
    padding: 0;
    border: 0;
    vertical-align: baseline;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    width: 100vw;
    height: 100%;
    background: #fefefe;
    z-index: 9999;
    display: block;
`
