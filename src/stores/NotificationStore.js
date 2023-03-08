import { observable, action, makeAutoObservable, makeObservable } from "mobx";
import uuid from "react-uuid";
export class NotificationStore {
  toastList = [];
  isOpen = true;

  constructor(rootStore,api) {
    makeObservable(this, {
      toastList: observable,
      isOpen: observable,
      deleteNotification: action.bound,
      deleteAllNotification: action.bound,
      toggleNotification: action.bound,
      addNotification: action.bound,
      playTimer: action.bound,
      stopTimer: action.bound,
      startTimer: action.bound,
      addErrorNotification: action.bound
    });

    this.api = api;
    this.rootStore = rootStore;
  }

  deleteNotification(id) {
    this.toastList = this.toastList.filter((toast) => {
      return toast.id !== id;
    });
  }

  deleteAllNotification() {
    this.toastList = [];
  }

  toggleNotification() {
    this.isOpen = !this.isOpen;
  }

  addNotification(item) {
    const id = uuid();
    this.toastList = [...this.toastList, { ...item, id, timer: 5, isPaused: false }];
    this.startTimer(id);
  }

  playTimer(id) {
    this.toastList = this.toastList.map((item) => {
      if (item.id === id) return { ...item, isPaused: false };
      return item;
    });
    this.startTimer(id);
  }

  stopTimer(id) {
    this.toastList = this.toastList.map((item) => {
      if (item.id === id) return { ...item, isPaused: true };
      return item;
    });
  }

  //TODO поправить таймер
  startTimer(id) {
    this.toastList.map((toast) => {
      if (toast.id === id) {
        let num = toast.timer; //количество секунд
        let timerId = setInterval(() => {
          if (!toast.isPaused) {
            toast.timer = toast.timer - 1;
          }
        }, 1000);

        setTimeout(function () {
          clearInterval(timerId);
        }, (num + 1) * 1000);
      }
    });
  }

  addErrorNotification(options) {
    const { title = "Ошибка", description = "Что-то пошло не так", icon = "error", type = "error" } = options;

    this.addNotification({
      title,
      description,
      icon,
      type,
    });
  }
}
