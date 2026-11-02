import { useContext } from "react";
import { UserContext } from "../Context/UserContext";

export const useUsers = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("no user provider!");
  }
  return context;
};