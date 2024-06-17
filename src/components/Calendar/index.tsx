import {
    CSSProperties,
    Dispatch,
    ReactElement,
    SetStateAction,
    useMemo,
    useState
} from "react";

import "./index.scss";
import CalendarEvent from "../../schemas/calendarEvent";
import NewEvent from "./NewEvent";
import ViewEvent from "./viewEvent";

type propsType = Readonly<{
    calendar: Array<CalendarEvent>,
    setCalendar: Dispatch<SetStateAction<Array<CalendarEvent>>>
}>;

const nowDate = new Date()

const MONTH_CVT = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
]

const WEEK_STR = [
    "Sun.",
    "Mon.",
    "Tue.",
    "Wed.",
    "Thu.",
    "Fri.",
    "Sat."
]

function getWeek(date: Date): number {
    const tempDate = new Date(date);
    tempDate.setDate(1);

    return Math.floor((tempDate.getDay() + date.getDate() - 1) / 7);
}

function sameDay(date1: Date, date2: Date): boolean {
    return date1.getFullYear() === date2.getFullYear() && date1.getMonth() === date2.getMonth() && date1.getDate() === date2.getDate();
}

export default function Calendar(props: propsType): ReactElement {
    const {
        calendar,
        setCalendar
    } = props;

    const [date, setDate] = useState<Date>(nowDate);
    const [mode, setMode] = useState<number>(0);
    const [eventTmp, setEventTmp] = useState<CalendarEvent|undefined>(undefined);
    const [showNewEvent, setShowNewEvent] = useState<boolean>(false);
    const [showViewEvent, setShowViewEvent] = useState<boolean>(false);

    const year = useMemo(() => {
        return date.getFullYear()
    }, [date]);
    const month = useMemo(() => {
        return date.getMonth()
    }, [date]);

    const totalWeek = useMemo(() => {
        const tempDate = new Date(date);
        tempDate.setMonth(tempDate.getMonth() + 1);
        tempDate.setDate(0);
        return getWeek(tempDate) + 1;
    }, [date]);

    const calendarMap = useMemo(() => {
        const tempDate = new Date(date);
        tempDate.setDate(1);
        let startNum = -tempDate.getDay() + 1;

        const result = [];
        for (let i = 0; i < totalWeek; i++) {
            const content = [];
            for (let j = 0; j < 7; j++) {
                const newDate = new Date(date);
                newDate.setDate(startNum++);
                content.push(newDate);
            }
            result.push(content);
        }

        return result;
    }, [date, totalWeek, calendar]);

    return <div id="calendar">
        <h2 className="title">
            {`${year} ${MONTH_CVT[month]}.`}
        </h2>
        <div className="toolBar">
            <button className="add" onClick={() => {
                setShowNewEvent(true);
            }}>Add Event</button>
            <button className="filter">Filter</button>
            <button className="material-symbols-outlined" onClick={() => setMode(0)}>
                view_compact
            </button>
            <button className="material-symbols-outlined" onClick={() => setMode(1)}>
                view_week
            </button>
            <button className="refresh material-symbols-outlined" onClick={() => setDate(new Date())}>
                refresh
            </button>
            <button className="back material-symbols-outlined" onClick={() => {
                setDate(v => {
                    const nv = new Date(v);
                    if (mode === 0) nv.setMonth(nv.getMonth() - 1);
                    else nv.setDate(nv.getDate() - 7);
                    return nv;
                })
            }}>
                chevron_left
            </button>
            <button className="next material-symbols-outlined" onClick={() => {
                setDate(v => {
                    const nv = new Date(v);
                    if (mode === 0) nv.setMonth(nv.getMonth() + 1);
                    else nv.setDate(nv.getDate() + 7);
                    return nv;
                })
            }}>
                chevron_right
            </button>
        </div>
        <div className="weekday">
            {
                WEEK_STR.map((str, i) => <div key={`${str}${i}`}>{str}</div>)
            }
        </div>
        <div className="table" data-week-mode={mode === 1} style={{
            "--total-week": totalWeek,
            "--current-week": getWeek(date)
        } as CSSProperties}>
            {
                calendarMap.map((week, i) => <div key={`${week}${i}`} className="week">
                    {week.map((day, j) => <div
                        key={`${day}${i}`}
                        className="day"
                        data-current={day.getMonth() === month}
                        data-select={sameDay(new Date(), day)}
                    >
                        <div className="date">{day.getDate()}</div>
                        {calendar.filter(v => sameDay(v.start, day)).map((v, k) => <div key={`${v}${k}`} className="event" onClick={() => {
                            console.log("click!");
                            console.log("v=" + v.id);
                            setEventTmp(v);
                            setShowViewEvent(true);
                        }} style={{
                            "--color": v.color
                        } as CSSProperties}>
                            {v.title}
                        </div>)
                        }
                    </div>)}
                </div>)
            }
        </div>
        <NewEvent show={showNewEvent} close={() => setShowNewEvent(false)} callback={(data: CalendarEvent) => {
            setCalendar(v => [...v, data]);
        }}/>
        <ViewEvent show={showViewEvent} close={() => setShowViewEvent(false)} myEvent = {eventTmp} callback={(data: CalendarEvent, opt: String) => {
            if(opt === "delete") {
                setCalendar(v => v.filter(u => u.id !== data.id));
            }
            if(opt === "update") {
                console.log("opt = update")
                setCalendar(v => v.filter(u => u.id !== data.id));
                console.log("opt = update")
                setCalendar(v => [...v, data]);
                console.log("opt = update")
            }
        }}/>
    </div>
}