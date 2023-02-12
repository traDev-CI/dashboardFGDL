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

const uploadMiniatureApi = async (token, miniature, infoId) => {
    const url = `${BASE_PATH}/${API_VERSION}/update-miniature/${infoId}`;
    const formData = new FormData();
    formData.append("miniature", miniature, miniature.name);
    const params = {
        method: "PUT",
        body: formData,
        headers: {
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



const updateInfo = async (token, info, infoId) =>{

    const url = `${BASE_PATH}/${API_VERSION}/update-about/${infoId}`;
    const params ={
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            Authorization: token
        },
        body: JSON.stringify(info)
    }

    const response = await fetch(url, params);
    try {
        const result = response.json();
        return result
    } catch (e) {
        return e.message;
    }
}

    const getMiniatureApi = async (miniatureName) =>{
        const url = `${BASE_PATH}/${API_VERSION}/get-miniature/${miniatureName}`;

        const response = await fetch(url);
        try {
            const result = await response.url;
            return result
        } catch (error) {
            return error.message;
        }
    }



export {
    addAboutInfo,
    getAboutInfo,
    updateInfo,
    uploadMiniatureApi,
    getMiniatureApi
}