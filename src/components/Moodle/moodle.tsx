import { ChangeEvent, ReactElement, useState } from "react";

import "./moodle.scss"
import exampleImage from './picture.png';

export default function Moodle(): ReactElement {
    const [selectedFile, setSelectedFile] = useState<File>();
    
    return <div id="moodle">
        <div className="import">
            <h2> 
                上傳行事曆 ICS檔
                </h2>
            <label className="selectFile">
                <span>
                    Select File
                    </span>  
                <input type="file" onChange={(event: ChangeEvent<HTMLInputElement>) => {
                    const file = event.target.files?.[0];
                    if (file === undefined)
                        return;
                    setSelectedFile(file);
                }} />
            </label>
            <button className=" buttonUpload">
                Upload
            </button>
            <img src={exampleImage} alt ="Example" className= "Image" />
        </div>
    </div>
};