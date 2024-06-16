import { ChangeEvent, ReactElement, useState, } from "react";

import "./toLogin.scss"
import login from "../../api/login";
import register from "../../api/register";
import { useNavigate } from "react-router-dom";
import { Axios, AxiosError } from "axios";
import { er } from "@fullcalendar/core/internal-common";
export default function ToLogin(): ReactElement {
    const [username, setUsername] = useState<string>("");
    const [pwd, setPwd] = useState<string>("");

    const setNavigate = useNavigate();

    return <div id="toLogin">
        <div className="toLogin">
            <input className="account" value={username} onChange={(event: ChangeEvent<HTMLInputElement>) => {
                setUsername(event.target.value);
            }}></input>
            <input className="password" type="password" value={pwd} onChange={(event: ChangeEvent<HTMLInputElement>)=>{
                setPwd(event.target.value);
            }}></input>

            
            <div className="toLoginStatus">
            {localStorage.getItem("toLoginStatus")}
            </div>

            <div className="button-container">
                <button onClick={() => {
                    console.log("username = " + username)
                    console.log("pwd = " + pwd)
                    register({username: username, pwd: pwd}).then(data => {
                        localStorage.setItem("myUsername", username)
                        localStorage.setItem("token", data.token);
                        localStorage.setItem("toLoginStatus", "success")
                        console.log("Register success.")
                        setNavigate("/")
                    }).catch((error: AxiosError) => {
                        const data = error.response?.data as {
                            message: string
                        }
                        localStorage.setItem("toLoginStatus", data.message)
                        console.log("Register failed, " + localStorage.getItem("toLoginStatus"));
                        setNavigate("/ToLogin")
                    });
                }}>
                    註冊
                </button>
                <button onClick={() => {
                    console.log("username = " + username)
                    console.log("pwd = " + pwd)
                    login({username: username, pwd: pwd}).then(data => {
                        localStorage.setItem("myUsername", username)
                        localStorage.setItem("token", data.token);
                        localStorage.setItem("toLoginStatus", "success")
                        console.log("Login success.")
                        setNavigate("/")
                    }).catch((error: AxiosError) => {
                        const data = error.response?.data as {
                            message: string
                        }
                        localStorage.setItem("toLoginStatus", data.message)
                        console.log("Login failed, " + localStorage.getItem("toLoginStatus"));
                        setNavigate("/ToLogin")
                    });
                }}>
                    登入
                </button>
            </div>
        </div>
    </div>
}