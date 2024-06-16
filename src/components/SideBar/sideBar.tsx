import {
    ReactElement,
    useEffect,
    useRef,
    useState,
    ChangeEvent
} from "react";

import "./sideBar.scss";
import { useNavigate } from "react-router-dom";

export default function SideBar(props: Readonly<{
    login: boolean
}>): ReactElement {
    const {
        login
    } = props;
    // 引用別的變數
    const topBarRef = useRef<HTMLDivElement>(null);
    const [checked, setChecked] = useState<boolean>(false);
    const setNavigate = useNavigate();

    useEffect(() => {
        if (topBarRef.current === null)
            return;
        document.addEventListener("click", (event: MouseEvent) => {
            const target = event.target as HTMLElement;
            if (target === null || topBarRef.current?.contains(target))
                return;
            setChecked(false);
        });
    }, [topBarRef]);

    return <div ref={topBarRef} id="sideBar">
        <label className="material-symbols-outlined button">
            <input checked={checked} type="checkbox" onChange={(event: ChangeEvent<HTMLInputElement>) => {
                setChecked(event.target.checked);
            }} />
        </label>
        <div className="windowMask">
            <div className="mask">
                <div className="menuList">
                    <div className="menu" onClick={() => {
                        if (!login) {
                            setNavigate("notice");
                            setChecked(false);
                            return;
                        }

                        setNavigate("moodle");
                        setChecked(false);
                    }}>
                        <div>
                            將 moodle 行事曆匯入
                        </div>
                    </div>
                    <div className="menu" onClick={() => {
                        if (!login) {
                            setNavigate("notice");
                            setChecked(false);
                            return;
                        }
                        setNavigate("calender");
                        setChecked(false);
                    }}>
                        <div>
                            查看行事曆
                        </div>
                    </div>
                    <div className="menu" onClick={() => {
                        // if (!login) {
                        //     setNavigate("notice");
                        //     setChecked(false);
                        //     return;
                        // }
                        setNavigate("home");
                        setChecked(false);
                    }}>
                        <div>
                            回首頁
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>;
};