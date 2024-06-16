import axios from "axios";

export default async function upload(data: {
    ics_url: string
}): Promise<{}> {
    const token = localStorage.getItem("token"); // 假设 token 存储在 localStorage 中
    console.log("token = " + token)

    if (!token) {
        throw new Error("Token not found");
    }

    // 创建 FormData 对象并添加 ics_url
    const formData = new FormData();
    formData.append("ics_url", data.ics_url);

    const response = await axios.post(
        "/events",
        formData,
        {
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "multipart/form-data"
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