import axios from "axios"

export default async function register(data: {
    username: string,
    pwd: string
}): Promise<{token: string}> {
    const response = await axios.post(
        "/register",
        data
    );

    return response.data;
};
