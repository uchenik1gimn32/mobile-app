import React, { useEffect } from "react";
import { Route, Switch } from "react-router-dom";
import {AuthPage, RegistrationPage,ForgetPasswordPage} from "./containers";
// import { Logout } from "./containers/Support/Logout";
import { PrivateRoute } from "@components/PrivateRoute";
import { useStores } from "@stores/useStore";
import { observer } from "mobx-react";
import { PageLayout } from "@layouts/PageLayout";
import { NotFoundLayout } from "@layouts/NotFoundLayout";
// containers
import { HomePage } from "./containers/HomePage/HomePage";
import { ProfilePage } from "./containers/ProfilePage/ProfilePage";
import { EventsPage } from "./containers/EventsPage/EventsPage";
import { NotificationsPage } from "./containers/NotificationsPage/NotificationsPage";
import { UsersPage } from "./containers/UsersPage/UsersPage";

export const Routes = observer(({ setIsDarkTheme }) => {
    const { authStore } = useStores();

    const routes = [
        {exact: true, name: 'Profile', link:"/profile", component: ProfilePage},
        {exact: true, name: 'Events', link:"/events", component: EventsPage},
        {exact: true, name: 'Users', link:"/users", component: UsersPage},
        {exact: true, name: 'Notifications', link:"/notifications", component: NotificationsPage}
        ]

    return (
        <>
            <Switch>
                {routes.map(({ component: Component, exact, link }, index) => (
                    <Route
                        key={index}
                        exact={exact}
                        path={link}
                        render={() => {
                            return (
                                <PageLayout setIsDarkTheme={setIsDarkTheme}>
                                    <PrivateRoute exact={exact} isAuthenticated={!authStore.isAuth} path={link} component={Component} />
                                </PageLayout>
                            );
                        }}
                    />
                ))}

                <Route
                    exact
                    path="/login"
                    render={() => (
                        <PageLayout>
                            <AuthPage />
                        </PageLayout>
                    )}
                />

                <Route
                    exact
                    path="/registration"
                    render={() => (
                        <PageLayout>
                            <RegistrationPage />
                        </PageLayout>
                    )}
                />



                <Route exact path="*" render={() => <NotFoundLayout />} />
            </Switch>
        </>
    );
});
