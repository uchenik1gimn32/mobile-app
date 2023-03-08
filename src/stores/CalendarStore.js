import { observable, action, reaction, computed, makeObservable } from "mobx";
import * as storage from "../lib/localStorage.js";
import {userManager} from "@api/user-manager";
import { getLastUrlBeforeLogin, removeUrlBeforeLogin } from "../lib/localStorage.js";
import { Redirect } from "react-router-dom";
import timezone, {tz} from 'moment-timezone'
import React from "react";

// import { acl } from "@api/acl";

export class CalendarStore {
    allDates;
    disabledDay;
    aggregatorList;
    objectList;
    nextWorkingDay;
    xmlTrueDay;
    checkedDate;
    responseDatetime;
    statusDay;
    dateParams;
    isEventDay;
    equipments;
    selectedDatePref;
    openSelectPref;
    massageType;

    constructor(rootStore, api) {
        this.rootStore = rootStore;
        this.api = api;
        this.selectedDatePref = null;
        this.openSelectPref = true;
        this.allDates = {};
        this.dateParams = null;
        this.disabledDay = [];
        this.isEventDay = false;
        this.aggregatorList = [];
        this.dates = [];
        this.highlighted = {};
        this.massageType = [];
        this.equipments = {};
        this.checkedDate = null;
        this.responseDatetime = '';
        this.objectList = [];
        this.nextWorkingDay = new Date();
        this.statusDay = 'нет событий';
        this.modifiers = {
            xmlGreenTrueDay: [], //зеленый фон галочка
            xmlWaxDay: [], //Прозрачный фон, знак “!”
            xmlGreenWax: [], //зелёный фон, знак “!”
            xmlQuestionDaYOnly: [], //прозрачный фон, знак “?”
            xmlGreenDay: [] //зеленый фон
        }
        this.aggregatorListLoad = false;
    }

    setDateParams(dates) {
        let date = this.findDate(this.dates.events, dates)
        this.isEventDay = !!date
        !date ? date = this.findDate(this.dates.dates, dates) : false
        this.dateParams = date
    }


    async getChartData(item, date) {
        try {
            let mm = date.getMonth() + 1; // месяц 1-12
            if (mm < 10) mm = '0' + mm;
            let dd = date.getDate();
            if (dd < 10) dd = '0' + dd;

            const objects = await userManager.authController.getChartData({
                "consumerInn": item.consumer.uid,
                "date": `${date.getFullYear()}-${mm}-${dd}`,
                "isDaily": false,
                "type": "equipment",
                "uid": item.uid
            })

            let data = objects.data;
            data.nameEpy = item.name;
            data.isDaily = false;

            return data
        } catch {

        }
    }

    async getMassages(type) {
        try {
            const objects = await userManager.authController.getMassage({
                "filters": [],
                "page": 0,
                "pageSize": 250,
                "type": type
            })

            return objects.data.items

        } catch {

        }
    }

    async getMassagesType() {
        try {
            this.massageType = [];
            const objects = await userManager.authController.getMassageType()
           objects.data.map(i => {
               this.massageType.push({
                    'valuee': i.code,
                    'value': i.codeInteger,
                    'label': i.name
                })
            })

            console.log(this.massageType)
        } catch {

        }
    }

    async getChartDataIsDeyly(item, date) {
        try {
            let mm = date.getMonth() + 1; // месяц 1-12
            if (mm < 10) mm = '0' + mm;
            let dd = date.getDate();
            if (dd < 10) dd = '0' + dd;

            const objects = await userManager.authController.getChartData({
                "consumerInn": item.consumer.uid,
                "date": `${date.getFullYear()}-${mm}-${dd}`,
                "isDaily": true,
                "type": "equipment",
                "uid": item.uid
            })

            let data = objects.data;
            data.nameEpy = item.name;
            data.isDaily = true;

            return data
        } catch {

        }
    }


    async getEpyObject(item, date) {
        try {
            let mm = date.getMonth() + 1; // месяц 1-12
            if (mm < 10) mm = '0' + mm;
            let dd = date.getDate();
            if (dd < 10) dd = '0' + dd;

            const objects = await userManager.authController.getListEpyObject({
                controlObjectId: item.uid,
                date: `${date.getFullYear()}-${mm}-${dd}`,
                page: 0,
                pageSize: 180
            })

            this.equipments = {...objects.data, item: item};

            return {...objects.data, item: item}
        } catch {

        }
    }

    async getObject(date, id) {
        try {
            this.objectList = [];

            let mm = date.getMonth() + 1; // месяц 1-12
            if (mm < 10) mm = '0' + mm;
            let dd = date.getDate();
            if (dd < 10) dd = '0' + dd;

            const objects = await userManager.authController.getListObject({
                aggregatorInn: id,
                date: `${date.getFullYear()}-${mm}-${dd}`,
                page: 0,
                pageSize: 100,
            })
            this.setDateParams(date)
            this.objectList = objects.data;
            this.statusDay = this.eventStatus(new Date(date))
            return objects.data;
        } catch {

        }
    }

    eventStatus(dateInit) {
        const event = this.findDate(this.dates.events, dateInit)
        if (event) return event.statusName
        else {
            const date = this.findDate(this.dates.dates, dateInit)
            if (date && !date.isXmlEvent) return 'нет данных'
            if (date && date.isRejected) return date.statusName
        }
        return 'нет данных'
    }

    async getAggregators(date) {
        try {
            let mm = date.getMonth() + 1; // месяц 1-12
            if (mm < 10) mm = '0' + mm;
            let dd = date.getDate();
            if (dd < 10) dd = '0' + dd;

            const aggregatorLists = await userManager.authController.getListAggregators({
                "date": `${date.getFullYear()}-${mm}-${dd}`
            });

            this.statusDay = this.eventStatus(new Date(date))

            if (aggregatorLists.data.totalElements === 0) {
                return []
            }

            this.aggregatorList = await aggregatorLists.data.aggregators.map(i => {
                return {
                    value: i.uid,
                    label: i.shortName
                }
            })

           return aggregatorLists.data.aggregators.map(i => {
               return {
                   value: i.uid,
                   label: i.name
               }
           })

        } catch {

        } finally {
            this.aggregatorListLoad = true;
        }
    }

    openCalendar(date) {
        this.selectedDatePref = new Date(date);
        window.location = `/events?date=${date}`
    }

    timezoneDate(dateTime) {
        const timezones = timezone.tz(dateTime, 'Europe/Moscow')
        const [year, month, day] = timezone(timezones.format())._a
        return new Date(year, month, day).getTime()
    }

    setHolidays() {
        this.dates.holidays.forEach(it => {
            this.highlighted.dates.push(new Date(it))
        })
    }

    setEvents() {
        this.dates.events.forEach(it => {
            this.disabledDates.dates.push(new Date(it.eventDate))
        })
    }

    findDate(datesArray, date = null) {
        return datesArray.find(it => {
            if (!date && it.eventDate) {
                return it.eventDate === this.formatDate(this.checkedDate)
            }
            if (date && !it.eventDate) {
                return this.formatDate(it) === this.formatDate(date)
            }
            return it.eventDate === this.formatDate(date)
        })
    }

    formatDate(date) {
        return timezone(date).format('YYYY-MM-DD')
    }

    detectDateStatus(dateParams) {
        const date = new Date(dateParams)
        const day = date.getDate()
        const isPast = dateParams < new Date().getTime()
        const holiday = this.findDate(this.dates.holidays, this.formatDate(date))
        const canceledDay = !holiday ? this.findDate(this.dates.dates, this.formatDate(date)) : null
        const eventDay = !holiday && !canceledDay ? this.findDate(this.dates.events, this.formatDate(date)) : null
        return { date, day, isPast, holiday, canceledDay, eventDay }
    }

    oneDay() {
        return 24 * 60 * 60 * 1000
    }

    findNextWorkingDay(date) {
        let tomorrow = this.timezoneDate(date) + this.oneDay()
        let notWorkingDay = this.dates.holidays.find(it => {
            return this.formatDate(new Date(tomorrow)) === this.formatDate(it)
        })
        if (notWorkingDay) {
            return this.findNextWorkingDay(tomorrow)
        }
        this.nextWorkingDay = new Date(tomorrow)
        this.checkedDate = this.nextWorkingDay
    }

    async getAllDates(date, type = false, newDate = false) {
        try {
            const dates = await userManager.authController.getAllDates();
            this.responseDatetime = dates.headers.date
            this.dates = dates.data;
            this.statusDay = this.eventStatus();

            if (newDate) {
                await this.findNextWorkingDay(timezone.tz(new Date(), "Europe/Moscow"))
            } else {
                await this.findNextWorkingDay(timezone.tz(date, "Europe/Moscow"))
            }



            let holidays = []; // выходные дни
            let xmlGreenTrueDay = []; //есть информация о готовности, есть информация о событии, событие есть, есть информация о разгрузке;
            let xmlWaxDay = []; //(только для следующего рабочего дня) - информация по готовности получена не по всем объектам и ЭПУ или отсутствует полностью, есть информация о событии, события нет, или нет информации о событии;
            let xmlGreenWax = []; //(только для следующего рабочего дня) – информация по готовности получена не по всем объектам и ЭПУ или отсутствует полностью, есть информация о событии, событие есть;
            let xmlQuestionDaYOnly = []; //прозрачный фон, знак “?” (только для следующего рабочего дня) есть информация о готовности, нет информации о событии;
            let xmlGreenDay = []; //зелёный фон – есть информация о готовности, есть информация о событии, событие есть;

            //Выходные дни
            dates.data.holidays.forEach(i => {holidays.push(new Date(i))});
            this.disabledDay = holidays;

            //перебираем дни с евентами и в зависимости от флага добавляем в нужный массив
            dates.data.events.forEach(i => {
                const { day, canceledDay, eventDay, date } = this.detectDateStatus(i.eventDate)
                const { isXmlAvailability, isXmlEvent } = canceledDay ? canceledDay : eventDay ? eventDay : false
                const nextWorkingDate = timezone(date.getTime()).format('DD.MM.YYYY') === timezone(this.nextWorkingDay?.getTime()).format('DD.MM.YYYY')

                if (!isXmlAvailability && nextWorkingDate) {
                    xmlGreenWax.push(new Date(this.nextWorkingDay?.getTime()))
                    return
                }


                if (i.isXmlEvent && !i.isFinished) {
                    xmlGreenDay.push(new Date(i.eventDate))
                    return
                }

                if (i.isXmlEvent && i.isFinished) {
                    xmlGreenTrueDay.push(new Date(i.eventDate))
                    return
                }
            });

            dates.data.dates.forEach(i => {
                const { day, canceledDay, eventDay, date } = this.detectDateStatus(i.eventDate)
                const { isXmlAvailability, isXmlEvent } = canceledDay ? canceledDay : eventDay ? eventDay : false
                const nextWorkingDate = timezone(date.getTime()).format('DD.MM.YYYY') === timezone(this.nextWorkingDay?.getTime()).format('DD.MM.YYYY')

                if (!isXmlAvailability && nextWorkingDate) {
                    xmlWaxDay.push(new Date(i.eventDate))
                    return
                }

                if (isXmlAvailability && nextWorkingDate) {
                    xmlQuestionDaYOnly.push(new Date(i.eventDate))
                    return
                }
            });

            this.modifiers.xmlGreenTrueDay = xmlGreenTrueDay;
            this.modifiers.xmlWaxDay = xmlWaxDay;
            this.modifiers.xmlGreenWax = xmlGreenWax;
            this.modifiers.xmlQuestionDaYOnly = xmlQuestionDaYOnly;
            this.modifiers.xmlGreenDay = xmlGreenDay;


            if (storage.getInfoUser().roleCode === "CONSUMER") return

            if (!type) {
                this.getAggregators(date)
            } else {
                let dateM = new Date();
                dateM.setDate(dateM.getDate() + 1)
                this.getAggregators(dateM)

            }

        } catch {

        }
    }

    confirmed() {
        return this.objectList.objects.filter(it => it.eventResult).length
    }

    readyForAction() {
        if (this.objectList.objects === null) {
            return 0;
        }
        return this.objectList.objects.filter(it => it.ready).length
    }
}

let dataChartPo = {
    "labels": [
        "09:00",
        "10:00",
        "11:00",
        "12:00"
    ],
    "datasets": [
        {
            "label": "Фактическая нагрузка",
            "data": [
                1350,
                1488,
                1496,
                1438
            ],
            "isChart": true
        },
        {
            "label": "ГБН",
            "data": [
                null,
                null,
                null,
                null
            ],
            "isChart": true
        },
        {
            "label": "ГБН с подстройкой",
            "data": [
                null,
                null,
                null,
                null
            ],
            "isChart": true
        },
        {
            "label": "ЗГН",
            "data": [
                1400,
                1400,
                1400,
                1400
            ],
            "isChart": true
        },
        {
            "label": "МБН",
            "data": [
                null,
                null,
                null,
                null
            ],
            "isChart": true
        },
        {
            "label": "УМН",
            "data": [
                null,
                null,
                null,
                null
            ],
            "isChart": true
        },
        {
            "label": "МУБН",
            "data": [
                null,
                null,
                null,
                null
            ],
            "isChart": true
        },
        {
            "label": "Обьем разгрузки",
            "data": [
                50,
                -88,
                -96,
                -38
            ],
            "isChart": false
        }
    ]
};