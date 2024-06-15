import {
    ReactElement,
    useEffect,
    useRef,
    useState,
    ChangeEvent,
    useContext,
    useMemo
} from "react";
import { useNavigate } from "react-router-dom";
import "./topBar.scss"
import SideBar from "../SideBar/sideBar";
import userContext from "../../context/user";

export default function TopBar(): ReactElement {
    // const login = false;//未登入
    // const login = true;//以登入

    const topBarRef = useRef<HTMLDivElement>(null);
    const [checked, setChecked] = useState<boolean>(false);
    const setNavigate = useNavigate();

    const user = useContext(userContext);
    const login = useMemo(() => {
        return user !== undefined;
    }, [user]);

    return <div id="topBar">
        <SideBar login={login} />
        {login ?
            <div className="userArea">
                <img alt="avatar" src="" />
                {/* " "傳入照片 */}
                
                <button onClick={() => {
                    localStorage.removeItem("token");
                    setNavigate("/");
                }}>
                    <span className="material-symbols-outlined">
                        logout
                    </span>
                    {/* logout圖案 */}
                    <span className="text">Logout</span>
                </button>
            </div> :
            <div className="userArea" onClick={() => {
                setNavigate("toLogin");
                setChecked(false);
            }}>
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
