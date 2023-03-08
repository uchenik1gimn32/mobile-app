import React, {useEffect, useState} from 'react';
import {PageLayout} from "@layouts/PageLayout";
import styled,{css} from "styled-components";
import {Title, Input, Button} from "../../components";
import {Icon} from "@components/Icon";
import {useHistory} from "react-router-dom";
import {useStores} from "@stores/useStore";
import * as storage from "../../lib/localStorage.js";

export const ResultItems = ({item, onOpen}) => {
    const {calendarStore} = useStores();

    const [active, setActive] = useState(false);
    const [isMultiConsumers, setIsMultiConsumers] = useState(false);

    useEffect(async () => {
        if (storage.getInfoUser().roleCode === "CONSUMER") {
            return setIsMultiConsumers(!item.isMultiConsumer)
        } else {
            return setIsMultiConsumers(item.isMultiConsumer)
        }
    }, [])

    const isNeededFlag = () => {
        return this.item.ready && !this.item.needed
    }

    return (
        <ResultItem>
            <DrObject>
                <DrObjectContent>
                    <Head>
                        <HeadText>{item.name}</HeadText>
                    </Head>
                    <Params>
                        <ParamsInfo>
                            {item.timeStart && !!item.needed &&
                                <InfoTime>
                                    Час начала разгрузки: {item.timeStart}
                                </InfoTime>
                            }

                            {item.plannedReductionVolume &&
                                <InfoTime>
                                    Плановый объем разгрузки {item.plannedReductionVolume} МВт
                                </InfoTime>
                            }

                            {item.reductionDuration &&
                                <InfoTime>
                                    Длительность разгрузки: {item.reductionDuration} часа
                                </InfoTime>
                            }
                        </ParamsInfo>

                    </Params>
                    {isMultiConsumers &&
                    <Status>
                        <StatusItem>
                            <Icon name={item.ready ? 'done':'report_problem'} width={24} height={24} style={item.ready ?  {fill: '#23a051'} : {fill: '#ff601e'}}/>

                            <StatusText>{item.ready ? 'готов' : item.ready === null ? 'нет данных о готовности' : 'не готов'}</StatusText>
                        </StatusItem>
                        {typeof item.eventResult !== `object` && calendarStore.isEventDay && item.ready && calendarStore.dateParams.isFinished &&
                        <StatusItem>
                            <Icon name={item.eventResult ? 'done_all':'report_problem' } width={20} height={20} style={item.eventResult ?  {fill: '#23a051'} : {fill: '#ff601e'}}/>
                            <StatusText>{item.eventResult ? 'исполнено' : 'не исполнено'}</StatusText>
                        </StatusItem>}
                    </Status>}
                </DrObjectContent>


                <ObjectBtns active={active} onClick={()=>setActive(!active)}>
                    <ObjectBtnsSlide>
                        <BtnSlide>
                            <Icon name={'touch_app'} width={24} height={24} style={{fill: '#063b87'}}/>
                        </BtnSlide>
                        <BtnSlide onClick={()=>onOpen(item)}>
                            <Icon name={'power'} width={24} height={24} style={{fill: '#063b87'}}/>
                        </BtnSlide>
                    </ObjectBtnsSlide>
                </ObjectBtns>
            </DrObject>
        </ResultItem>
    );
};

const BtnSlide = styled.div`
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
    border-radius: 50px;
    background: #fefefe;
    box-shadow: 0 6px 7px -4px rgba(0,0,0,.2),0 11px 15px 1px rgba(0,0,0,.14),0 4px 20px 3px rgba(0,0,0,.12);
    margin: 0 5px;
`

const ObjectBtnsSlide = styled.div`
    color: #040424;
    box-sizing: border-box;
    margin: 0;
    padding: 0;
    border: 0;
    vertical-align: baseline;
    display: flex;
    align-items: flex-start;
    justify-content: flex-start;
    flex-direction: row;
    width: 250px;
    height: 40px;
    z-index: 1;
`

const ObjectBtns = styled.div`
    color: #040424;
    box-sizing: border-box;
    margin: 0;
    padding: 0;
    border: 0;
    vertical-align: baseline;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    flex-direction: row;
    height: 50px;
    position: absolute;
    right: 6px;
    border-radius: 50px;
    overflow: hidden;
    box-shadow: 0 6px 7px -4px rgba(0,0,0,.2),0 11px 15px 1px rgba(0,0,0,.14),0 4px 20px 3px rgba(0,0,0,.12);
    background: #fefefe;
    transition: width .2s linear;
    width: 50px;
    
    ${(props) =>
    props.active &&
    css`
        width: 100px;
    `}
`

const StatusItem = styled.div`
    box-sizing: border-box;
    margin: 0;
    padding: 0;
    border: 0;
    font: inherit;
    vertical-align: baseline;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: row;
    font-family: Exo2-Regular,sans-serif;
    font-size: 12px;
    color: #fefefe;
`

const StatusText = styled.span`
    color: #fefefe;
    box-sizing: border-box;
    margin: 0;
    padding: 0;
    border: 0;
    font-size: 100%;
    font: inherit;
    vertical-align: baseline;
`

const InfoTime = styled.span`
    box-sizing: border-box;
    margin: 0;
    border: 0;
    font: inherit;
    vertical-align: baseline;
    font-family: Nunito-Regular,sans-serif;
    font-size: 12px;
    color: #fefefe;
    text-align: left;
    width: 100%;
    padding: 2px 0;
`

const ParamsInfo = styled.div`
    color: #fefefe;
    box-sizing: border-box;
    margin: 0;
    padding: 0;
    border: 0;
    vertical-align: baseline;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    width: 100%;
`

const HeadText = styled.span`
    color: #fefefe;
    text-transform: uppercase;
    box-sizing: border-box;
    margin: 0;
    padding: 0;
    border: 0;
    vertical-align: baseline;
    font-family: Nunito-Regular,sans-serif;
    font-weight: 700;
`

const Status = styled.div`
    color: #040424;
    box-sizing: border-box;
    margin: 0;
    border: 0;
    vertical-align: baseline;
    display: flex;
    align-items: center;
    justify-content: space-around;
    flex-direction: row;
    width: 90%;
    padding: 5px;
`

const Params = styled.div`
    box-sizing: border-box;
    margin: 0;
    padding: 0;
    border: 0;
    font: inherit;
    vertical-align: baseline;
    display: flex;
    align-items: flex-start;
    justify-content: center;
    flex-direction: row;
    font-family: Exo2-Regular,sans-serif;
    font-size: 12px;
    color: #fefefe;
    width: 100%;
`

const Head = styled.div`
    box-sizing: border-box;
    border: 0;
    font: inherit;
    vertical-align: baseline;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    flex-direction: column;
    font-family: Exo2-Regular,sans-serif;
    font-size: 12px;
    color: #fefefe;
    font-weight: 800;
    text-transform: uppercase;
    width: 100%;
    padding: 5px;
    margin-top: 10px;
`

const DrObjectContent = styled.div`
    color: #040424;
    box-sizing: border-box;
    margin: 0;
    padding: 0;
    border: 0;
    vertical-align: baseline;
    width: 94%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-direction: column;
`

const DrObject = styled.div`
    color: #040424;
    box-sizing: border-box;
    margin: 0;
    border: 0;
    vertical-align: baseline;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: row;
    border-radius: 15px;
    position: relative;
    background: #063b87;
    padding: 5px 0;
    height: 130px;
`

const ResultItem = styled.div`
    color: #040424;
    box-sizing: border-box;
    padding: 0;
    border: 0;
    vertical-align: baseline;
    margin: 10px 0 20px 0;
`

