export default interface CalendarEvent {
    id: string,
    title: string,
    start: Date,
    end: Date,
    description: string,
    eventClass: string,
    color: string,
    tags: Array<string>
}
