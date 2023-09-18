import { BASE_PATH, API_VERSION } from "./config";

const getContactMessage = async (token) => {
    const url =  `${BASE_PATH}/${API_VERSION}/get-contact`;
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
        return result
      } catch (error) {
        return error.message;
      } 
}

const postContactMessageAdmin = async(token, data) => {
    const url =  `${BASE_PATH}/${API_VERSION}/contact-admin`;
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
        const result = await response.json();
        return result;
    } catch (error) {
        return error.message;
    }
}

export {
    getContactMessage,
    postContactMessageAdmin
}