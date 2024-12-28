import { useEffect, useState } from "react";
import { getAllPosts } from "./appwrite";
import { Alert } from "react-native";

const useAppwrite = (fn) => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
 
  const fetchData = async () => {
    setIsLoading(true);
    try {
      const response = await fn();
      console.log("Fetched Data:", response); // Debugging
      setData(response || []); // Ensure data is an array
    } catch (err) {
      console.log("errorrs", err)
      Alert.alert("Error", err.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
      fetchData();
  }, []);

  const refresh = () => fetchData();
  return { data, isLoading, refresh };
}

export default useAppwrite;