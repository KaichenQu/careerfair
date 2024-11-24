import { createContext, useContext, useState, ReactNode, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { loginUser } from '@/services/api';
import axios from 'axios';

const BaseURL = "http://127.0.0.1:8000";

interface AuthState {
  user: {
    id: number;
    userType?: string;
  } | null;
  isAuthenticated: boolean;
}

const AuthContext = createContext<{
  user: AuthState['user'];
  isAuthenticated: boolean;
  handleLogin: (credentials: { email: string; password: string; userType: string }) => Promise<{ success: boolean; error?: string }>;
  handleLogout: () => void;
}>({
  user: null,
  isAuthenticated: false,
  handleLogin: async () => ({ success: false }),
  handleLogout: () => {},
});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const router = useRouter();
  
  // Initialize state from localStorage
  const [authState, setAuthState] = useState<AuthState>(() => {
    if (typeof window === 'undefined') return { user: null, isAuthenticated: false };
    
    try {
      const userId = localStorage.getItem('user_id');
      const userType = localStorage.getItem('userType');
      console.log('Initializing auth state:', { userId, userType });
      
      if (userId) {
        return {
          user: { 
            id: parseInt(userId),
            userType: userType || undefined 
          },
          isAuthenticated: true
        };
      }
      
      return { user: null, isAuthenticated: false };
    } catch (error) {
      console.error('Error reading from localStorage:', error);
      return { user: null, isAuthenticated: false };
    }
  });

  // Add useEffect to fetch user profile when we have a user_id
  useEffect(() => {
    const fetchUserProfile = async () => {
      const userId = localStorage.getItem('user_id');
      const userType = localStorage.getItem('userType');
      
      console.log('Fetching user profile:', { userId, userType });
      
      if (!userId || !authState.isAuthenticated || !userType) {
        console.log('Missing required data for profile fetch');
        return;
      }

      try {
        let response;
        // Use switch for better error handling
        switch(userType) {
          case 'student':
            console.log('Fetching student profile...');
            response = await axios.get(`${BaseURL}/student/${userId}/profile`);
            break;
          case 'company':
            console.log('Fetching company profile...');
            response = await axios.get(`${BaseURL}/company/${userId}/profile`);
            break;
          case 'faculty':
            console.log('Fetching faculty profile...');
            response = await axios.get(`${BaseURL}/faculty/${userId}/profile`);
            break;
          default:
            console.error('Unknown user type:', userType);
            return;
        }

        if (response && response.data) {
          console.log('Profile data received:', response.data);
          setAuthState(prev => ({
            ...prev,
            user: {
              ...prev.user,
              ...response.data
            }
          }));
        }
      } catch (error) {
        if (axios.isAxiosError(error)) {
          console.error('Profile fetch error:', {
            status: error.response?.status,
            data: error.response?.data,
            url: error.config?.url,
            method: error.config?.method
          });
          
          // If unauthorized or not found, clear auth state
          if (error.response?.status === 401 || error.response?.status === 404) {
            console.log('Invalid session, clearing auth state');
            localStorage.removeItem('user_id');
            localStorage.removeItem('userType');
            setAuthState({ user: null, isAuthenticated: false });
            router.push('/login');
          }
        } else {
          console.error('Non-Axios error fetching profile:', error);
        }
      }
    };

    fetchUserProfile();
  }, [authState.isAuthenticated, router]);

  const handleLogin = async (credentials: { email: string; password: string; userType: string }) => {
    try {
      const authResponse = await loginUser(credentials);
      console.log('Login response:', authResponse);
      
      // Store userType along with user_id
      const userId = localStorage.getItem('user_id');
      if (!userId) {
        throw new Error('No user ID found after login');
      }

      // Store the userType from credentials
      localStorage.setItem('userType', credentials.userType);
      
      const newState = { 
        user: { 
          id: parseInt(userId),
          userType: credentials.userType  // Include userType in state
        },
        isAuthenticated: true 
      };
      setAuthState(newState);
      
      console.log('Login successful, new auth state:', newState);
      return { success: true };
    } catch (error) {
      console.error('Login error:', error);
      return { success: false, error: error instanceof Error ? error.message : 'Login failed' };
    }
  };

  const handleLogout = useCallback(() => {
    // Clear only what your app sets
    localStorage.removeItem('user_id');
    setAuthState({ user: null, isAuthenticated: false });
    console.log('Logged out, auth state cleared');
    router.push('/login');
  }, [router]);

  return (
    <AuthContext.Provider value={{
      user: authState.user,
      isAuthenticated: authState.isAuthenticated,
      handleLogin,
      handleLogout
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext); 
