import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { AppContent } from "../context/AppContext";
import { toast } from "react-toastify";

const Register = () => {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { backendUrl, setIsLoggedin, getUserData } = useContext(AppContent);

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    try {
      const { data } = await axios.post(backendUrl + "/api/auth/register", {
        name,
        email,
        password,
      });

      console.log(data);

      if (data.success) {
        setIsLoggedin(true);
        await getUserData();
        toast.success(data.message);
        navigate("/email-verify");
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.log(error);
      alert(error.response?.data?.message || "Registration failed");
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
            Create Account
          </h2>
          <div className="mb-6">
            <input
              className="w-full px-4 py-3 mb-2 rounded-full bg-[#333A5C] text-white outline-none"
              placeholder="Full Name"
              onChange={(e) => setName(e.target.value)}
            />
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
            Sign Up
          </button>
          <p className="text-center text-sm mt-4 text-gray-400">
            Already have an account?{" "}
            <span
              className="text-blue-400 cursor-pointer underline"
              onClick={() => navigate("/login")}
            >
              Login here
            </span>
          </p>
        </form>
      </div>
    </>
  );
};

export default Register;
