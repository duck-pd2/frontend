import { ReactElement } from "react";

import "./MainApp.scss"

function ButtonLogin(){
    return(
        <button className="buttonLogin">
            登入
        </button>
    );
}
function ButtonMenu(){
    return(
        <button className="buttonMenu">
            <span className="material-symbols-outlined">
menu
</span>
        </button>
    )
}

export default function MainApp(): ReactElement{


    return <div id="MainApp">
        {/* <h1>PD2 duck Calender</h1> */}
        <ButtonMenu />
        <ButtonLogin />

    </div>;
}