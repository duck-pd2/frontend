import { ReactElement } from "react";

import "./MainApp.scss"

function ButtonLogin(){
    return(
        <button className="buttonLogin">
            登入
        </button>
    );
}
function ButtonLeft(){
    return(
        <button className="buttonLeft">
            <span className="material-symbols-outlined">
menu
</span>
        </button>
    )
}

export default function MainApp(): ReactElement{


    return <div id="MainApp">
        {/* <h1>PD2 duck Calender</h1> */}
        <ButtonLeft />
        <ButtonLogin />

    </div>;
}