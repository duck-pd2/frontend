import { ReactElement } from "react";

import "./home.scss"
export default function Home(): ReactElement {
    //const login = false;
    return <div id="home">
        <div className="introduction">

            <h1> 介紹</h1>
            <h2>
                一個改良版的moodle行事曆，使用者可以將moodle上的資料匯出並上傳至這個網站，網站會重新以更清楚的方式顯示出所有事件，並添加「filter」及「自己新增事件」的功能。
            </h2>
        </div>
    </div>
};