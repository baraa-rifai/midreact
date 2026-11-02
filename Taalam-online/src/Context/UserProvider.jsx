import { useState } from "react";
import toast from "react-hot-toast";
import { UserContext } from "./UserContext";

export const UserProvider = ({ children }) => {
  const [allUsers, setAllUsers] = useState(
    JSON.parse(localStorage.getItem("users")) || []
  );

  const getUsers = () => {
    try {
      const storedUsers = JSON.parse(localStorage.getItem("users")) || [];
      setAllUsers(storedUsers);
    } catch (error) {
      toast.error(error);
      console.log(error);
    }
  };

  const deleteUser = (id) => {
    try {
      const updatedUsers = allUsers.filter((user) => user.id !== id);
      setAllUsers(updatedUsers);
      localStorage.setItem("users", JSON.stringify(updatedUsers));
      toast.success("user deleted successfully");
    } catch (error) {
      toast.error(error);
      console.log(error);
    }
  };

  const updateUserRole = (id, newRole) => {
    try {
      const updatedUsers = allUsers.map((user) =>
        user.id === id ? { ...user, role: newRole } : user
      );
      setAllUsers(updatedUsers);
      localStorage.setItem("users", JSON.stringify(updatedUsers));
      toast.success("user role updated successfully");
    } catch (error) {
      toast.error(error);
      console.log(error);
    }
  };

  return (
    <UserContext.Provider
      value={{
        allUsers,
        getUsers,
        deleteUser,
        updateUserRole,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};