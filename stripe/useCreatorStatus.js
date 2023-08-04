import app from "../firebase/clientApp";
import isUserCreator from "./isUserCreator";
import { useState, useEffect } from "react";

export default function useCreatorStatus(user) {
  console.log(user);
  const [isCreator, setIsCreator] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const userIsCreator = await isUserCreator();
      console.log(userIsCreator)
      setIsCreator(userIsCreator);
    };
    fetchData();
  }, [user]);

  return isCreator;
}