import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import HomePage from "../pages/homePage";
import LoginPage from "../pages/loginPage";
import RegisterPage from "../pages/registerPage";
import VerifyAuth from "../pages/verifyAuth";

const Routes = () => {
    return (
        <Switch>
            <Route path={'/auth/:id'} component={VerifyAuth} />
            <Route path={'/home'} component={HomePage} />
            <Route path={'/register'} component={RegisterPage} />
            <Route path={'/auth'} component={LoginPage} />
            <Redirect from="/" exact to="/home" />
        </Switch>
    )
}

export default Routes;
