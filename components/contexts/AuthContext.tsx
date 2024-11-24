import { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { loginUser } from '@/services/api';

interface AuthState {
  user: {
    id: number;
    email: string;
    userType: string;
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
      const savedUser = localStorage.getItem('user');
      const savedIsAuth = localStorage.getItem('isAuthenticated');
      const userId = localStorage.getItem('user_id');
      
      // If we have a userId but no user object, reconstruct it
      if (userId && !savedUser) {
        const reconstructedUser = {
          id: parseInt(userId),
          email: localStorage.getItem('email') || '',
          userType: localStorage.getItem('userType') || ''
        };
        localStorage.setItem('user', JSON.stringify(reconstructedUser));
        return {
          user: reconstructedUser,
          isAuthenticated: true
        };
      }
      
      return {
        user: savedUser ? JSON.parse(savedUser) : null,
        isAuthenticated: savedIsAuth === 'true'
      };
    } catch (error) {
      console.error('Error reading from localStorage:', error);
      return { user: null, isAuthenticated: false };
    }
  });

  const handleLogin = async (credentials: { email: string; password: string; userType: string }) => {
    try {
      const authResponse = await loginUser(credentials);
      console.log('Login response:', authResponse);
      
      const userData = {
        id: parseInt(authResponse.user_id),
        email: credentials.email,
        userType: credentials.userType
      };
      
      // Store all necessary data in localStorage
      localStorage.setItem('user', JSON.stringify(userData));
      localStorage.setItem('isAuthenticated', 'true');
      localStorage.setItem('user_id', authResponse.user_id.toString());
      localStorage.setItem('email', credentials.email);
      localStorage.setItem('userType', credentials.userType);
      
      // Update state
      const newState = { user: userData, isAuthenticated: true };
      setAuthState(newState);
      
      console.log('Login successful, new auth state:', newState);
      return { success: true };
    } catch (error) {
      console.error('Login error:', error);
      return { success: false, error: error instanceof Error ? error.message : 'Login failed' };
    }
  };

  const handleLogout = () => {
    // Clear all auth-related items from localStorage
    localStorage.removeItem('user');
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('user_id');
    localStorage.removeItem('email');
    localStorage.removeItem('userType');
    
    // Reset state
    setAuthState({ user: null, isAuthenticated: false });
    
    console.log('Logged out, auth state cleared');
    router.push('/login');
  };

  // Add persistence check on mount
  useEffect(() => {
    const checkPersistence = () => {
      const savedUser = localStorage.getItem('user');
      const savedIsAuth = localStorage.getItem('isAuthenticated');
      
      console.log('Checking persistence:', {
        savedUser: savedUser ? JSON.parse(savedUser) : null,
        isAuthenticated: savedIsAuth === 'true'
      });
      
      if (savedIsAuth === 'true' && savedUser) {
        setAuthState({
          user: JSON.parse(savedUser),
          isAuthenticated: true
        });
      }
    };
    
    checkPersistence();
  }, []);

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
