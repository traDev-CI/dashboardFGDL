import { BASE_PATH, API_VERSION } from "./config";

const addAboutInfo = async (token, data) =>{
    const url = `${BASE_PATH}/${API_VERSION}/about`;
    const params = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: token
        },
        body: JSON.stringify(data)
    };

    const response = await fetch(url, params);
    try {
        const result = response.json();
        return result;
    } catch (error) {
        return error.message;
    }
}

const getAboutInfo = async (token) => {
    const url = `${BASE_PATH}/${API_VERSION}/get-info-about`;
    const params = {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Authorization: token
        }
    };
    const response = await fetch(url, params);
    try {
        const result = await response.json();
        return result;
    } catch (error) {
        return error.message;
    }
}

export {
    addAboutInfo,
    getAboutInfo
}