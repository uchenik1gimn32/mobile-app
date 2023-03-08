import React from "react";
import ReactDom from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import App from "./App";
import "./assets/fonts/fonts.scss";
import "./base.scss";
// import "./tooltip.css";

const root = document.querySelector("#root");

const render = () => {
    if (root) {
        ReactDom.render(
            <Router>
                <App />
            </Router>,
            root
        );
    }
};

render();
