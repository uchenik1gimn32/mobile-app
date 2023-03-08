import styled from "styled-components";

import {observer} from "mobx-react";
import React, {useEffect, useState} from "react";
import {Title, Input, InputCustom, Button, Modal} from "~/components";
import {Form, LoginButton} from "@containers/AuthPage/AuthPageStyle";
import {useStores} from "@stores/useStore";
import * as storage from "~/lib/localStorage";
import { ChartModal } from "./ChartModal"
import {Icon} from "@components/Icon";



export const InfoModal = observer(({onClose, item, openChart, openChartIsDayli, nameAggregator}) => {
    const {calendarStore} = useStores();
    const [isMultiConsumers, setIsMultiConsumers] = useState(false);

    useEffect(async () => {
        if (storage.getInfoUser().roleCode === "CONSUMER") {
            return setIsMultiConsumers(!item.item.isMultiConsumer)
        } else {
            return setIsMultiConsumers(item.item.isMultiConsumer)
        }
    }, [])



    return (
        <>
            <Modal
                onClose={onClose}
                size="big"
                title={`${nameAggregator}<br/>${item.item.name}<br/>Всего устройств: ${item.equipments.length}`}
            >
                <Equipments>
                    {item.equipments.map(i => {
                        return <DrEquipment>
                            <Text>{i.name}</Text>
                            {i.ready && isMultiConsumers &&
                            <CheckBoxReady>
                                <Icon name={'check_box'} width={19} height={19} style={{fill: 'rgb(255, 255, 255)'}}/>
                                <LableCheck>готово</LableCheck>
                            </CheckBoxReady>}

                            {!i.ready && isMultiConsumers &&
                            <CheckBoxReady>
                                <Icon name={'check_box_outline_blank'} width={19} height={19} style={{fill: 'rgb(255, 255, 255)'}}/>
                                <LableCheck>не готово</LableCheck>
                            </CheckBoxReady>}

                            {!i.hasErrors && <Combine>
                                {i.hasBaseLoadData && calendarStore.dateParams.isFinished && <Btns>
                                    {item.item.needed && <Btn onClick={()=>openChart(i)}>
                                        <Icon name={'show_chart'} width={20} height={20} style={{fill: '#063b87'}}/>
                                    </Btn>}
                                    <Btn onClick={()=>openChartIsDayli(i)}>
                                        <Icon name={'access_time'} width={20} height={20} style={{fill: '#063b87'}}/>
                                    </Btn>
                                </Btns>}
                            </Combine>}
                            {i.hasErrors && <CombineError>
                                <Icon name={'report_problem'} width={18} height={18} style={{fill: '#ff601e'}}/>
                                Недостаточно данных для подведения итогов разгрузки
                            </CombineError>}
                        </DrEquipment>
                    })}
                </Equipments>

            </Modal>
        </>
    );
});

const Btn = styled.div`
    color: #040424;
    box-sizing: border-box;
    padding: 0;
    border: 0;
    vertical-align: baseline;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: row;
    width: 40px;
    height: 40px;
    min-width: 40px;
    border-radius: 5px;
    background: #fefefe;
    margin: 8px 5px;
`

const Btns = styled.div`
    color: #040424;
    box-sizing: border-box;
    margin: 0;
    padding: 0;
    border: 0;
    vertical-align: baseline;
    display: flex;
    flex-direction: row;
    align-items: flex-end!important;
    justify-content: flex-end!important;
    position: relative;
    width: 100px;
`

const Combine = styled.div`
    color: #040424;
    box-sizing: border-box;
    margin: 0;
    padding: 0;
    border: 0;
    vertical-align: baseline;
    display: flex;
    width: 100%;
    justify-content: flex-end;
`

const CombineError = styled(Combine)`
    display: flex;
    min-height: 20px;
    color: #fefefe;
    text-align: center;
    padding: 15px 12px 0;
`

const LableCheck = styled.span`
    user-select: none;
    cursor: pointer;
    box-sizing: border-box;
    padding: 0;
    border: 0;
    font: inherit;
    vertical-align: baseline;
    font-size: 15px;
    margin-left: 8px;
    color: rgb(255, 255, 255);
`

const CheckBoxReady = styled.div`
    color: #040424;
    box-sizing: border-box;
    margin: 0;
    padding: 0;
    border: 0;
    vertical-align: baseline;
    display: flex;
    align-items: flex-start;
    justify-content: flex-start;
    height: 16px;
    user-select: none;
    cursor: pointer;
    position: absolute;
    top: 4px;
    right: 0;
`

const Text = styled.span`
    box-sizing: border-box;
    margin: 0;
    padding: 0;
    border: 0;
    vertical-align: baseline;
    display: block;
    color: #fefefe;
    width: 55%;
    hyphens: auto;
`

const DrEquipment = styled.div`
    position: relative;
    color: #040424;
    box-sizing: border-box;
    border: 0;
    vertical-align: baseline;
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-direction: row;
    width: 100%;
    flex-wrap: wrap;
    border-radius: 3px;
    padding: 10px;
    margin: 5px 0;
`

const Equipments = styled.div`
    color: #040424;
    box-sizing: border-box;
    margin: 0;
    border: 0;
    vertical-align: baseline;
    justify-content: space-between;
    flex-direction: row;
    flex-wrap: wrap;
    border-bottom: 1px solid #fefefe;
    border-radius: 3px;
    padding: 5px;
    display: flex;
    align-items: center;
    width: 100%;
    max-height: 320px;
`
