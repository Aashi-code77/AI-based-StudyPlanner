import {
  useState,
  useEffect,
  createContext,
  useContext,
  ReactNode
} from 'react';

// Types
interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  onboarded: boolean;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
}

// Mock user data for demonstration
const mockUser: User = {
  id: '1',
  name: 'John Doe',
  email: 'john@example.com',
  avatar: 'https://i.pravatar.cc/150?img=8',
  onboarded: true
};

// Create context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Simulated delay
const simulateNetwork = (ms: number) => new Promise((res) => setTimeout(res, ms));

// Provider component
export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = () => {
      try {
        const saved = localStorage.getItem('noteplan_user');
        if (saved) {
          const parsed: User = JSON.parse(saved);
          setUser(parsed);
        }
      } catch (error) {
        console.error('Failed to parse user from localStorage', error);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  const login = async (email: string, password: string) => {
    setLoading(true);
    try {
      await simulateNetwork(1000);

      if (email === 'demo@example.com' && password === 'password') {
        setUser(mockUser);
        localStorage.setItem('noteplan_user', JSON.stringify(mockUser));
      } else {
        throw new Error('Invalid credentials');
      }
    } finally {
      setLoading(false);
    }
  };

  const register = async (name: string, email: string, password: string) => {
    setLoading(true);
    try {
      await simulateNetwork(1000);

      const newUser: User = {
        ...mockUser,
        name,
        email,
        onboarded: false
      };

      setUser(newUser);
      localStorage.setItem('noteplan_user', JSON.stringify(newUser));
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('noteplan_user');
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Hook for using auth context
export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
