import React, {useState, useEffect} from 'react';
import styled,{css} from "styled-components";
import {Title, Input, Button, Combobox} from "~/components";
import {useStores} from "@stores/useStore";
import DayPicker from 'react-day-picker';
import { InfoModal } from "./InfoModal"
import { useLocation } from "react-router-dom";
import * as storage from "../../lib/localStorage.js";
import {ResultItems} from './ResultItem.jsx'
import {ChartModal} from "@containers/EventsPage/ChartModal";
import {Icon} from "@components/Icon";

export const EventsPage = () => {
    const MONTHS = ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'];
    const WEEKDAYS_SHORT = ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'];
    const WEEKDAYS_LONG = ['Воскресенье', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота'];
    const MOUNTS_SHORT =  ['Янв', 'Февр', 'Март', 'Апр', 'Май', 'Июнь', 'Июль', 'Авг', 'Сент', 'Окт', 'Нояб', 'Дек'];
    let { search } = useLocation();

    const {authStore, calendarStore} = useStores();

    const [calcOpen, setCalcOpen] = useState(false);
    const [showAggregators, setShowAggregators] = useState(false);
    const [isEventDay, setIsEventDay] = useState(false);
    const [selectedDay, setSelectedDay] = useState(null);
    const [selectedAggregator, setSelectedAggregator] = useState(null);
    const [listAggregators, setListAggregators] = useState([]);
    const [listObjects, setListObjects] = useState([]);

    const [nameAggregatorSelect, setNameAggregatorSelect] = useState('');

    const [listAggregatorShow, setListAggregatorShow] = useState(false);

    const [showInfoModal, setShowInfoModal] = useState(false);
    const [infoModal, setInfoModal] = useState({});

    const [infoChart, setInfoChart] = useState({});

    const [openChart, setOpenChart] = useState(false);


    const [selectedDayText, setSelectedDayText] = useState('');

    useEffect(async () => {
        const query = new URLSearchParams(search);
        const paramField = query.get('date');


        if (calendarStore.openSelectPref && !!paramField) {
            await calendarStore.getAllDates(new Date(paramField), true, true)
            await handleDayClick(new Date(paramField), {selected: true})
            setSelectedDay(new Date(paramField))
            calendarStore.openSelectPref = false;
        } else {
            await calendarStore.getAllDates(new Date(), true)
            await handleDayClick(calendarStore.nextWorkingDay, {selected: true})
            setSelectedDay(calendarStore.nextWorkingDay)
            calendarStore.openSelectPref = false;
        }
    }, [])


    const setTextDate = (date) => {
        let day = date.getDate() || new Date().getDay();
        let mount = date.getMonth() || new Date().getMonth();
        let year = date.getFullYear() || new Date().getFullYear();
        setSelectedDayText(`${day} ${MOUNTS_SHORT[mount]} ${year}`)
    }

    const handleDayClick = async (day, { selected }) => {
        setSelectedAggregator(null)
        setListObjects([])

        calendarStore.aggregatorList = [];
        setCalcOpen(false)
        setListAggregatorShow(false)
        setListObjects([])
        setSelectedDay(selected ? null : day)
        setTextDate(day)
        setListAggregators([])

        if (storage.getInfoUser().roleCode === "CONSUMER" || storage.getInfoUser().roleCode === "AGGREGATOR") {
            setNameAggregatorSelect(storage.getInfoUser().orgName)
            setListAggregatorShow(false)
            setListObjects([])
            const list = await calendarStore.getObject(day, storage.getInfoUser().inn)
            setSelectedAggregator(storage.getInfoUser().inn)
            setListObjects(list.objects.sort((a, b) => a.name - b.name) || [])

        } else {
            const list = await calendarStore.getAggregators(day);

            let number
            if (list?.length > 0) {
                number = list[0].value
            }

            setListAggregators(list || [])

            if (list?.length === 1) {
                // setNameAggregatorSelect(calendarStore.aggregatorList[0].label)
                // setListAggregatorShow(true)
                // setListObjects([])
                // const list = await calendarStore.getObject(day, number)
                // setSelectedAggregator(number)
                // setListObjects(list.objects || [])
            }
        }
    }

    const handleDayClickOut = () => {
        if (calcOpen) setCalcOpen(false)
    }


    const handleClickComboboxItem = async (value) => {
        let nameAggregator = calendarStore.aggregatorList.filter(i => Number(i.value) === Number(value))
        setNameAggregatorSelect(nameAggregator[0].label)
        setListObjects([])
        const list = await calendarStore.getObject(selectedDay, value)
        setSelectedAggregator(value)
        setListObjects(list.objects.sort((a, b) => a.name - b.name) )
    };

    const openListEpy = async (item) => {
        const data = await calendarStore.getEpyObject(item, selectedDay)
        setInfoModal(data)
        setShowInfoModal(true)
    };

    const openCharts = async (item) => {
        const data = await calendarStore.getChartData(item, selectedDay)
        setInfoChart(data)
        setOpenChart(true)
    };

    const openChartsIsDayli = async (item) => {
        const data = await calendarStore.getChartDataIsDeyly(item, selectedDay)
        setInfoChart(data)
        setOpenChart(true)
    };

    return (
        <>
            {openChart && <ChartModal item={infoChart}
                                      nameOy={infoModal.item.name}
                                      onClose={()=>setOpenChart(false)}/>}

            {showInfoModal && <InfoModal item={infoModal}
                                         onClose={()=>setShowInfoModal(false)}
                                         nameAggregator={nameAggregatorSelect}
                                         openChart={(i)=>openCharts(i)}
                                         openChartIsDayli={(i)=>openChartsIsDayli(i)}/>}
           <Aggregetors>
               <CabTop>
                    <DateWrap>
                        <InputDataWrap onClick={()=>setCalcOpen(!calcOpen)}>
                            <InputData>
                                <DateAttr>
                                    <Icon name={'fiber_manual_record'} width={24} height={24} style={calendarStore.statusDay === 'событие есть' ?  {fill: '#23a051'} : {fill: '#fa3159'}}/>
                                    <Text>{calendarStore.statusDay}</Text>
                                </DateAttr>
                                <SelectData>
                                    {selectedDayText}
                                </SelectData>
                            </InputData>
                        </InputDataWrap>
                        {calcOpen && <DayPicker
                                onDayClick={handleDayClick}
                                selectedDays={selectedDay}
                                months={MONTHS}
                                weekdaysLong={WEEKDAYS_LONG}
                                weekdaysShort={WEEKDAYS_SHORT}
                                firstDayOfWeek={1}
                                disabledDays={calendarStore.disabledDay}
                                modifiers={calendarStore.modifiers}
                            />
                        }
                    </DateWrap>

                   {!listAggregatorShow && listAggregators?.length !== 0 && <Combobox
                           onChange={handleClickComboboxItem}
                           placeholder="выберите агрегатора из списка"
                           loading={false}
                           icon={'dns'}
                           items={calendarStore.aggregatorList}
                           selectItem={Number(selectedAggregator)}
                       />}

                   {selectedAggregator && listObjects?.length !== 0 &&
                   <InfoSelect>
                       {listObjects?.length !== 0 && <Indicator>
                           <Icon name={'fiber_manual_record'} width={24} height={24} style={{fill: '#23a051'}}/>
                           <IndicatorText>
                               Всего ОУ {listObjects?.length || 0}
                           </IndicatorText>
                       </Indicator>}

                       {calendarStore.readyForAction && !!calendarStore.objectList.totalReady &&
                       <Indicator>
                           <Icon name={'fiber_manual_record'} width={24} height={24} style={calendarStore.readyForAction() ?  {fill: '#23a051'} : {fill: '#fa3159'}}/>
                           <IndicatorText>
                               В т.ч. готовых к разгрузке {calendarStore.objectList.totalReady}
                           </IndicatorText>
                       </Indicator>}
                       { calendarStore.isEventDay && calendarStore.dateParams.isFinished &&
                       <Indicator>
                           <Icon name={'fiber_manual_record'} width={24} height={24} style={calendarStore.objectList.totalSuccessResult ?  {fill: '#23a051'} : {fill: '#fa3159'}}/>
                           <IndicatorText>
                               В т.ч. успешно разгрузившихся {calendarStore.objectList.totalSuccessResult}
                           </IndicatorText>
                       </Indicator>}
                       {calendarStore.isEventDay && calendarStore.dateParams.isFinished &&
                       <Indicator>
                           <Icon name={'fiber_manual_record'} width={24} height={24} style={+calendarStore.objectList.totalReductionVolume ?  {fill: '#23a051'} : {fill: '#fa3159'}}/>
                           <IndicatorText>
                               Объем разгрузки (МВт): {calendarStore.objectList.totalReductionVolume}
                           </IndicatorText>
                       </Indicator>}
                   </InfoSelect>}
               </CabTop>

                {listObjects?.length !== 0 && listObjects !== null &&
                <CabBottom>
                   <Results>
                       {listObjects.map(i => {
                           return <ResultItems item={i} onOpen={(i)=>openListEpy(i)}/>
                       })}
                   </Results>
               </CabBottom>}


               {listObjects?.length && listObjects !== null || listAggregators?.length === 0 && <Empty>
                   <Icon name={'cloud_off'} width={'25vw'} height={'25vw'} style={{fill: '#063b87'}}/>
                   <EmptyMassage>
                       Информация о статусе готовности отсутствует
                   </EmptyMassage>
               </Empty>}

           </Aggregetors>
        </>
    );
};

const Results = styled.div`
    color: #040424;
    box-sizing: border-box;
    border: 0;
    vertical-align: baseline;
    width: 100%;
    height: auto;
    background: #fefefe;
    margin: auto;
    padding: 0 0 32px;
    position: relative;
`

const CabBottom = styled.div`
    color: #040424;
    box-sizing: border-box;
    margin: 0;
    border: 0;
    vertical-align: baseline;
    width: 450px;
    max-width: 90%;
    height: 100%;
    overflow-y: auto;
    padding: 10px;
    border-top-right-radius: 15px;
    border-top-left-radius: 15px;
    background: #fefefe;
`

const IndicatorText = styled.span`
    color: #063b87!important;
    box-sizing: border-box;
    margin: 0;
    border: 0;
    font: inherit;
    vertical-align: baseline;
    font-family: Exo2-Regular,sans-serif;
    font-size: 14px;
    padding: 3px;
`

const Indicator = styled.div`
    color: #063b87;
    box-sizing: border-box;
    margin: 0;
    border: 0;
    vertical-align: baseline;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    flex-direction: row;
    width: 100%;
    padding: 5px;
`
const InfoSelect = styled.div`
    box-sizing: border-box;
    border: 0;
    vertical-align: baseline;
    color: #063b87;
    justify-content: center;
    flex-direction: column;
    width: 90%;
    min-height: 90px;
    padding: 10px;
    margin: 20px auto;
    border-radius: 10px;
    box-shadow: 0 6px 7px -4px rgba(0,0,0,.2),0 11px 15px 1px rgba(0,0,0,.14),0 4px 20px 3px rgba(0,0,0,.12);
    display: flex;
    -webkit-box-align: center;
    align-items: center;
    -webkit-box-direction: normal;
`

const EmptyMassage = styled.span`
    box-sizing: border-box;
    margin: 0;
    padding: 0;
    border: 0;
    font: inherit;
    vertical-align: baseline;
    font-family: Nunito-Regular,sans-serif;
    font-size: 12px;
    color: #063b87;
`

const Empty = styled.div`
    color: #040424;
    box-sizing: border-box;
    margin: 0;
    padding: 0;
    border: 0;
    vertical-align: baseline;
    display: flex;
    align-items: center;
    width: 100%;
    justify-content: center;
    flex-direction: column;
    height: 50vh;
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
`

const SelectData = styled.div`
    outline: none;
    border: none;
    margin: 0;
    line-height: normal;
    box-sizing: border-box;
    font-family: Exo2-Regular,sans-serif;
    font-size: 1em;
    color: #063b87;
    width: 100%;
    height: 100%;
    padding: 10px;
    text-align: right;
    background: rgba(0,0,0,0)!important;
`

const Text = styled.div`
    text-align: center;
    box-sizing: border-box;
    margin: 0 0 0 6px;
    padding: 0;
    border: 0;
    font-size: 100%;
    font: inherit;
    vertical-align: baseline;
    color: #063b87;
`

const DateAttr = styled.div`
    color: #040424;
    box-sizing: border-box;
    border: 0;
    font: inherit;
    vertical-align: baseline;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: row;
    font-family: Nunito-Regular,sans-serif;
    font-size: 12px;
    position: absolute;
    left: 0;
    top: 50%;
    transform: translateY(-50%);
    z-index: 1;
    font-weight: 700;
    padding: 5px 0 4px 0;
    width: 150px;
    max-width: 50%;
    text-align: center;
    margin: auto;
`

const InputData = styled.div`
    color: #040424;
    text-align: left;
    margin: 0;
    padding: 0;
    vertical-align: baseline;
    box-sizing: border-box;
    border: 4px solid #063b87;
    border-radius: 10px;
    overflow: hidden;
    height: 45px;
`

const InputDataWrap = styled.div`
    color: #040424;
    box-sizing: border-box;
    margin: 0;
    padding: 0;
    border: 0;
    vertical-align: baseline;
    width: 400px;
    max-width: 100%;
    top: 0;
    left: 0;
    z-index: 5;
    position: relative;
    text-align: left;
`

// const DatePickerStyled = styled(ReactDatepicker)`
//   width: 75px;
//   border-radius: 5px;
//   border: 0px solid #e3e6e8;
//   background: #208cff;
//   /*transform: scale(1.2);*/
//
// `;

const DateWrap = styled.div`
    color: #040424;
    box-sizing: border-box;
    padding: 0;
    border: 0;
    vertical-align: baseline;
    position: relative;
    width: 400px;
    max-width: 100%;
    height: 44px;
    margin: 10px auto;
`

const CabTop = styled.div`
    color: #040424;
    box-sizing: border-box;
    margin: 0;
    padding: 0;
    border: 0;
    vertical-align: baseline;
    width: 90%;
`

const Aggregetors = styled.div`
    color: #040424;
    box-sizing: border-box;
    margin: 0;
    padding: 0;
    border: 0;
    vertical-align: baseline;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    flex-direction: column;
    height: 100%;
    width: 100%;
    overflow: hidden;
`