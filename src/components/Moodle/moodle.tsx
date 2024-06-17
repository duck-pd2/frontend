import { ChangeEvent, ReactElement, useState } from "react";

import "./moodle.scss"
import postEvents from "../../api/postEvents";
import getEvents from "../../api/getEvents";
import { useNavigate } from "react-router-dom";
import exampleImage from './picture.png';
import { Axios, AxiosError } from "axios";

export default function Moodle(): ReactElement {
    const [selectedFile, setSelectedFile] = useState<File>();
    const [ics_url, setIcs_url] = useState<string>("");
    
    const setNavigate = useNavigate();

    return <div id="moodle">
        <div className="import">
            <h2> 上傳行事曆網址 </h2>
            <input className="moodleUrl" value={ics_url} onChange={(event: ChangeEvent<HTMLInputElement>) => {
                setIcs_url(event.target.value);
            }}></input>
            <button onClick={() => {
                console.log("ics_url = " + ics_url)
                postEvents({ ics_url: ics_url }).then(data => {
                    localStorage.setItem("postEventStatus", "success");
                    console.log("postEvent success.");
                }).catch((error: AxiosError) => {
                    const data = error.response?.data as {
                        message: string
                    }
                    localStorage.setItem("postEventStatus", data.message)
                    console.log("postEvent failed, " + localStorage.getItem("postEventStatus"));
                    setNavigate("/Moodle")
                });
            }}>
                Upload
            </button>
            <button onClick={() => {
                console.log("ics_url = " + ics_url)
                getEvents({ ics_url: ics_url }).then(data => {
                    localStorage.setItem("getEventStatus", "success");
                    console.log("getEvent success.");
                }).catch((error: AxiosError) => {
                    const data = error.response?.data as {
                        message: string
                    }
                    localStorage.setItem("getEventStatus", data.message)
                    console.log("getEvent failed, " + localStorage.getItem("getEventStatus"));
                    setNavigate("/Moodle")
                });
            }}>
                get
            </button>
            <img src={exampleImage} alt ="Example" className= "Image" />
        </div>
    </div>
};