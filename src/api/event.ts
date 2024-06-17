import axios from "axios";
import CalendarEvent from "../schemas/calendarEvent";

export async function getCalendar(): Promise<Array<CalendarEvent>> {
    const response = await axios.get("/events");

    const data: { data: Array<CalendarEvent> } = response.data;

    return data.data.map(v => {
        v.start = new Date(v.start);
        v.end = new Date(v.end);
        return v;
    });
}

export async function createEvent(data: {
    title: string,
    start: string,
    end: string,
    description: string,
    eventClass: string,
    color: string,
    tags: Array<string>,
}): Promise<CalendarEvent> {
    const response = await axios.post(
        "/events/new",
        data
    );

    const responseData: { data: CalendarEvent } = response.data;
    let result: CalendarEvent = responseData.data;
    result.start = new Date(result.start);
    result.end = new Date(result.end);

    return result;
}
