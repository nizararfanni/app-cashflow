import { createContext, useState, useContext } from "react";

// 1. Definisikan tipe data user (kalau user lebih kompleks, sesuaikan)
type User = {
  username: string;
  email?: string;
  id?: number;
};

// 2. Definisikan tipe context
type AuthContextType = {
  user: User | null;
  accessToken: string | null;
  login: (data: { user: User; accessToken: string }) => void;
  logOut: () => void;
};

// 3. Buat context dengan default null dan cast ke AuthContextType
const AuthContext = createContext<AuthContextType | null>(null);

// 4. Tipe props provider
type AuthProviderProps = {
  children: React.ReactNode;
};

// 5. Buat provider
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

// 6. Custom hook buat konsumsi context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
};
