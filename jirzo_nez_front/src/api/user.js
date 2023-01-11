import { BASE_PATH, API_VERSION } from "./config";

const signUpApi = async (data) => {
  const url = `${BASE_PATH}/${API_VERSION}/sign-up`;
  const params = {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json"
    }
  };
  const response = await fetch(url, params);
  try {
    const result = await response.json();
    if (result.user) {
      return {
        ok: true,
        message: "User created successfully"
      };
    } else {
      return {
        ok: false,
        message: result.message
      };
    }
  } catch (error) {
    return {
      ok: false,
      message: error.message
    };
  }
};

const singInApi = async (data) => {
  const url = `${BASE_PATH}/${API_VERSION}/sign-in`;
  const params = {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json"
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

const getuserApi = async (token) => {
  const url = `${BASE_PATH}/${API_VERSION}/users`;
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

const getuserActiveApi = async (token, status) => {
  const url = `${BASE_PATH}/${API_VERSION}/users-active?active=${status}`;
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

const uploadAvatarApi = async (token, avatar, userId) => {
  const url = `${BASE_PATH}/${API_VERSION}/upload-avatar/${userId}`;
  const formData = new FormData();
  formData.append("avatar", avatar, avatar.name);
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
};

const getAvatarApi = async (avatarName) => {
  const url = `${BASE_PATH}/${API_VERSION}/get-avatar/${avatarName}`;

  const response = await fetch(url);
  try {
    const result = response.url;
    return result;
  } catch (error) {
    return error.message;
  }
};

const updateUserApi = async (token, user, userId) => {
  const url = `${BASE_PATH}/${API_VERSION}/update-user/${userId}`;

  const params = {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: token
    },
    body: JSON.stringify(user)
  };

  const response = await fetch(url, params);
  try {
    const result = response.json();
    return result;
  } catch (error) {
    return error.message;
  }
};

const activeUserAPi = async (token, userId, status) => {
  const url = `${BASE_PATH}/${API_VERSION}/activate-user/${userId}`;
  const params = {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: token
    },
    body: JSON.stringify({
      active: status
    })
  };

  const response = await fetch(url, params);
  try {
    const result = response.json();
    return result;
  } catch (error) {
    return error.message;
  }
};

const deletedUserApi = async (token, userId) => {
  const url = `${BASE_PATH}/${API_VERSION}/delete-user/${userId}`;
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

const signUpAdminApi = async (token, data) => {
  const url = `${BASE_PATH}/${API_VERSION}/sign-up-admin`;
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

export {
  signUpApi,
  singInApi,
  getuserApi,
  getuserActiveApi,
  uploadAvatarApi,
  getAvatarApi,
  updateUserApi,
  activeUserAPi,
  deletedUserApi,
  signUpAdminApi
};
