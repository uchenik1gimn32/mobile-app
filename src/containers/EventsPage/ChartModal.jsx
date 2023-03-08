import styled from "styled-components";

import {observer} from "mobx-react";
import React, {useEffect, useState} from "react";
import {Title, Input, InputCustom, Button, Modal} from "~/components";
import {Form, LoginButton} from "@containers/AuthPage/AuthPageStyle";
import {useStores} from "@stores/useStore";
import * as storage from "~/lib/localStorage";
import { Line } from 'react-chartjs-2';
import {Icon} from "@components/Icon";



export const ChartModal = observer(({onClose, item, nameOy}) => {
    let color = ['#063B87', '#fa3159', '#23a051', '#f56f42', '#a23ff2', '#53b551'];

    const [graph, setGraph] = useState({})
    const [header, setHeader] = useState([])
    const [data, setData] = useState([])


    useEffect( () => {
        let forRender;
        let headers;
        forRender = { ...item }
        forRender.labels = forRender.labels.reduce((acc, it, i, arr) => {
            acc.push(it)

            //fake time label
            //if (i === arr.length - 1) acc.push('')
            return acc
        }, [])

        forRender.datasetsTable = forRender.datasets.reduce((acc, it) => {
            it.data.indexOf(null) < 0 && it.isChart ? acc.push(it) : false
            //it.data.push(it.data[it.data.length - 1])
            return acc
        }, [])

        forRender.datasets = forRender.datasets.reduce((acc, it) => {
            it.data.indexOf(null) < 0 && it.isChart ? acc.push(it) : false
            it.data.push(it.data[it.data.length - 1])
            return acc
        }, [])


        headers = forRender.labels.map((it, i) => {
            if (i === 0) return { label: it }
            return { label: it }
        })

        forRender.datasets.map((it, i) => {
            it.borderColor = color[i]
            it.pointRadius = 0
            it.steppedLine = 'before'
        })

        forRender.datasets = forRender.datasets.filter(it => it.label !== "Обьем разгрузки")

        setHeader(headers)
        setData(forRender.datasetsTable.filter(it => it.data.indexOf(null) < 0))

        forRender.labels.push('')

        setGraph({
            type: 'line',
            data: {
                labels: forRender.labels,
                datasets: forRender.datasets
            },
            options: {
                elements: {
                    point: {
                        pointStyle: 'line',
                        radius: 0
                    }
                },

                title: {
                    display: false,
                    text: '',
                    fontSize: 20
                },
                scales: {
                    xAxes: [{
                        display: true,
                    }],
                    yAxes: [{
                        type: "linear",
                        display: true,
                        position: "left",
                    }]
                },
                responsive: true
            }
        })
    }, [])


    return (
        <ChartModalContainer>
            <CloseChart onClick={onClose}>
                <Icon onClick={onClose} name={'close'} width={19} height={19} style={{fill: 'rgb(255, 255, 255)'}}/>
            </CloseChart>

            <ChartHead>
                <ChartHeadInner>
                    <HeaderText>{!item.isDaily ? 'График снижения потребления' : 'Суточный график потребления'}</HeaderText>
                    <HeaderText>ОУ: {nameOy}</HeaderText>
                    <HeaderText>ЭПУ: {item.nameEpy}</HeaderText>
                    <HeaderText>Все показатели указаны в КВт</HeaderText>
                </ChartHeadInner>
            </ChartHead>
            <ChartWrap>
                {Object.keys(graph).length >= 1 && <Line height={!item.isDaily ? 300 : 380} responsive={true} style={{maxHeight: '400px'}} {...graph}></Line>}
            </ChartWrap>


            {header.length !== 0 && data.length !== 0 && !item.isDaily && <ChartInfo>
                <ChartHeader>
                    <HeadText>показатель</HeadText>
                    {header.map(i=> {
                        return <HeadText key={i.label} style={{width: (100 / header.length )  + '%'}}>{i.label}</HeadText>
                    })}
                </ChartHeader>
                <ChartTable>
                    {data.map((it, i) => {
                        return <TableItem style={{backgroundColor: it.isChart ? color[i] : '#00acff'}}>
                            <TableLable>{ it.label }</TableLable>
                            {/*i !== it.data.length - 1 &&*/}
                            {it.data.map((v, i) => {
                                if (i === it.data.length - 1) return
                                return <Value style={{width: (100 / (it.data.length-1))  + '%'}} key={v + i}>{v}</Value>
                            })}
                        </TableItem>
                    }) }
                </ChartTable>
            </ChartInfo>}
        </ChartModalContainer>
    );
});
const Value = styled.span`
    color: #fefefe;
    box-sizing: border-box;
    margin: 0;
    padding: 0;
    border: 0;
    vertical-align: baseline;
    text-align: center;
`
const TableLable = styled.span`
    color: #fefefe;
    box-sizing: border-box;
    margin: 0;
    padding: 0;
    border: 0;
    vertical-align: baseline;
    width: 50%;
`

const TableItem = styled.div`
    box-sizing: border-box;
    margin: 0;
    border: 0;
    font: inherit;
    vertical-align: baseline;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    flex-direction: row;
    font-family: Exo2-Regular,sans-serif;
    font-size: 12px;
    color: #fefefe;
    padding: 10px 4px;
    background-color: rgb(6, 59, 135);
`

const ChartTable = styled.div`
    color: #040424;
    box-sizing: border-box;
    margin: 0;
    padding: 0;
    border: 0;
    vertical-align: baseline;
`
const HeadText = styled.div`
    box-sizing: border-box;
    width: 50%;
    margin: 0;
    padding: 0;
    font: inherit;
    vertical-align: baseline;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: row;
    font-family: Exo2-Regular,sans-serif;
    font-size: 12px;
    color: #063b87;
    height: 30px;
    border: 1px solid #063b87;
    border-right: none;
    border-bottom: none;
`
const ChartHeader = styled.div`
    color: #040424;
    box-sizing: border-box;
    margin: 0;
    padding: 0;
    border: 0;
    vertical-align: baseline;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: row;
    width: 100%;
`

const ChartInfo = styled.div`
    color: #040424;
    box-sizing: border-box;
    padding: 0;
    border: 0;
    vertical-align: baseline;
    width: 440px;
    max-width: 90%;
    margin: 20px auto;
`

const ChartWrap = styled.div`
    color: #040424;
    box-sizing: border-box;
    padding: 0;
    border: 0;
    vertical-align: baseline;
    width: 100%;
    margin-top: 20px;
`

const HeaderText = styled.span`
    box-sizing: border-box;
    padding: 0;
    border: 0;  
    vertical-align: baseline;
    display: block;
    margin: 3px 0;
    width: 100%;
    color: #063b87;
    text-align: center;
    &:first-child {
        width: 100%;
        color: #fefefe;
        text-align: center;
        text-transform: uppercase;
        background: #063b87;
        padding: 5px;
    }
    &:nth-last-child(-n+1) {
        width: 100%;
        color: #063b87;
        text-align: center;
        font-size: 12px;
    }
`

const ChartHeadInner = styled.div`
    color: #040424;
    box-sizing: border-box;
    margin: 0;
    padding: 0;
    border: 0;
    font-size: 100%;
    font: inherit;
    vertical-align: baseline;
    display: flex;
    align-items: flex-start;
    justify-content: center;
    flex-direction: column;
`

const ChartHead = styled.div`
    color: #040424;
    box-sizing: border-box;
    margin: 0;
    padding: 0;
    border: 0;
    vertical-align: baseline;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: row;
    width: 100%;
`

const CloseChart = styled.div`
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
    flex-direction: row;
    position: fixed;
    width: 40px;
    height: 40px;
    background: #063b87;
`

const ChartModalContainer = styled.div`
    z-index: 1000;
    position: absolute;
    width: 100%;
    height: 100%;
    background: white;
`


