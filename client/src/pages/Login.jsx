import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { AppContent } from "../context/AppContext";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { backendUrl, setIsLoggedin, getUserData } = useContext(AppContent);

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    try {
      const { data } = await axios.post(backendUrl + "/api/auth/login", {
        email,
        password,
      });

      console.log(data);

      if (data.success) {
        localStorage.setItem("token", data.token);
        alert(data.message);
        setIsLoggedin(true);
        await getUserData();

        navigate("/");
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.log(error);
      alert(error.response?.data?.message || "Login failed");
    }
  };

  return (
    <>
      <div className="min-h-screen flex items-center justify-center px-6 bg-gradient-to-br from-blue-200 to-purple-400">
        <form
          onSubmit={onSubmitHandler}
          className="bg-slate-900 p-10 rounded-lg shadow-lg w-full sm:w-96"
        >
          <h2 className="text-3xl font-semibold text-white text-center mb-6">
            Login
          </h2>
          <div className="mb-6">
            <input
              className="w-full px-4 py-3 mb-2 rounded-full bg-[#333A5C] text-white outline-none"
              placeholder="Email"
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              className="w-full px-4 py-3 mb-2 rounded-full bg-[#333A5C] text-white outline-none"
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button
            type="submit"
            className="w-full py-3 rounded-full bg-gradient-to-r from-indigo-500 to-indigo-900 text-white font-medium"
          >
            Login
          </button>

          <p
            className="text-blue-400 cursor-pointer underline py-3 mt-4"
            onClick={() => navigate("/reset-password")}
          >
            Forget Password?
          </p>

          <p className="text-center text-sm mt-4 text-gray-400">
            New User?{" "}
            <span
              className="text-blue-400 cursor-pointer underline"
              onClick={() => navigate("/register")}
            >
              Sign Up
            </span>
          </p>
        </form>
      </div>
    </>
  );
};

export default Login;
