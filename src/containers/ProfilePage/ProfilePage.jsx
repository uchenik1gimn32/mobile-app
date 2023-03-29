import React, {useState, useEffect} from 'react';
import styled from "styled-components";
import { NavLink, useHistory } from "react-router-dom";
import {Title, Input, Button} from "~/components";
import {useStores} from "@stores/useStore";
import { ModalChangePassword } from "./ModalChangePassword"
import * as storage from "../../lib/localStorage.js";
import {Icon} from "@components/Icon";
import axios from "axios";
import {stores} from "@stores/RootStore";

export const ProfilePage = () => {
    const {authStore} = useStores();
    const [openChangePass, setOpenChangePass] = useState(false);

    const header = {
        'Host': 'api.uzkanova.ru',
        'Authorization': `Bearer ${storage.getToken()}`,
        'Accept': 'application/json',
    };

    const history = useHistory();

    const checkUsers = () => {

    }

    const loadImage = (e) => {
        const el = document.getElementById("input__file");
        const reader = new FileReader();
        const file = el.files[0];

        reader.onload = handleReaderLoad;
        reader.readAsDataURL(file);
        let urlauth = `https://api.uzkanova.ru/api/storeImage`




        function handleReaderLoad(e) {

            var filePayload = e.target.result;

            var img = document.getElementById("previewImage");
            img.src = filePayload;

            var formData = new FormData();
            formData.append('id', storage.getInfoUser().id);
            formData.append('image', el.files[0]);
            formData.append('is_avatar', 1);

            axios.post(urlauth,  formData,{headers: header}).then(res => {
                if (res.data.status === 'error') {
                    stores.notificationStore.addNotification({
                        title: 'Заполните все поля',
                        description: res.response.text,
                        icon: "error",
                        type: "error",
                    });
                    return
                }

            }).catch(res => {

            })
        }





    }

    const logout = () => {
        authStore.logout()
    }

    const changePasswordOpen = () => {
        setOpenChangePass(true)
    }

    const getUserInfos = () => {
        return storage.getInfoUser()
    }

    return (
        <>
            {openChangePass && <ModalChangePassword onClose={()=>setOpenChangePass(false)} />}
           <ProfileP>
               <Profile>
                   <SearchContainer>
                       <Icon name={'search'} width={20} height={20} style={{fill: 'white'}}/>
                       <input onChange={e => loadImage(e)} type="file" name="file" id="input__file" style={{display: 'none'}} className="input input__file"
                              multiple/>
                       <Plusik  for="input__file"/>
                   </SearchContainer>

                   <ProfileHead>
                       <HeadName src={storage.getInfoUser().images[0].image_path} alt="1"/>
                       <HeadAbout>{storage.getInfoUser().name}</HeadAbout>
                   </ProfileHead>
                   <BoxImg>
                       <OneImg src="https://uprostim.com/wp-content/uploads/2021/03/image204-7.jpg" alt="1"/>
                       <OneImg src="https://c.wallhere.com/photos/99/0b/women_blue_eyes_hat_Angelina_Petrova-138393.jpg!d" alt="1"/>

                       <OneImg src="https://www.perunica.ru/uploads/posts/2019-09/thumbs/1567597238_010.jpg" alt="1"/>
                       <OneImg src="https://yobte.ru/uploads/posts/2019-11/miniatjurnye-brjunetki-81-foto-30.jpg" alt="1"/>
                       <OneImg src="https://img4.goodfon.ru/original/2048x1365/e/73/kassio-epia-model-krasotka-shatenka-poza-vzgliad-litso-ruka.jpg" alt="1"/>
                       <img src={`https://api.uzkanova.ru/${storage.getInfoUser().image_path}`} id="previewImage"/>
                   </BoxImg>
                   <ProfileFunction>
                       <Button style={{margin: '0 0 12px'}} onClick={()=>{}}>Изменить</Button>
                       <Button style={{margin: '0 0 12px'}} onClick={()=>{authStore.logout()}}>Выйти</Button>


                   </ProfileFunction>

               </Profile>
           </ProfileP>
        </>
    );
};

const BoxImg = styled.div`
  display: flex;
  justify-content: start;
  flex-wrap: wrap;
  margin-bottom: 18px;
`
const Plusik = styled.label`
  background: white;
  width: 24px;
  height: 24px;
  border-radius: 3px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 0 0 18px;
  &:before {
    content: "+";
    font-size: 26px;
    color: #DE9A9A;
  }
`
const SearchContainer = styled.div`
  display: flex;
  justify-content: end;
`

const Komment = styled.div`
color: black;
position: absolute;
width: 100%;
padding: 12px;
height: 157px;


border: 1px solid #FFFFFF;
box-sizing: border-box;
border-radius: 12px;
color: white;

font-style: normal;
font-weight: 400;
font-size: 15px;
line-height: 18px;



`

const TitleSettings = styled.span`
    box-sizing: border-box;
    margin: 0 0 12px;
    border: 0;
    font: inherit;
    vertical-align: baseline;
    font-family: Nunito-Regular,sans-serif;
    font-size: 16px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: row;
    width: 100%;
    padding: 10px 0;
    color: #063b87;
    border-bottom: 1px solid #063b87;
`

const HeadAbout = styled.span`
    box-sizing: border-box;
    margin: 6px;
    padding: 0;
    border: 0;
    font: inherit;
    vertical-align: baseline;
    color: black;
    font-family: Exo2-Regular,sans-serif;
font-style: normal;
font-weight: 600;
font-size: 18px;
line-height: 18px;
/* identical to box height */



`


const OneImg = styled.img`
    width: 31%;
    height: 70px;
    background-size: cover;
    margin-bottom: 6px;
    margin-right: 6px;
   
`

const HeadName = styled.img`
    width: 150px;
    height: 150px;
    background-size: cover;
    border-radius: 100%;
    &:before {
    content: "+";
    position: absolute;
    font-size: 36px;


  
        bottom: -4px;
    right: 17px;

    }
   
`

const ProfileP = styled.div`
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
    justify-content: flex-start;
    flex-direction: column;
    height: 100%;
    overflow: hidden;
    background: rgba(0,0,0,0.1);
`

const Profile = styled.div`
    color: #040424;
    box-sizing: border-box;
    margin: 0;
    padding: 0;
    border: 0;
    vertical-align: baseline;
    position: relative;
    margin-top: 20px;
    width: 450px;
    max-width: 90%;
    min-height: 150px;
`

const ProfileHead = styled.div`
    justify-content: center;
    align-items: center;
    color: #040424;
    box-sizing: border-box;
    margin: 0;
    border: 0;
    font-size: 100%;
    font: inherit;
    vertical-align: baseline;
    display: flex;
    flex-direction: column;
    padding: 15px;
    border-radius: 5px;
    box-shadow: none;
    background: transparent;
`

const ProfileFunction = styled.div`

`

const ProfileUser = styled.div`
    color: #040424;
    box-sizing: border-box;
    margin: 0;
    padding: 0;
    border: 0;
    font-size: 100%;
    font: inherit;
    vertical-align: baseline;
`

const ProfileSettings = styled.div`
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
    width: 100%;
    margin-top: 20px;
    border-radius: 5px;
`
