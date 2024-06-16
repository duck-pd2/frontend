import { ChangeEvent, ReactElement, useState } from "react";

import "./moodle.scss"
import moodleUpload from "../../api/moodleUpload";
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
                moodleUpload({ ics_url: ics_url }).then(data => {
                    localStorage.setItem("moodleUploadStatus", "success");
                    console.log("moodleUpload success.");
                }).catch((error: AxiosError) => {
                    const data = error.response?.data as {
                        message: string
                    }
                    localStorage.setItem("moodleUploadStatus", data.message)
                    console.log("moodleUpload failed, " + localStorage.getItem("moodleUploadStatus"));
                    setNavigate("/Moodle")
                });
            }}>
                Upload
            </button>
            <img src={exampleImage} alt ="Example" className= "Image" />
        </div>
    </div>
};