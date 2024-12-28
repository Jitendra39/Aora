import { createContext, useContext, useEffect, useState } from "react";
import { getCurrentUser } from "../lib/appwrite";
import { AppwriteException } from "react-native-appwrite";

const GlobalContext = createContext();

export const useGlobalContext = () => useContext(GlobalContext);
export const GlobalProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
  
    getCurrentUser()
      .then((res) => {
        if (res) {
          setIsLoggedIn(true);
          setUser(res);
        } else {
          setIsLoggedIn(false);
          setUser(null);
        }
      })
      .catch((err) => {
        if (err instanceof AppwriteException && err.code === 401) {
          setIsLoggedIn(false);
          setUser(null);
        } else {
          console.log(err);
        }
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  return (
    <GlobalContext.Provider
      value={{
        isLoading,
        isLoggedIn,
        setIsLoading,
        user,
        setUser,
        setIsLoading,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export default GlobalProvider;
