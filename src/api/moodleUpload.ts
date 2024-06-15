// import axios from "axios";

// export default async function upload(data: {
//     ics_url: string
// }): Promise<{ token: string }> {
//     const localToken = localStorage.getItem("token"); // 假設 token 存儲在 localStorage 中

//     if (!localToken) {
//         throw new Error("Token not found");
//     }

//     const response = await axios.post(
//         "/events",
//         data,
//         {
//             headers: {
//                 "Authorization": `Bearer ${localToken}`
//             }
//         }
//     );

//     return response.data;
// }

import axios from "axios";

export default async function upload(data: {
    ics_url: string
}): Promise<{}> {
    const token = localStorage.getItem("token"); // 假设 token 存储在 localStorage 中

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

    return response.data;
}