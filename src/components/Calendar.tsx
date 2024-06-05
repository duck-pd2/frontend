import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid"
import timeGridPlugin from "@fullcalendar/timegrid"
import interactionPlugin from "@fullcalendar/interaction"
import { useState } from "react";

export function Calendar() {

    const [events, setEvents] = useState([
        {
          title: 'Meeting',
          start: '2024-06-10T10:30:00',
          end: '2024-06-10T12:30:00'
        },
        {
          title: 'Lunch',
          start: '2024-06-11T12:00:00',
        },
        {
          title: 'Conference',
          start: '2024-06-13',
          end: '2024-06-15'
        }
      ]);
    return (
        <div>
            <FullCalendar
                plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
                initialView={"dayGridMonth"}
                headerToolbar={{
                    start: "today prev,next",
                    center: "title",
                    end: "dayGridMonth,timeGridWeek,timeGridDay",
                }}
                height={"90vh"}
                events={events}
            />
        </div>
    )
}