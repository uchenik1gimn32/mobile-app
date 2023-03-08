import { axiosInstance as api } from "~/lib/axios";

export const login = ({ email, password, platform, uuid }, captcha) => {
    // Аутентификация
    // Обновление токена

    let config = {
        headers: {
            captcha_uid: captcha
        }
    }

    if (captcha) {
        return api.post("/core-service/api/v1/external/web/auth", { email, password, platform}, config);
    } else {
        return api.post("/core-service/api/v1/external/web/auth", { email, password, platform });
    }
};

export const logout = () => {
    //Выход из системы
    // return api.post("/core-service/api/v1/web/auth", { login, password, platform });
};

export const refreshToken = async ({ refresh_token }) => {
    // Обновление токена
    return await api.post(`/core-service/api/v1/external/web/auth/refresh`, { refresh_token });
};

export const infoUser = async () => {
    // Обновление токена
    return await api.get(`/core-service/api/v1/external/web/users/info`);
};

export const forgetPassword = async ({email }) => {
    // вспомнить пароль(отправка письма на email)
    // return await api.post(`/api/v1/external/web/auth/refresh`, { refresh_token });
};

export const changePassword = async (data) => {

    return await api.post(`/core-service/api/v1/external/web/users/password`, data);
};

export const getCaptcha = async () => {
    return await api.get(`/captcha-service/api/v1/captcha`, {responseType: 'blob'})
}

export const validateCaptcha = async (num, uuid) => {
    return await api.post(`/captcha-service/api/v1/captcha/validate`, {
        captcha: num,
        uuid: uuid
    })
}

export const getAllDates = async () => {
    return await api.get(`/core-service/api/v1/external/web/mobile/events/dates`);
};

export const getListAggregators = async (data) => {
    return await api.post(`/core-service/api/v1/external/web/mobile/events/aggregators`, data);
};

export const getListObject = async (data) => {
    return await api.post(`/core-service/api/v1/external/web/mobile/events/objects`, data);
};

export const getListEpyObject = async (data) => {
    return await api.post(`/core-service/api/v1/external/web/mobile/events/equipments`, data);
};

export const getChartData = async (data) => {
    return await api.post(`/core-service/api/v1/external/web/mobile/events/loadChart`, data);
};

export const getMassage = async (data) => {
    return await api.post(`/core-service/api/v1/external/web/mobile/inbox`, data);
};

export const getMassageType = async () => {
    return await api.get(`/core-service/api/v1/external/web/objects/types?directoryType=NOTIFICATIONS_TYPE`);
};