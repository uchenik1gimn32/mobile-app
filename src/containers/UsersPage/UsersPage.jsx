import React, {useState, useEffect} from 'react';
import styled from "styled-components";
import {Icon} from "@components/Icon";
import {Button, Combobox, Input} from "~/components";
import {useStores} from "@stores/useStore";
import timezone, {tz} from 'moment-timezone'
import { MassageModal } from "./MassageModal"
import {Redirect} from "react-router-dom";
import axios from "axios";
import {stores} from "@stores/RootStore";
import * as storage from "~/lib/localStorage";
import {Form, LoginButton} from "@containers/AuthPage/AuthPageStyle";

export const UsersPage = () => {
    const {calendarStore, authStore} = useStores();
    const [selected, setSelected] = useState(null);
    const [items, setItems] = useState([]);
    const [openMassageModal, setOpenMassageModal] = useState(false);
    const [massageModal, setMassageModal] = useState({});

    const [massage, setMassage] = useState(false);
    const [listUsers, setListUsers] = useState([]);
    const [massageList, setMassageList] = useState([]);
    const [massageText, setMassageText] = useState('');

    const [id, setId] = useState(null);

    const [sex, setSex] = useState('');
    const [ageStart, setAgeStart] = useState('');
    const [ageEnd, setAgeEnd] = useState('');
    const [city, setCity] = useState('');

    useEffect( () => {
        axios.get('http://api.uzkanova.ru/api/getUsersByParams',  {
            params: {
                sex: sex,
                ageStart: ageStart,
                ageEnd: ageEnd,
                city: city,
            }
        }).then(res => {
            setListUsers(res.data)

        }).catch(res => {
            stores.notificationStore.addNotification({
                title: 'Ошибка сервера',
                description: res.response.data.message,
                icon: "error",
                type: "error",
            });
        })
    }, []);

    const handleClickComboboxItem = async (value) => {
        let type = calendarStore.massageType.filter(i => i.value === value);

        let data = await calendarStore.getMassages(type[0].valuee)
        setItems(data)
        setSelected(value)
    }

    const clickCard = async (id)=> {
        setId(id)
        axios.get('http://api.uzkanova.ru/api/getDialogBetween',  {
            params: {
                id_from: storage.getInfoUser().id,
                id_to: id
            }
        }).then( async res => {
            let arr = [];

            await res.data.map(i => {
                if (i.id_to_user === storage.getInfoUser().id) {
                    arr.push({...i, left: false})
                } else {
                    arr.push({...i, left: true})
                }
            })

            setMassageList(arr)
        }).catch(res => {
            stores.notificationStore.addNotification({
                title: 'Ошибка сервера',
                description: res.response.data.message,
                icon: "error",
                type: "error",
            });
        })
        setMassage(true)
    }

    const getMessages = () => {
        axios.get('http://api.uzkanova.ru/api/getDialogBetween',  {
            params: {
                id_from: storage.getInfoUser().id,
                id_to: id
            }
        }).then( async res => {
            let arr = [];

            await res.data.map(i => {
                if (i.id_to_user === storage.getInfoUser().id) {
                    arr.push({...i, left: false})
                } else {
                    arr.push({...i, left: true})
                }
            })

            setMassageList(arr)
        }).catch(res => {
            stores.notificationStore.addNotification({
                title: 'Ошибка сервера',
                description: res.response.data.message,
                icon: "error",
                type: "error",
            });
        })
    }

    const sendMassage = async ()=> {
        axios.post('http://api.uzkanova.ru/api/newMessage',  {
            id_to_user: id,
            id_from_user: storage.getInfoUser().id,
            text: massageText

        }).then(res => {
            setMassageText('')
            setTimeout(()=> {
                getMessages()
            }, 200)
        }).catch(res => {
            stores.notificationStore.addNotification({
                title: 'Ошибка сервера',
                description: res.response.data.message,
                icon: "error",
                type: "error",
            });
        })
        setMassage(true)
    }

    const searchUsers = () => {
        setListUsers([])
        axios.get('http://api.uzkanova.ru/api/getUsersByParams',  {
            params: {
                sex: document.querySelector('input[name="radio-group"]:checked').value,
                ageStart: ageStart,
                ageEnd: ageEnd,
                city: city
            }
        }).then(res => {
            setListUsers(res.data)

        }).catch(res => {
            stores.notificationStore.addNotification({
                title: 'Ошибка сервера',
                description: res.response.data.message,
                icon: "error",
                type: "error",
            });
        })
    }

    return (
        <>
            {openMassageModal && <MassageModal item={massageModal} onClose={()=>setOpenMassageModal(false)}/>}
            <Notifications>
                {!massage && <>
                    <Input value={ageStart} onChange={(value)=>{
                        setAgeStart(value);
                    }} label="От лет:" placeholder="От лет:"  />
                    <Input value={ageEnd} onChange={(value)=>{
                        setAgeEnd(value);
                    }} label="До лет:" placeholder="До лет:"  />
                    <Input value={city} onChange={(value)=>{
                        setCity(value);
                    }} placeholder="Город:"  />
                    <p>
                        <input  value={'M'} type="radio" id="test1" name="radio-group"/>
                        <Labels htmlFor="test1">Мужчина</Labels>
                    </p>
                    <p>
                        <input value={'F'} type="radio" id="test2" name="radio-group"/>
                        <Labels htmlFor="test2">Женщина</Labels>
                    </p>

                    <p>
                        <input value={''} type="radio" id="test3" name="radio-group"/>
                        <Labels htmlFor="test3">Любой</Labels>
                    </p>
                    <Button onClick={searchUsers} >Найти</Button>
                </>}

                {!massage &&
                <PeopleContainer>
                    {listUsers.length && listUsers.map((item,index)=> {
                        return  <People onClick={()=>clickCard(item.id)}>
                            <img style={{width: '100px', borderRadius: '10px', margin: '0 12px 12px 12px'}} src="https://rvs-chat-app-css-illustration.netlify.app/images/dog-image-3.jpg"
                                 alt=""/>
                            <NamePeople>
                                {item.name} <br/>
                                Возраст: {item.age} <br/>
                                Город: {item.city}
                            </NamePeople>
                        </People>
                    })}

                </PeopleContainer>}

                {massage && <>
                    <SelectContainer>
                        {calendarStore.massageType.length > 0 && <Combobox
                            onChange={handleClickComboboxItem}
                            placeholder="выберите агрегатора из списка"
                            loading={false}
                            icon={'list'}
                            items={calendarStore.massageType}
                            selectItem={Number(selected)}
                        />}
                    </SelectContainer>
                    <Messages>

                        <div className="container">
                            <div className="section1">
                                <div className="mobile">
                                    <div className="mobile-top">
                                        <div  onClick={()=>setMassage(false)} className="mobile-top-left"></div>
                                        <div className="mobile-top-center">
                                            <div className="prof-img"><img
                                                src="https://rvs-chat-app-css-illustration.netlify.app/images/avatar.jpg" alt=""/></div>
                                            <div className="prof-det">
                                                <div className="prof-name">Samuel Green</div>
                                            </div>
                                        </div>
                                        <div className="mobile-top-right"></div>
                                    </div>

                                    <div className="mobile-center">
                                        {massageList.length && massageList.map(messaage => {
                                            if (messaage.left) {
                                                return <div className="chat chat-right">{messaage.text}</div>
                                            } else {
                                                return <div className="chat chat-left">{messaage.text}</div>
                                            }
                                        })}
                                    </div>


                                    <div className="mobile-bottom">
                                        <div className="form">
                                            <Input style={{border: '1px solid'}} type="text" placeholder="Type a message…" value={massageText} onChange={(value)=>{
                                                setMassageText(value);
                                            }}/>
                                            <BtnMassage onClick={sendMassage}/>
                                        </div>
                                    </div>
                                </div>

                            </div>

                        </div>


                    </Messages>
                </>}
            </Notifications>
        </>
    );
};
const Labels = styled.label`
color: black;
  
`
const BtnMassage = styled.div`
    content: url(https://rvs-chat-app-css-illustration.netlify.app/images/chevron-right.svg);
    position: absolute;
    right: 0;
    top: 50%;
    transform: translate(-5px, -50%);
    background: #f1253e;
    width: 30px;
    height: 30px;
    text-align: center;
    line-height: 35px;
    border-radius: 50%;
    padding-left: 3px;
    box-sizing: border-box;
`

const PeopleContainer = styled.div`
    display: flex;
    flex-direction: column;
    overflow: auto !important;
    overflow-x: scroll;
    overflow-y: scroll;
    max-height: 100vh;
    margin-bottom: 30px;
    padding-bottom: 50px;
    height: 50vh;
`

const NamePeople =styled.h4`

`

const People = styled.div`
      display: flex;
    padding: 18px 18px 6px 0;
    background: white;
    border-radius: 10px;
    margin: 12px ;
    background: rgba(0,0,0,0.05);
        box-shadow: 0 0 10px rgba(0,0,0,0.5); /* Параметры тени */

`

const Date = styled.span`
    box-sizing: border-box;
    padding: 0;
    border: 0;
    font: inherit;
    vertical-align: baseline;
    font-family: Exo2-Regular,sans-serif;
    margin: 5px 0;
    max-width: 100%;
    overflow-wrap: break-word;
    display: block;
    width: 100%;
    text-align: center;
    color: #fefefe;
    font-size: 10px!important;
`
const Info = styled.div`
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
    min-height: 65px;
`
const TextHead = styled.span`
    box-sizing: border-box;
    margin: 0;
    padding: 0;
    border: 0;
    font: inherit;
    vertical-align: baseline;
    font-family: Nunito-Regular,sans-serif;
    font-size: 10px;
    color: #fefefe;
`
const Head = styled.div`
    color: #040424;
    box-sizing: border-box;
    margin: 0;
    border: 0;
    vertical-align: baseline;
    display: flex;
    align-items: center;
    justify-content: space-evenly;
    flex-direction: row;
    padding: 5px;
    width: 100%;
`
const TextItem = styled.span`
    font-family: Exo2-Regular,sans-serif;
    font-size: 14px;
    color: #040424;
    margin: 5px 0;
    max-width: 100%;
    word-wrap: break-word;
    overflow-wrap: break-word;
    box-sizing: border-box;
    padding: 0;
    border: 0;
    vertical-align: baseline;
    font-weight: 600;
`
const TextLeft = styled.div`
    color: #040424;
    box-sizing: border-box;
    padding: 0;
    border: 0;
    vertical-align: baseline;
    width: 100%;
    margin: auto;
    display: flex;
    align-items: flex-start;
    justify-content: flex-start;
    flex-direction: column;
`
const Left = styled.div`
    color: #040424;
    box-sizing: border-box;
    margin: 0;
    border: 0;
    vertical-align: baseline;
    display: flex;
    justify-content: center;
    position: relative;
    width: 70%;
    height: 100%;
    padding: 10px;
    align-items: center;
    flex-direction: column;
`
const Right = styled.div`
    color: #040424;
    box-sizing: border-box;
    margin: 0;
    padding: 0;
    border: 0;
    vertical-align: baseline;
    width: 30%;
    min-height: 100%;
    background: #063b87;
`
const Card = styled.div`
    box-sizing: border-box;
    padding: 0;
    border: 0;
    font: inherit;
    vertical-align: baseline;
    font-family: Nunito-Regular,sans-serif;
    font-size: 1em;
    color: #040424;
    align-items: flex-start;
    flex-direction: row;
    width: 450px;
    min-height: 135px;
    max-width: 90%;
    background: #fefefe;
    margin: 10px 0;
    border-radius: 5px;
    box-shadow: 0 0 7px 1px rgba(0,0,0,.2);
    overflow: hidden;
    display: flex;
    justify-content: center;
`

const Messages = styled.div`
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
    overflow-y: auto;
    height: calc(100vh - 40px)!important;
`

const Notifications = styled.div`
`
const SelectContainer = styled.div`
    color: #040424;
    box-sizing: border-box;
    padding: 0;
    border: 0;
    vertical-align: baseline;
    width: 450px;
    max-width: 90%;
    
`
