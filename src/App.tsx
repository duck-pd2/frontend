import {Calendar, } from "./components/Calendar";
import { ReactElement } from "react";
import "./App.scss";
import { Navigate, Route, Routes } from "react-router-dom";
import TopBar from "./components/TopBar/topBar";
import Home from "./components/Home/home";
import Moodle from "./components/Moodle/moodle";
import Notice from "./components/Notice/notice";

export default function App(): ReactElement {

    return <div id="app">
        <div className="banner">
            <h1>PD2 Duck Calender</h1>
        </div>
        <TopBar />
        <div className="content">
            <Routes>
                <Route path="home" element={<Home/>} />
                <Route path="moodle" element={<Moodle/>} />
                <Route path="calender" element={<Calendar/>} />
                <Route path="notice" element={<Notice/>} />
                <Route path="*" element={<Navigate to="home" />} />
            </Routes>
        </div>
    </div>;
};
