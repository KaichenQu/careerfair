import { createContext, useContext, ReactNode, useState, useEffect, useRef, useMemo, useCallback } from 'react';
import axios from 'axios';
import { loginUser } from '@/services/api';
import { useRouter } from 'next/navigation';

let BaseURL = "http://127.0.0.1:8000";

interface User {
  id?: number;
  email: string;
  userType: string;
  // Add other user properties as needed
}

interface AuthContextType {
  user: any;
  isAuthenticated: boolean;
  login: (credentials: { email: string; password: string; userType: string }) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType>({
  user: null,
  isAuthenticated: false,
  login: async () => ({ success: false }),
  logout: () => {}
});
// export const AuthContext = createContext<AuthContextType | undefined>(undefined);
export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const router = useRouter();
  const initialized = useRef(false);

  // Initialize state with a more robust check
  const initializeAuthState = () => {
    if (typeof window === 'undefined') return { user: null, isAuthenticated: false };
    
    try {
      const storedUser = localStorage.getItem('user');
      const storedAuth = localStorage.getItem('isAuthenticated');
      
      if (storedUser && storedAuth === 'true') {
        const parsedUser = JSON.parse(storedUser);
        return {
          user: parsedUser,
          isAuthenticated: true
        };
      }
    } catch (error) {
      console.error('Error initializing auth state:', error);
      localStorage.removeItem('user');
      localStorage.removeItem('isAuthenticated');
    }
    
    return { user: null, isAuthenticated: false };
  };

  const [authState, setAuthState] = useState(initializeAuthState);

  // Modify the useEffect to be more robust
  useEffect(() => {
    if (!initialized.current) {
      initialized.current = true;
      const state = initializeAuthState();
      if (state.isAuthenticated && state.user) {
        setAuthState(state);
        console.log('Auth state initialized with:', state);
      }
    }
  }, []);

  const handleLogin = async (credentials: { email: string; password: string; userType: string }) => {
    try {
      const authResponse = await loginUser(credentials);
      const userData = {
        id: parseInt(authResponse.user_id),
        email: credentials.email,
        userType: credentials.userType
      };
      
      // Update state and localStorage atomically
      const newState = { user: userData, isAuthenticated: true };
      setAuthState(newState);
      localStorage.setItem('user', JSON.stringify(userData));
      localStorage.setItem('isAuthenticated', 'true');
      
      console.log('Login successful, new auth state:', newState);
      
      if (authResponse.redirect_url) {
        const path = `/student/${authResponse.user_id}`;
        router.push(path);
      }
      
      return { success: true };
    } catch (error) {
      console.error('Login error:', error);
      return { success: false, error: error instanceof Error ? error.message : 'Login failed' };
    }
  };

  const handleLogout = useCallback(() => {
    setAuthState({ user: null, isAuthenticated: false });
    localStorage.removeItem('user');
    localStorage.removeItem('isAuthenticated');
    router.push('/');
  }, [router]);

  // Add a loading state check
  const value = useMemo(() => ({
    user: authState.user,
    isAuthenticated: authState.isAuthenticated,
    login: handleLogin,
    logout: handleLogout,
    initialized: initialized.current
  }), [authState, handleLogout]);

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext); 