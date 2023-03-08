import { axiosInstance } from "~/lib/axios";
import { AuthStore } from "./AuthStore";
import { CalendarStore } from "./CalendarStore";
import {NotificationStore} from "./NotificationStore";

export class RootStore {
  constructor() {
    this.api = axiosInstance;
    this.authStore = new AuthStore(this, this.api); // Аутентификация и авторизация
    this.calendarStore = new CalendarStore(this, this.api); // Аутентификация и авторизация
    this.notificationStore = new NotificationStore(this, this.api);

  }
}

const stores = new RootStore();
window._____APP_STATE_____ = stores;
export { stores };
