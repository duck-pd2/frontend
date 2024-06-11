import { ReactElement } from "react";

import "./topBar.scss"
import SideBar from "../SideBar/sideBar";

export default function TopBar(): ReactElement {
    // const login = false;//未登入
    const login = true;//以登入
    return <div id="topBar">
        <SideBar login={login} />
        {login ?
            <div className="userArea">
                <img alt="avatar" src="" />
                {/* " "傳入照片 */}
                <button>
                    <span className="material-symbols-outlined">
                        logout
                    </span>
                    {/* logout圖案 */}
                    <span className="text">Logout</span>
                </button>
            </div> :
            <div className="userArea">
                <button>
                    <span className="material-symbols-outlined">
                        login
                    </span>
                    {/* login圖案 */}
                    <span className="text">Login</span>
                </button>
            </div>}
    </div>;
}
