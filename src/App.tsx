import { ReactElement, useEffect, useMemo, useState } from "react";
import "./App.scss";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import TopBar from "./components/TopBar/topBar";
import Home from "./components/Home/home";
import Moodle from "./components/Moodle/moodle";
import Notice from "./components/Notice/notice";
import ToLogin from "./components/ToLogin/toLogin";
import userContext from "./context/user";
import { jwtDecode } from "jwt-decode";
import User from "./schemas/user";
import Calendar from "./components/Calendar";
import {getCalendar} from "./api/event";
import CalendarEvent from "./schemas/calendarEvent";

export default function App(): ReactElement {
    const [calendar, setCalendar] = useState<Array<CalendarEvent>>([]);

    const location = useLocation();

    const user = useMemo(() => {
        const token = localStorage.getItem("token");
        if (token === null)
            return undefined;
        try {
            return jwtDecode(token) as User;
        }
        catch {
            return undefined;
        }
    }, [location.pathname]);

    useEffect(() => {
        if (user === undefined) return;
        getCalendar().then(data => {
            setCalendar(data);  
            console.log(data);
        })
    }, [user]);

    return <userContext.Provider value={user}>
        <div id="app">
            <div className="banner">
                <h1>PD2 Duck Calender</h1>
            </div>
            <TopBar />
            <div className="content">
                <Routes>
                    <Route path="home" element={<Home />} />
                    <Route path="moodle" element={<Moodle />} />
                    <Route path="calender" element={<Calendar
                        calendar={calendar}
                        setCalendar={setCalendar}
                    />} />
                    <Route path="notice" element={<Notice />} />
                    <Route path="toLogin" element={<ToLogin />} />
                    <Route path="*" element={<Navigate to="home" />} />
                </Routes>
            </div>
        </div>
    </userContext.Provider>;
};
