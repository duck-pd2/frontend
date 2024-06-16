import { ReactElement } from "react";

import "./notice.scss"
export default function NotLogin(): ReactElement{

    return <div id="notice">
        <div className="warning">
            <h1> 請先登入！</h1>
        </div>
    </div>
};