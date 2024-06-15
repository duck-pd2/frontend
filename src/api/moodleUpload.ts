import axios from "axios"

export default async function upload(data: {
    ics_url: string
}): Promise<{token: string}> {
    const response = await axios.post(
        "/events",
        data
    );

    return response.data;
};
