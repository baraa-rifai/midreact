import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "./AuthContext";

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState(
    JSON.parse(localStorage.getItem("currentUser")) || null
  );
  const [users, setUsers] = useState(
    JSON.parse(localStorage.getItem("users")) || []
  );

  const getAllUsers = async () => {
    try {
      const users = JSON.parse(localStorage.getItem("users"));
      setUsers(users || []);
    } catch (error) {
      toast.error(error.message || "Error fetching users");
      console.log(error);
      return;
    }
  };

  const register = async (data) => {
    try {
      if (
        !data.name ||
        !data.email ||
        !data.password ||
        !data.confirmPassword
      ) {
        toast.error("Please fill all fields!");
        return;
      }
      if (data.name.length < 3) {
        toast.error("please enter a valid name");
        return;
      }
      const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      if (!emailRegex.test(data.email)) {
        toast.error("please enter a valid email");
        return;
      }
      const isExist = users.find((user) => user.email === data.email);
      if (isExist) {
        toast.error("you already have account!");
        return;
      }
      const passwordRgex =
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
      if (!passwordRgex.test(data.password)) {
        toast.error(
          "password must contain at least one uppercase, one lowercase, one symbol, one number, and minim 8 chareters length"
        );
        return;
      }
      if (data.password !== data.confirmPassword) {
        toast.error("passwords dont match!");
        return;
      }

      const newUser = {
        name: data.name,
        email: data.email,
        password: data.password,
        id: Date.now(),
        role: data.role || "student",
      };

      const newUsers = [...users, newUser];
      localStorage.setItem("users", JSON.stringify(newUsers));
      setUsers(newUsers);
      toast.success("registered successfully, please login to continue");
      navigate("/login");
    } catch (error) {
      toast.error(error.message || "Registration failed");
      console.log(error);
      return;
    }
  };

  const login = async (email, password) => {
    try {
      if (!email || !password) {
        toast.error("please fill all fields!");
        return;
      }

      if (email === "admin@taalam.com" && password === "Admin@1234") {
        const adminUser = {
          id: "admin-1",
          name: "System Admin",
          email: email,
          role: "admin",
        };
        setCurrentUser(adminUser);
        localStorage.setItem("currentUser", JSON.stringify(adminUser));
        toast.success("login successfully as Admin");
        navigate("/admin/dashboard");
        return;
      }

      const isExsit = users.find((user) => user.email === email);
      if (!isExsit) {
        toast.error("you dont have an account!");
        return;
      }

      if (isExsit.password !== password) {
        toast.error("password is not correct");
        return;
      }

      setCurrentUser(isExsit);
      localStorage.setItem("currentUser", JSON.stringify(isExsit));
      toast.success("login successfully");

      if (isExsit.role === "admin") {
        navigate("/admin/dashboard");
      } else if (isExsit.role === "instructor") {
        navigate("/instructor/dashboard");
      } else {
        navigate("/home");
      }
    } catch (error) {
      toast.error(error.message || "Login failed");
      console.log(error);
      return;
    }
  };

  const logout = async () => {
    try {
      localStorage.removeItem("currentUser");
      setCurrentUser(null);
      toast.success("logout successfully");
      navigate("/login");
    } catch (error) {
      toast.error(error.message || "Logout failed");
      console.log(error);
      return;
    }
  };

  return (
    <AuthContext.Provider
      value={{
        users,
        currentUser,
        login,
        logout,
        register,
        getAllUsers,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};