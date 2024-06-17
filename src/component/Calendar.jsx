import React from "react";
import Fullcalendar from "@fullcalendar/react";
import daygrid from "@fullcalendar/daygrid";
import timegrid from "@fullcalendar/timegrid";
import interaction from "@fullcalendar/interaction";


function Calendar() {
    return <div>
        <Fullcalendar
            plugins ={[daygrid, timegrid, interaction]}
            initialView ={"daygridMonth"}
        />
    </div>;
}

export default Calendar;

