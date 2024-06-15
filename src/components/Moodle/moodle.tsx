import { ChangeEvent, ReactElement, useState } from "react";
import moodleUpload from "../../api/moodleUpload";

import "./moodle.scss"
import exampleImage from './picture.png';

export default function Moodle(): ReactElement {
    const [selectedFile, setSelectedFile] = useState<File>();
    const [ics_url, setIcs_url] = useState<string>("");
    
    return <div id="moodle">
        <div className="import">
            <h2> 上傳行事曆網址 </h2>
            <input className="moodleUrl" value={ics_url} onChange={(event: ChangeEvent<HTMLInputElement>) => {
                setIcs_url(event.target.value);
            }}></input>
            <button onClick={() => {
                moodleUpload({ics_url: ics_url}).then(data => {
                    console.log("ics_url = " + ics_url)
                    localStorage.setItem("token", data.token);
                }).catch(() => {
                    console.log("Login failed.");
                });
            }}>
                Upload1
            </button>

            <button className=" buttonUpload">
                Upload2
            </button>
            <img src={exampleImage} alt ="Example" className= "Image" />
        </div>
    </div>
};