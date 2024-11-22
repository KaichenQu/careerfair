import axios from "axios";

const API_BASE_URL = "http://localhost:8000";

interface RegisteredCompany {
  user_id: number;
  fair_id: number;
  company_name: string;
}

interface CareerFairDetail {
  career_fair: {
    fair_id: number;
    fair_name: string;
    careerfair_date: string;
    location: string;
    description: string;
  };
  register_careerfair: RegisteredCompany[];
}

export const getCareerFairs = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/careerFair/`);
    return response.data.map((fair: any) => ({
      id: fair.cf_id,
      name: fair.fair_name,
      date: fair.careerfair_date,
      location: fair.location,
      description: fair.description,
      attendees: fair.total_registered || 0,
    }));
  } catch (error) {
    console.error("Error fetching career fairs:", error);
    throw error;
  }
};

export const getCareerFairById = async (fairId: string, userId: string) => {
  try {
    const response = await axios.get(
      `${API_BASE_URL}/careerFair/${fairId}/?user_id=${userId}`
    );

    const data: CareerFairDetail = response.data;
    return {
      fair: {
        id: data.career_fair.fair_id,
        name: data.career_fair.fair_name,
        date: data.career_fair.careerfair_date,
        location: data.career_fair.location,
        description: data.career_fair.description,
      },
      registeredCompanies: data.register_careerfair.map((company) => ({
        userId: company.user_id,
        fairId: company.fair_id,
        name: company.company_name,
      })),
    };
  } catch (error) {
    console.error("Error fetching career fair details:", error);
    throw error;
  }
};

export const registerForCareerFair = async (fairId: string, userId: string) => {
  try {
    const response = await axios.post(
      `${API_BASE_URL}/careerFair/${fairId}/register/`,
      {
        user_id: userId,
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error registering for career fair:", error);
    throw error;
  }
};

export const attendCareerFair = async (fairId: string, userId: string) => {
  try {
    const response = await axios.post(
      `${API_BASE_URL}/careerFair/${fairId}/attend/`,
      {
        user_id: userId,
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error marking attendance:", error);
    throw error;
  }
};

export const getCareerFairReport = async (adminId: string, fairId: string) => {
  try {
    const response = await axios.get(
      `${API_BASE_URL}/api/admin/${adminId}/career_fair/${fairId}/report`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching career fair report:", error);
    throw error;
  }
};

export const createCareerFair = async (fairData: any) => {
  try {
    const response = await axios.post(
      `${API_BASE_URL}/api/career-fair/create/`,
      fairData
    );
    return response.data;
  } catch (error) {
    console.error("Error creating career fair:", error);
    throw error;
  }
};

export const updateCareerFair = async (fairId: string, fairData: any) => {
  try {
    const response = await axios.put(
      `${API_BASE_URL}/api/career-fair/${fairId}/update/`,
      fairData
    );
    return response.data;
  } catch (error) {
    console.error("Error updating career fair:", error);
    throw error;
  }
};

export const deleteCareerFair = async (fairId: string) => {
  try {
    const response = await axios.delete(
      `${API_BASE_URL}/api/career-fair/${fairId}/delete/`
    );
    return response.data;
  } catch (error) {
    console.error("Error deleting career fair:", error);
    throw error;
  }
};
