import { BASE_PATH, API_VERSION } from "./config";

const getDataImagesApi = async (token) => {
  const url = `${BASE_PATH}/${API_VERSION}/data-images`;
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
};

const getImagesApi = async (imageName) => {
  const url = `${BASE_PATH}/${API_VERSION}/get-mimage/${imageName}`;

  const response = await fetch(url);
  try {
    const result = response.url;
    return result;
  } catch (error) {
    return error.message;
  }
};

const uploadImageDataApi = async (token, imageData, imageDataId) => {
  const url = `${BASE_PATH}/${API_VERSION}/upload-data-image/${imageDataId}`;
  const params = {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: token
    },
    body: JSON.stringify(imageData)
  };

  const response = await fetch(url, params);
  try {
    const result = response.json();
    return result;
  } catch (error) {
    return error.message;
  }
};

const uploadImageApi = async (token, image, imageId) => {
  const url = `${BASE_PATH}/${API_VERSION}/upload-image/${imageId}`;
  const formData = new FormData();
  formData.append("image", image, image.name);
  const params = {
    method: "POST",
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
};

const newDataImageApi = async (token, data) => {
  const url = `${BASE_PATH}/${API_VERSION}/set-data-image`;
  console.log("====================================");
  console.log(data);
  console.log("====================================");

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
};

const deleteImageApi = async (token, imageId) => {
  const url = `${BASE_PATH}/${API_VERSION}/delete-image/${imageId}`;
  const params = {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: token
    }
  };
  const response = await fetch(url, params);
  try {
    const result = response.json();
    return result;
  } catch (error) {
    return error.message;
  }
};

export {
  getDataImagesApi,
  getImagesApi,
  uploadImageDataApi,
  newDataImageApi,
  uploadImageApi,
  deleteImageApi
};
