import axios from "axios"

export default async function login(data: {
    username: string,
    pwd: string
}): Promise<{token: string}> {
    const response = await axios.post(
        "/login",
        new URLSearchParams(data),
        {
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            }
        }
    );
    
    return response.data;
};