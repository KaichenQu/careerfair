import axios, { AxiosError } from "axios";

const API_BASE_URL = "http://localhost:8000"; // Django backend URL

const registerUser = async (userData: {
  fullName: string;
  email: string;
  password: string;
  userType: string;
}) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/api/register/`, {
      full_name: userData.fullName,
      email: userData.email,
      password: userData.password,
      user_type: userData.userType,
    });
    return response.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      const errorData = error.response?.data as {
        message?: string;
        error?: string;
      };
      throw new Error(
        errorData?.message || errorData?.error || "Registration failed"
      );
    }
    if (error instanceof Error) {
      throw error;
    }
    throw new Error("An unexpected error occurred");
  }
};

const loginUser = async (credentials: {
  email: string;
  password: string;
  userType: string;
}) => {
  console.log("Making login request to:", `${API_BASE_URL}/login/`);
  console.log("With credentials:", {
    email: credentials.email,
    password: "********",
    user_type: credentials.userType,
  });

  try {
    const response = await axios.post(`${API_BASE_URL}/login/`, {
      email: credentials.email,
      password: credentials.password,
      user_type: credentials.userType
    });

    console.log("Login response status:", response.status);
    console.log("Login response data:", response.data);

    if (response.data.redirect_url) {
      console.log("Redirecting to:", response.data.redirect_url);
      window.location.href = response.data.redirect_url;
    }

    return response.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      console.error("Axios error details:", {
        status: error.response?.status,
        data: error.response?.data,
        message: error.message,
      });
      const errorData = error.response?.data as {
        message?: string;
        error?: string;
      };
      throw new Error(errorData.message || "Login failed");
    }
    console.error("Non-Axios error:", error);
    throw error;
  }
};

// 只在文件末尾导出一次
export { loginUser, registerUser };
