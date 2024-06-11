import axios from "axios"

export default async function login(data: {
    username: string,
    pwd: string
}): Promise<{token: string}> {
    const response = await axios.post(
        "/login",
        data
    );

    return response.data;
};
