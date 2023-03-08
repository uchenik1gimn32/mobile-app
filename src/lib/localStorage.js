let isLoggerIn = false

export const getTokens = () => {
  return {
    refresh_token: window.localStorage.getItem("refresh_token"),
    token: window.localStorage.getItem("token"),
  };
};

export const setTokens = ({ refresh_token, token }) => {
  window.localStorage.setItem("refresh_token", refresh_token);
  window.localStorage.setItem("token", token);
  setTokenReceiptTime();
};
export const getLastUrlBeforeLogin = () => {
  return window.localStorage.getItem("setLastUrlBeforeLogin");
};
export const removeUrlBeforeLogin = (url) => {
  window.localStorage.removeItem("setLastUrlBeforeLogin");
};
export const setTokenReceiptTime = () => {
  // Время когда был получен токен
  const timestamp = Math.floor(Date.now() / 1000);
  window.localStorage.setItem("tokenReceiptTime", timestamp);
};

export const getTokenReceiptTime = () => {
  const tokenReceiptTime = window.localStorage.getItem("tokenReceiptTime");
  return tokenReceiptTime ? +tokenReceiptTime : 0;
};

export const removeTokenReceiptTime = () => {
  window.localStorage.removeItem("tokenReceiptTime");
};

export const removeTokens = () => {
  window.localStorage.removeItem("refresh_token");
  window.localStorage.removeItem("token");
};

export const getToken = () => {
  const { token } = getTokens();
  return token;
};
export const getRefreshToken = () => {
  const { refresh_token } = getTokens();
  return refresh_token;
};

export const setRememberProperty = (status = false) => {
  window.localStorage.setItem("isRemember", status);
};

export const getRememberProperty = () => {
  const isRemember = window.localStorage.getItem("isRemember"); // "true" || "false"  (string)
  return isRemember === "true";
};

//////////////////

export const setLogin = (login) => {
  window.localStorage.setItem("login", login);
};
export const setToken = (token) => {
  window.localStorage.setItem("token", token);
  setTokenReceiptTime();
};
export const setRefreshToken = (refreshToken) => {
  if(isLoggerIn) console.log('SET refreshToken', refreshToken, new Date())
  window.localStorage.setItem("refresh_token", refreshToken);
};
export const getLogin = () => {
  return window.localStorage.getItem("login");
};
export const removeLogin = (login) => {
  window.localStorage.removeItem("login");
};

export const setUser = (userDetails) => {
  if(userDetails){
    const {company,email,name,rolesCode,rolesName} = userDetails
    window.localStorage.setItem("company",company);
    window.localStorage.setItem("email",email);
    window.localStorage.setItem("name",name);
    window.localStorage.setItem("rolesCode",rolesCode);
    window.localStorage.setItem("rolesName",rolesName);
  }
}

export const getUser = () => {
  const company = window.localStorage.getItem("company");
  const email = window.localStorage.getItem("email");
  const name = window.localStorage.getItem("name");
  const rolesCode = window.localStorage.getItem("rolesCode");
  const rolesName = window.localStorage.getItem("rolesName");
  return {company,email,name,rolesCode,rolesName}
}

export const removeUser = () => {
  window.localStorage.removeItem("company");
  window.localStorage.removeItem("email");
  window.localStorage.removeItem("name");
  window.localStorage.removeItem("rolesCode");
  window.localStorage.removeItem("rolesName");
};

export const getPolicies = () => {
  // Получить список прав
  const policies = window.localStorage.getItem("policies");
  if (policies) {
    return JSON.parse(policies);
  } else {
    return [];
  }
};

export const setPlatformUid = (uid) => {
  window.localStorage.setItem("platform_uid", uid);
};

export const setPolicies = (policies) => {
  window.localStorage.setItem("policies", JSON.stringify(policies));
};

export const setInfoUser = (info) => {
  window.localStorage.setItem("InfoUser", JSON.stringify(info));
};

export const getInfoUser = () => {
  const info = window.localStorage.getItem("InfoUser");
  if (info) {
    return JSON.parse(info);
  } else {
    return {};
  }
};

export const readCookie = (name) => {
  let name_cook = name+"=";
  let spl = document.cookie.split(";");

  for(var i=0; i<spl.length; i++) {
    var c = spl[i];

    while(c.charAt(0) == " ") {
      c = c.substring(1, c.length);
    }
    if(c.indexOf(name_cook) == 0) {
      return c.substring(name_cook.length, c.length);
    }
  }

  return null;
}

export const removePolicies = () => {
  window.localStorage.removeItem("policies");
};
export const clearStorage = () => {
  removePolicies();
  removeLogin();
  removeTokens();
  removeTokenReceiptTime();
  setPlatformUid('')
};

export const getCookie = (name) => {
  let matches = document.cookie.match(new RegExp(
      "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
  ));
  return matches ? decodeURIComponent(matches[1]) : undefined;
}
