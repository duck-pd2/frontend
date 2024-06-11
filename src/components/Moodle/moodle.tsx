import { ChangeEvent, ReactElement, useState } from "react";

import "./moodle.scss"
import exampleImage from './picture.png';

export default function Moodle(): ReactElement {
    const [selectedFile, setSelectedFile] = useState<File>();

    return <div id="moodle">
        <div className="import">
            <h2> 
                上傳行事曆網址
                </h2>
            <input></input>
            <button className=" buttonUpload">
                Upload
            </button>
            <img src={exampleImage} alt ="Example" className= "Image" />
        </div>
    </div>
};