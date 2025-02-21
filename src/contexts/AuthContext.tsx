import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';

export interface Recipe {
  id: string;
  title: string;
  image: string;
  summary: string;
}

export interface User {
  id: number;
  name: string;
  email: string;
  token: string;
  favorites: Recipe[];
}

interface AuthContextType {
  user: User | null;
  login: (userData: User) => void;
  logout: () => void;
  addFavorite: (recipe: Recipe) => void;
  removeFavorite: (recipeId: string) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const login = (userData: User) => {
    setUser(userData);
    localStorage.setItem('user', JSON.stringify(userData));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  const addFavorite = (recipe: Recipe) => {
    if (!user) return;
    const updatedFavorites = user.favorites ? [...user.favorites, recipe] : [recipe];
    const updatedUser = { ...user, favorites: updatedFavorites };
    setUser(updatedUser);
    localStorage.setItem('user', JSON.stringify(updatedUser));
  };

  const removeFavorite = (recipeId: string) => {
    if (!user) return;
    const updatedFavorites = user.favorites ? user.favorites.filter((r) => r.id !== recipeId) : [];
    const updatedUser = { ...user, favorites: updatedFavorites };
    setUser(updatedUser);
    localStorage.setItem('user', JSON.stringify(updatedUser));
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, addFavorite, removeFavorite }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
