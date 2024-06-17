import axios from "axios";

export default async function upload(data: {
    ics_url: string
}): Promise<{}> {
    const token = localStorage.getItem("token"); // 假設 token 有存储在 localStorage 中
    console.log("token = " + token)

    if (!token) {
        throw new Error("Token not found");
    }

    const response = await axios.post(
        "/events",
        data,
        {
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json"
            }
        }
    );
    const dataArray = response.data.data; // Accessing `data` property
    if (Array.isArray(dataArray)) {
        dataArray.forEach((item, index) => {
            console.log(`Item ${index}:`, item);
        });
    } else {
        console.error("Expected an array but got:", dataArray);
    }
    return response.data;
}