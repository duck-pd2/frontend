import axios from "axios"

export async function deleteEvent(data: {
    id: String
}): Promise<{token: string}> {
    const response = await axios.delete(
        "/events/new?id="+data.id,
    );
    return response.data;
};