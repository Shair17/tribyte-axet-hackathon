import { createContext, useContext, useState, ReactNode } from 'react';

export type UserRole = 'administrator' | 'leader' | 'collaborator';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  department?: string;
  teamMembers?: string[]; // For leaders
  vacationDays: {
    total: number;
    consumed: number;
    remaining: number;
    accumulationStartDate: string;
    suggestedConsumptionWindow: string;
  };
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string, role: UserRole) => void;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Mock user data for different roles
const mockUsers: Record<UserRole, User> = {
  administrator: {
    id: 'admin-001',
    name: 'Admin User',
    email: 'admin@company.com',
    role: 'administrator',
    department: 'Administration',
    vacationDays: {
      total: 30,
      consumed: 12,
      remaining: 18,
      accumulationStartDate: '2024-01-01',
      suggestedConsumptionWindow: 'Before Dec 31, 2025'
    }
  },
  leader: {
    id: 'leader-001',
    name: 'Sarah Johnson',
    email: 'sarah.j@company.com',
    role: 'leader',
    department: 'Engineering',
    teamMembers: ['emp-001', 'emp-002', 'emp-003', 'emp-004', 'emp-005', 'emp-006'],
    vacationDays: {
      total: 28,
      consumed: 8,
      remaining: 20,
      accumulationStartDate: '2024-01-15',
      suggestedConsumptionWindow: 'Before Dec 31, 2025'
    }
  },
  collaborator: {
    id: 'collab-001',
    name: 'Michael Chen',
    email: 'michael.c@company.com',
    role: 'collaborator',
    department: 'Engineering',
    vacationDays: {
      total: 25,
      consumed: 15,
      remaining: 10,
      accumulationStartDate: '2024-03-01',
      suggestedConsumptionWindow: 'Before Nov 30, 2025'
    }
  }
};

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  const login = (email: string, password: string, role: UserRole) => {
    // Mock login - in real app, this would be an API call
    const mockUser = mockUsers[role];
    setUser(mockUser);
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{
      user,
      login,
      logout,
      isAuthenticated: !!user
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
