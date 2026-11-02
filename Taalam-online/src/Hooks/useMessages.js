import { useContext } from "react";
import { MessageContext } from "../Context/MessageContext";

export const useMessages = () => {
  return useContext(MessageContext);
};