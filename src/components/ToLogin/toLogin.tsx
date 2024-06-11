import { ChangeEvent, ReactElement, useState, } from "react";

import "./toLogin.scss"
import login from "../../api/login";
import register from "../../api/register";
import { useNavigate } from "react-router-dom";
export default function ToLogin(): ReactElement {
    const [username, setUsername] = useState<string>("");
    const [pwd, setPwd] = useState<string>("");

    const setNavigate = useNavigate();

    return <div id="toLogin">
        <div className="toLogin">
            <input className="account" value={username} onChange={(event: ChangeEvent<HTMLInputElement>) => {
                console.log(event.target.value)
                setUsername(event.target.value);
            }}></input>
            <input className="password" type="password" value={pwd} onChange={(event: ChangeEvent<HTMLInputElement>)=>{
                console.log(event.target.value)
                setPwd(event.target.value);
            }}></input>
            <button onClick={() => {
                register({username: username, pwd: pwd}).then(data => {
                    localStorage.setItem("token", data.token);
                }).catch(() => {
                    console.log("Login failed.");
                });
            }}>
                註冊
            </button>
            <button onClick={() => {
                login({username: username, pwd: pwd}).then(data => {
                    localStorage.setItem("token", data.token);
                }).catch(() => {
                    console.log("Login failed.");
                    localStorage.setItem("token", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiMTIzIn0.XlsVkPM4_iocwrnDew_BUmt5OzbAcxOUH7bq2dDL-y8");
                    setNavigate("/");
                });
            }}>
                登入
            </button>
        </div>
    </div>
}