import React, { createContext, useContext, useState, ReactNode, useEffect } from "react";
import { getCurrentUser } from "./appwrite";
import { useAppwrite } from "./useAppwrite";
import { Redirect } from "expo-router";

interface User {
  $id: string;
  name: string;
  email: string;
  avatar: string;
}

interface GlobalContextType {
  isLogged: boolean;  // Is the user logged in?
  user: User | null;  // Stores user info (null if not logged in)
  loading: boolean;   // Is user data still loading?
  setUser: (user: User | null) => void;     // Function to update user state
  setIsLogged: (value: boolean) => void;    // Function to update login status
  refetch: (newParms?: Record<string, string | number>) => Promise<void>;   // Function to reload user data
}

const GlobalContext = createContext<GlobalContextType | undefined>(undefined);

interface GlobalProviderProps {
  children: ReactNode;
}

export const GlobalProvider = ({ children }: GlobalProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLogged, setIsLogged] = useState(false);

  const {
    data: currentUser,
    loading,
    refetch,
  } = useAppwrite({
    fn: getCurrentUser,
  });

  useEffect(() => {
    if (currentUser) {
      setUser(currentUser);
      setIsLogged(true);
    } else {
      setUser(null);
      setIsLogged(false);
    }
  }, [currentUser]);

  console.log("User Data:", JSON.stringify(user, null, 2));

  return (
    <GlobalContext.Provider
      value={{
        isLogged,
        user,
        loading,
        setUser,
        setIsLogged,
        refetch,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = (): GlobalContextType => {
  const context = useContext(GlobalContext);
  if (!context) {
    throw new Error("useGlobalContext must be used within a GlobalProvider");
  }
  return context;
};

export default GlobalProvider;
