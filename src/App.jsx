import React  from "react";
import { ThemeProvider } from "styled-components";
import { GlobalStyles } from "./global-styles";

import { Routes } from "~/Routes";
import { Provider } from "mobx-react";
import { stores } from "@stores/RootStore";
import {Toast} from "@components/NotificationContainer/Toast";

const App = (() => {

    return (
        <>
            {stores && (
                <Provider store={stores}>
                    <ThemeProvider theme={{}}>
                        <GlobalStyles />
                        <Routes />
                        <Toast />
                    </ThemeProvider>
                </Provider>
            )}
        </>
    );
});

export default App