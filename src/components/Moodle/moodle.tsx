import { ChangeEvent, ReactElement, useState } from "react";

import "./moodle.scss"
import postEvents from "../../api/postEvents";
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
                    localStorage.setItem("postEventsStatus", "success");
                    console.log("postEvents success.");
                }).catch((error: AxiosError) => {
                    const data = error.response?.data as {
                        message: string
                    }
                    localStorage.setItem("postEventsStatus", data.message)
                    console.log("postEvents failed, " + localStorage.getItem("postEventsStatus"));
                    setNavigate("/Moodle")
                });
            }}>
                Upload
            </button>
            <img src={exampleImage} alt ="Example" className= "Image" />
        </div>
    </div>
};