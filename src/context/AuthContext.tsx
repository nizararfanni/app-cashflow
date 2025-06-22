import { createContext, useState, useContext } from "react";

type User = {
  username: string;
  email?: string;
  id?: number;
};

type AuthContextType = {
  user: User | null;
  accessToken: string | null;
  login: (data: { user: User; accessToken: string }) => void;
  logOut: () => void;
};

const AuthContext = createContext<AuthContextType | null>(null);

type AuthProviderProps = {
  children: React.ReactNode;
};

export const AuthContextProvider: React.FC<AuthProviderProps> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [accessToken, setAccessToken] = useState<string | null>(null);

  const login = (data: { user: User; accessToken: string }) => {
    setUser(data.user);
    setAccessToken(data.accessToken);
  };

  const logOut = () => {
    setUser(null);
    setAccessToken(null);
  };

  return (
    <AuthContext.Provider value={{ user, accessToken, login, logOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
};
