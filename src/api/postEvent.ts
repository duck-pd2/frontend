import axios from "axios"

export default async function postEvent(data: {
    title: String
    start: String
    end: String
    description: String
    eventClass: String
    color: String
    tags: Array<String>
}): Promise<{token: string}> {
    const response = await axios.post(
        "/events/new",
        data
    );
    return response.data;
};