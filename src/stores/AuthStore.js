import { observable, action, reaction, makeObservable } from "mobx";
import * as storage from "../lib/localStorage.js";
import {userManager} from "@api/user-manager";
import uuid from 'react-uuid';

export class AuthStore {
  isRemember;
  isAuth;
  userInformation;
  policies;
  isHasError;
  itsCaptcha;
  captchaSet;

  constructor(rootStore, api) {
    makeObservable(this, {
      isRemember: observable,
      isAuth: observable,
      userInformation: observable,
      policies: observable,
      isHasError: observable,
      login: action,
      getInfoUsers: action.bound,
      forgetPassword: action.bound,
      logout: action,
      changePassword: action,
      itsCaptcha: observable,
      captchaSet: observable,
    });

    this.rootStore = rootStore;
    this.api = api;
    this.isAuth = false;
    //this.isAuth = true;
    this.isHasError = false;
    this.itsCaptcha = false;
    this.userInformation = {};
    this.captchaSet = {};
    //
    // this.userInformation = {
    //   fio: "",
    //   role: "",
    // };
    // this.policies = new Set(storage.getPolicies());
    // reaction(
    //   () => this.isRemember,
    //   (status) => {
    //     storage.setRememberProperty(status);
    //   }
    // );
  }

  // @action toggleRememberStatus() {
  //   this.isRemember = !this.isRemember;
  // }
  // @action
  // async getCurrentUserInformation() {
  //   const data = await userManager.userController.getUser();
  //   this.userInformation = data.user;
  // }

  async login({email, password, setIsHasError}, captcha = 0) {
    try {
      const platform = navigator.platform;

      this.isHasError = false;

      //document.cookie = ""


      let result;
      if (captcha) {
        result = await userManager.authController.login({email, password, platform}, this.captchaSet.uuid)
      } else {
        result = await userManager.authController.login({email, password, platform})
      }
      const {data} = result

      const {access_token:token,refresh_token:refreshToken,message} = data;

      if(message){
        setIsHasError(true);
        this.rootStore.notificationStore.addNotification({
          title: "Ошибка !",
          description: message,
          icon: "error",
          type: "error",
        });
      }else{
        this.isAuth = true;
        //storage.setTokens({token, refreshToken});
        storage.setToken(token)
        storage.setRefreshToken(refreshToken)
        storage.setLogin(email); // сохраняем введенный логин
      }
    }
    catch (e) {
      setIsHasError(true);
      console.log("Error :", e)
    } finally {
      if (this.isAuth) {
        await this.getInfoUsers()
      }
    }
  }

  async getInfoUsers() {
    const result = await userManager.authController.infoUser();
    this.userInformation = result.data;
    await storage.setInfoUser(result.data);
  }

  async forgetPassword(email) {
    await userManager.authController.forgetPassword({email});
  }

  @action
  async setCaptcha() {
    const captcha = await userManager.authController.getCaptcha();
    const objectURL = URL.createObjectURL(captcha.data);
    this.captchaSet = {img: objectURL, uuid: captcha.headers.uuid};
    this.itsCaptcha = true;
  }

  @action
  async validCaptcha(userData, numCaptcha) {
    userManager.authController.validateCaptcha(numCaptcha, this.captchaSet.uuid)
        .then(() => {
          this.login(userData, 1)
          this.itsCaptcha = false
        })
        .catch(() => {
          this.setCaptcha()
        })
  }

  async logout() {
    try {
      storage.clearStorage();
      storage.setInfoUser({});
      this.userInformation = null
      this.isAuth = false;
      window.location.replace("/login");
    } catch (e) {
    } finally {
      //
      // storage.clearStorage();
      // this.userInformation = null
      // this.isAuth = false;
      // window.location.replace("/login");
    }
  }

  async changePassword(data) {
    try {
      await userManager.authController.changePassword(data);
      this.rootStore.notificationStore.addNotification({
        title: "Сохранение !",
        description: "Пароль успешно изменен !",
        icon: "save",
        type: "done",
      });
    } catch (e) {
      console.log(e);
    } finally {
    }
  }
}
