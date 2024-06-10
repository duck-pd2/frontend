import { ReactElement } from "react";

import "./notice.scss"

export default function NotLogin(): ReactElement{
    const login = false;
    return <div id="notice">
        <div className="warning">
            <h3> 請先登入</h3>
        </div>
    </div>
};