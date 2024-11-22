import { SystemSecurityUpdate } from "@mui/icons-material";
import axios, { AxiosError } from "axios";

const API_BASE_URL = "http://localhost:8000"; // Django backend URL
let user_getID: string | number = '';

// Initialize user_getID if we're in the browser
if (typeof window !== 'undefined') {
  user_getID = localStorage.getItem('user_id') || '';
}

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
    console.log("Login response:", response.data); // Debug log
    
    if (!response.data.user_id) {
      throw new Error('No user_id received from server');
    }
    
    localStorage.setItem('user_id', response.data.user_id);
    user_getID = response.data.user_id;
    console.log(user_getID);

    if (response.data.redirect_url) {
      console.log("Redirecting to:", response.data.redirect_url);
      if (credentials.userType == "company") {
        window.location.href = response.data.redirect_url + "/" + response.data.user_id;
      } else if(credentials.userType == "student"){
        window.location.href = response.data.redirect_url+  "/" + response.data.user_id;
      } else if(credentials.userType == "faculty"){
        window.location.href = response.data.redirect_url+  "/" + response.data.user_id;
    }
  
  }
    return response.data.user_id;

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

export interface CompanyProfile {
  name: string;
  email: string;
  industry: string;
  contact_name: string;
  contact_phone: string;
  contact_email: string | null;
  location: string;
  profile: string;
}

const companyAPI = {
  // Get profile of currently logged-in company
  getProfile: async (): Promise<CompanyProfile> => {
    try {
      const storedUserId = localStorage.getItem('user_id');
      console.log("Getting profile for logged-in user:", storedUserId);
      
      if (!storedUserId) {
        throw new Error('User ID is not set. Please login first.');
      }

      const response = await axios.get(`${API_BASE_URL}/company/${storedUserId}/profile`);
      console.log("Profile data received:", response.data);
      return response.data;
    } catch (error) {
      console.error("Error fetching company profile:", error);
      throw error;
    }
  },
  
  // Get profile of any company by ID
  getCompanyById: async (companyId: string | number): Promise<CompanyProfile> => {
    try {
      console.log("Fetching company profile for ID:", companyId);
      const response = await axios.get(`${API_BASE_URL}/company/${companyId}/profile`);
      console.log("Company data received:", response.data);
      return response.data;
    } catch (error) {
      console.error("Error fetching company by ID:", error);
      throw error;
    }
  },

  // Update company profile
  updateProfile: async (profileData: Partial<CompanyProfile>): Promise<CompanyProfile> => {
    try {
      const storedUserId = localStorage.getItem('user_id');
      if (!storedUserId) {
        throw new Error('User ID is not set. Please login first.');
      }

      const response = await axios.put(
        `${API_BASE_URL}/company/${storedUserId}/profile`,
        profileData
      );
      console.log("Profile updated:", response.data);
      return response.data;
    } catch (error) {
      console.error("Error updating company profile:", error);
      throw error;
    }
  }
};

interface StudentProfile {
  student_id: number;
  name: string;
  email: string;
  major: string;
  academic_year: string;
  resume_uploaded: boolean;
  gpa: number;
}

const studentAPI = {
  // Get profile of currently logged-in student
  getProfile: async (): Promise<StudentProfile> => {
    try {
      const storedUserId = localStorage.getItem('user_id');
      console.log("Getting profile for logged-in student:", storedUserId);
      
      if (!storedUserId) {
        throw new Error('User ID is not set. Please login first.');
      }

      const response = await axios.get(`${API_BASE_URL}/student/${storedUserId}/profile`);
      console.log("Student profile data received:", response.data);
      return response.data;
    } catch (error) {
      console.error("Error fetching student profile:", error);
      throw error;
    }
  },
  
  // Get profile of any student by ID
  getStudentById: async (studentId: string | number): Promise<StudentProfile> => {
    try {
      console.log("Fetching student profile for ID:", studentId);
      const response = await axios.get(`${API_BASE_URL}/student/${studentId}/profile`);
      console.log("Student data received:", response.data);
      return response.data;
    } catch (error) {
      console.error("Error fetching student by ID:", error);
      throw error;
    }
  },

  // Update student profile
  updateProfile: async (profileData: Partial<StudentProfile>): Promise<StudentProfile> => {
    try {
      const storedUserId = localStorage.getItem('user_id');
      if (!storedUserId) {
        throw new Error('User ID is not set. Please login first.');
      }

      const response = await axios.put(
        `${API_BASE_URL}/student/${storedUserId}/profile`,
        profileData
      );
      console.log("Profile updated:", response.data);
      return response.data;
    } catch (error) {
      console.error("Error updating student profile:", error);
      throw error;
    }
  }
};

interface FacultyProfile {
  faculty_id: number;
  name: string;
  email: string;
  department: string;
  position: string;
}

const facultyAPI = {
  // Get profile of currently logged-in faculty
  getProfile: async (): Promise<FacultyProfile> => {
    try {
      const storedUserId = localStorage.getItem('user_id');
      console.log("Getting profile for logged-in faculty:", storedUserId);
      
      if (!storedUserId) {
        throw new Error('User ID is not set. Please login first.');
      }

      const response = await axios.get(`${API_BASE_URL}/faculty/${storedUserId}/profile`);
      console.log("Faculty profile data received:", response.data);
      return response.data;
    } catch (error) {
      console.error("Error fetching faculty profile:", error);
      throw error;
    }
  },
  
  // Get profile of any faculty by ID
  getFacultyById: async (facultyId: string | number): Promise<FacultyProfile> => {
    try {
      console.log("Fetching faculty profile for ID:", facultyId);
      const response = await axios.get(`${API_BASE_URL}/faculty/${facultyId}/profile`);
      console.log("Faculty data received:", response.data);
      return response.data;
    } catch (error) {
      console.error("Error fetching faculty by ID:", error);
      throw error;
    }
  },

  // Update faculty profile
  updateProfile: async (profileData: Partial<FacultyProfile>): Promise<FacultyProfile> => {
    try {
      const storedUserId = localStorage.getItem('user_id');
      if (!storedUserId) {
        throw new Error('User ID is not set. Please login first.');
      }

      const response = await axios.put(
        `${API_BASE_URL}/faculty/${storedUserId}/profile`,
        profileData
      );
      console.log("Profile updated:", response.data);
      return response.data;
    } catch (error) {
      console.error("Error updating faculty profile:", error);
      throw error;
    }
  }
};

// Export everything at once
export { loginUser, registerUser, companyAPI, studentAPI, facultyAPI, type StudentProfile, type FacultyProfile };
