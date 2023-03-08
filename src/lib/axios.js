import axios from "axios";
import { getToken, getRefreshToken, setTokens, removeTokens, clearStorage, getTokenReceiptTime,getCookie, readCookie } from "~/lib/localStorage";
import { stores } from "@stores/RootStore";
import { ServerError, NotFoundError, ResponseError, ForbiddenError } from "~/lib/Error";

let isAuthentication = null;

const baseURL = ""

const createMainAxiosInstance = () => {
    axios.defaults.withCredentials = true;
    const axiosInstance = axios.create({
        withCredentials: true,
        headers: {
            "Content-Type": "application/json"
        },
        timeout: 60000,
    });
    axiosInstance.defaults.withCredentials = true;

    return axiosInstance
};

const checkTokenTime = (token) => {
  if (token) {
    const tokenUpdateTime = getTokenReceiptTime();
    const time = Math.floor(Date.now() / 1000) - new Date(tokenUpdateTime);
    return time < 3600; // если валидный  (токен обновляем раз в 50 секунд)
  }
  return false; // если не валидный
};



const createRequestInterceptorAuth = (instance) => {
  instance.interceptors.request.use(
    async (config) => {
      let token;
      if (isAuthentication) {
        await isAuthentication;
      }
      token = getToken();
      const isValidToken = checkTokenTime(getToken());

      token = getToken();
      if (token) {
        config.headers["Authorization"] = token;
      }
      return config;
    },
    (err) => Promise.reject(err)
  );
};
const createResponseInterceptorAuth = (instance) => {
  instance.interceptors.response.use(
    (response) => response,
    (err) => {

        console.log(err?.response?.status, 11111)

        if (err?.response?.data?.status === 423) {
            stores.notificationStore.addNotification({
                title: "Ошибка!",
                description: err.response.data.message,
                icon: "error",
                type: "error",
            });
            return
        }

        if (err?.response?.status === 401 && stores.authStore.isAuth) {
            clearStorage();
            window.location.replace("/login");
        }


        if (err?.response?.status === 403) {
            // Ошибка авторизации
            let token = getToken();
            const isValidToken = checkTokenTime(getToken());
            if (token && !isValidToken) {

                return
            } else {
                clearStorage();
                window.location.replace("/login");
                return
            }
        }

        stores.notificationStore.addNotification({
        title: "Ошибка!",
        description: err?.response?.data?.message,
        icon: "error",
        type: "error",
      });

      if (err.response.status === 404) {
        return Promise.reject(new NotFoundError({ ...err.response.data, responseStatusCode: err.response.status }));
      } else if (err.response.status === 500) {
        return Promise.reject(new ServerError({ ...err.response.data, responseStatusCode: err.response.status }));
      } else if (err.response.status === 403) {
        return Promise.reject(new ForbiddenError({ ...err.response.data, responseStatusCode: err.response.status }));
      } else {
        return Promise.reject(new ResponseError({ ...err.response.data, responseStatusCode: err.response.status })); // Любая другая ошибка
      }
    }
  );
};

const axiosInstance = createMainAxiosInstance();

createRequestInterceptorAuth(axiosInstance);
createResponseInterceptorAuth(axiosInstance);

export { axiosInstance };
