import axios from "axios";

export default async function upload(data: {
    ics_url: string
}): Promise<{}> {
    const token = localStorage.getItem("token"); // 假设 token 存储在 localStorage 中
    console.log("token = " + token)

    if (!token) {
        throw new Error("Token not found");
    }

    const formData = new FormData();
    formData.append("ics_url", data.ics_url);

    const response = await axios.get(
        "/events",
        {
            headers: {
                "Authorization": `Bearer ${token}`,
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