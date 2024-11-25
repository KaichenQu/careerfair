import { SystemSecurityUpdate } from "@mui/icons-material";
import axios, { AxiosError } from "axios";

const API_BASE_URL = "http://localhost:8000"; // Django backend URL
let user_getID: string | number = '';

// Initialize user_getID if we're in the browser
if (typeof window !== 'undefined') {
  user_getID = localStorage.getItem('user_id') || '';
}

export interface AuthResponse {
  user_id: string;
  redirect_url?: string;
  isAuthenticated: boolean;
  userType: string;
}

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
    // if (response.data.user_id) {
    //   const userData = {
    //     id: parseInt(response.data.user_id),
    //     email: credentials.email,
    //     userType: credentials.userType
    //   };
      
    //   // Store auth data
    //   storeUserAuth(userData);
    //   console.log('Storing user data:', userData);
    // }
    
    if (!response.data.user_id) {
      throw new Error('No user_id received from server');
    }

    // const authResponse: AuthResponse = {
    //   user_id: response.data.user_id,
    //   redirect_url: response.data.redirect_url,
    //   isAuthenticated: true,
    //   userType: credentials.userType
    // };
    
    
    localStorage.setItem('user_id', response.data.user_id);
    localStorage.setItem('userType', credentials.userType);
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
  id: number;
  name: string;
  email: string;
  industry: string;
  contact_name: string;
  contact_phone: string;
  contact_email: string | null;
  location: string;
  profile: string;
}

export type Position = {
  position_id: string;
  position_name: string;
  salary: number;
  location: string;
  description: string;
  company_id: string;
  ng_flag: boolean;
  intern_flag: boolean;
  sponsor_flag: boolean;
};

interface CareerFair {
  fair_id: number;
  fair_name: string;
  careerfair_date: string;
  location: string;
  description: string;
  admin_id: number;
}

interface CompanyDashboardData {
  published_positions: Position[];
  registered_fairs: CareerFair[];
  attended_fairs: CareerFair[];
}

interface EditPositionData {
  position_name?: string;
  salary?: number;
  location?: string;
  description?: string;
  ng_flag?: boolean;
  intern_flag?: boolean;
  sponsor_flag?: boolean;
}

interface CreatePositionData {
  position_name: string;
  salary: number;
  location: string;
  description: string;
  ng_flag: number;
  intern_flag: number;
  sponsor_flag: number;
}

const companyAPI = {
  // Get profile of currently logged-in company
  getProfile: async (): Promise<CompanyProfile> => {
    try {
      console.log('Fetching company profile...'); // Debug log
      const response = await axios.get(`${API_BASE_URL}/company/profile`);
      console.log('Profile API response:', response.data); // Debug log
      return response.data;
    } catch (error) {
      console.error('Error in getProfile:', error);
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
  updateProfile: async (companyId: number, data: CompanyProfile) => {
    const response = await fetch(`${API_BASE_URL}/company/${companyId}/profile`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data)
    });

    if (!response.ok) {
      throw new Error('Failed to update profile');
    }

    return await response.json();
  },

  // Get dashboard data
  getDashboard: async (userId: string | number): Promise<CompanyDashboardData> => {
    try {
      console.log('Fetching dashboard for user ID:', userId);
      const response = await axios.get(`${API_BASE_URL}/company/${userId}/dashboard`);
      console.log('Dashboard data received:', response.data);
      return response.data;
    } catch (error) {
      console.error('Error fetching dashboard:', error);
      throw error;
    }
  },

  updatePosition: async (companyId: number, positionId: number, positionData: EditPositionData) => {
    try {
      const response = await axios.patch(
        `${API_BASE_URL}/company/${companyId}/position/${positionId}`,
        positionData,
        {
          headers: {
            'Content-Type': 'application/json'
          }
        }
      );
      
      return response.data;
    } catch (error) {
      console.error('API Error:', error);
      throw new Error('Failed to update position');
    }
  },

  createPosition: async (companyId: number, positionData: CreatePositionData) => {
    try {
      console.log('Making request to:', `${API_BASE_URL}/company/${companyId}/position`);
      console.log('Request payload:', {
        ...positionData,
        company_id: companyId
      });

      const response = await axios.post(
        `${API_BASE_URL}/company/${companyId}/position`,
        {
          ...positionData,
          company_id: companyId
        },
        {
          headers: {
            'Content-Type': 'application/json'
          }
        }
      );
      
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error('API Error Details:', {
          status: error.response?.status,
          data: error.response?.data,
          message: error.message
        });
        throw new Error(`API Error: ${error.response?.status} - ${error.message}`);
      }
      throw error;
    }
  },
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

export interface AppliedPosition {
  position_id: number;
  submission_time: string;
  company_name: string;
  position_name: string;
  position_description: string;
}

export interface DashboardData {
  applied_positions: AppliedPosition[];
}

// First, define the type for the API response
interface AppliedPositionsResponse {
  applied_positions: AppliedPosition[];
}

interface StudentCareerFair {
  fair_id: number;
  fair_name: string;
  careerfair_date: string;
  location: string;
  description: string;
  admin: number;  // Changed from admin_id to admin
}

interface CareerFair_Student {
  registered_fairs: StudentCareerFair[];
  attended_fairs: StudentCareerFair[];
}

export const studentAPI = {
  getProfile: async (userId: number) => {
    const url = `${API_BASE_URL}/student/${userId}/profile`;
    console.log('Calling API URL:', url);
    console.log('With userId:', userId);
    const response = await axios.get(url);
    return response.data;
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
  updateProfile: async (studentId: number, updates: Partial<StudentProfile>) => {
    const response = await fetch(`${API_BASE_URL}/student/${studentId}/profile`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updates),
    });
    
    if (!response.ok) throw new Error('Failed to update profile');
    const data = await response.json();
    window.location.reload();
    return data;
  },

  getDashboard: async (studentId: number): Promise<DashboardData> => {
    try {
      const response = await axios.get(`${API_BASE_URL}/student/${studentId}/dashboard`);
      return response.data;
    } catch (error) {
      console.error('Error fetching dashboard:', error);
      throw new Error('Failed to fetch student dashboard');
    }
  },

  getCareerFair: async (studentId: number): Promise<CareerFair_Student> => {
    try {
      const response = await axios.get(`${API_BASE_URL}/student/${studentId}/dashboard`);
      console.log('Student dashboard data:', response.data);
      return response.data;
    } catch (error) {
      console.error('Error fetching dashboard:', error);
      throw new Error('Failed to fetch student dashboard');
    }
  },

  getAppliedPositions: async (studentId: number): Promise<AppliedPosition[]> => {
    const response = await fetch(`${API_BASE_URL}/student/${studentId}/dashboard/appliedPositions`);
    if (!response.ok) throw new Error('Failed to fetch applied positions');
    const data: AppliedPositionsResponse = await response.json();
    return data.applied_positions;
  },

  cancelRegisterCareerFair: async (fairId: number, userId: number) => {
    const response = await fetch(`http://127.0.0.1:8000/careerFair/${fairId}/cancelRegister/`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ user_id: userId }),
    });
    
    if (!response.ok) {
      throw new Error('Failed to withdraw from career fair');
    }
    
    return await response.json();
  },

  attendCareerFair: async (fairId: number, userId: number) => {
    console.log('Attending career fair with fairId:', fairId, 'and userId:', userId);
    const response = await fetch(`${API_BASE_URL}/careerFair/${fairId}/attend/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ user_id: userId }),
    });
    return response.json();
  },
};
interface FacultyProfile {
  faculty_id: number;
  name: string;
  email: string;
  department: string;
}

interface FacultyCareerFair {
  fair_id: number;
  fair_name: string;
  careerfair_date: string;
  location: string;
  description: string;
  admin_id: number;
}

interface FacultyDashboardData {
  registered_fairs: FacultyCareerFair[];
  attended_fairs: FacultyCareerFair[];
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
  updateProfile: async (userId: string, data: {
    name?: string;
    email?: string;
    department?: string;
  }): Promise<void> => {
    const response = await fetch(`http://127.0.0.1:8000/faculty/${userId}/profile`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        // Add authorization header if needed
        // 'Authorization': `Bearer ${localStorage.getItem('token')}`,
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => null);
      throw new Error(errorData?.message || 'Failed to update profile');
    }
  },

  // Get dashboard data
  getDashboard: async (facultyId: string | number): Promise<FacultyDashboardData> => {
    try {
      console.log("Fetching dashboard data for faculty ID:", facultyId);
      const response = await axios.get(`${API_BASE_URL}/faculty/${facultyId}/dashboard`);
      console.log("Dashboard data received:", response.data);
      return response.data;
    } catch (error) {
      console.error("Error fetching faculty dashboard:", error);
      throw error;
    }
  },

  attendCareerFair: async (fairId: number, userId: string) => {
    const response = await fetch(`http://127.0.0.1:8000/careerFair/${fairId}/attend/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ user_id: userId }),
    });
    
    if (!response.ok) {
      throw new Error('Failed to mark attendance');
    }
    
    return response.json();
  },
};

// Add this new utility function
const storeUserAuth = (userData: { id: number; email: string; userType: string }) => {
  console.log('Storing user data:', userData);
  localStorage.setItem('user', JSON.stringify(userData));
  localStorage.setItem('isAuthenticated', 'true');
  
  // Dispatch a custom event when auth state changes
  window.dispatchEvent(new Event('auth-state-changed'));
  
  console.log('LocalStorage after storage:', {
    user: window.localStorage.getItem('user'),
    isAuthenticated: window.localStorage.getItem('isAuthenticated')
  });
};

// Add this interface for the registration data
interface RegisterData {
  user_type: string;
  full_name: string;
  email: string;
  password: string;
}

interface RegisterResponse {
  user_id: number;
  message: string;
}

// Add this to your API service
const registerUser = async (userData: RegisterData): Promise<RegisterResponse> => {
  console.log('Registering user with data:', userData);
  
  const response = await fetch('http://127.0.0.1:8000/register/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(userData),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    console.error('Registration failed:', errorData);
    throw new Error(errorData.message || 'Registration failed');
  }

  const data = await response.json();
  console.log('Registration successful:', data);
  return data;
};

// Export everything at once
export { loginUser, registerUser, companyAPI, facultyAPI, type StudentProfile, type FacultyProfile, type FacultyCareerFair, type FacultyDashboardData, type CompanyDashboardData, storeUserAuth };

