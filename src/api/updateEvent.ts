import axios from "axios"
import CalendarEvent from "../schemas/calendarEvent";

export async function updateEvent(data: {
    id: String
    title: String
    start: String
    end: String
    description: String
    eventClass: String
    color: String
    tags: Array<String>
}): Promise<CalendarEvent> {
    const response = await axios.put(
        "/events?id="+data.id,
        data
    );

    const responseData: { data: CalendarEvent } = response.data;
    let result: CalendarEvent = responseData.data;
    result.start = new Date(result.start);
    result.end = new Date(result.end);

    return result;
};