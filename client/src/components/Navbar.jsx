import { useContext, useState } from "react";
import { assets } from "../assets/assets";
import { useNavigate } from "react-router-dom";
import { AppContent } from "../context/AppContext";
import axios from "axios";
import { toast } from "react-toastify";

const Navbar = () => {
  const navigate = useNavigate();
  const [showMenu, setShowMenu] = useState(false);
  const { userData, backendUrl, setUserData, setIsLoggedin } =
    useContext(AppContent);

  const sendVerificationOtp = async () => {
    try {
      const { data } = await axios.post(
        backendUrl + "/api/auth/send-verify-otp",
      );

      if (data.success) {
        navigate("/email-verify");
        toast.success(data.message);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const logout = async () => {
    try {
      const { data } = await axios.post(backendUrl + "/api/auth/logout");

      if (data.success) {
        localStorage.removeItem("token");
        delete axios.defaults.headers.common["Authorization"];

        setIsLoggedin(false);
        setUserData(false);

        navigate("/");
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div
      className="w-full flex justify-between items-center 
                 p-4 sm:p-6 sm:px-24 absolute top-0"
    >
      <img src={assets.logo} alt="" className="w-28 sm:w-32" />

      {userData ? (
        <div
          onClick={() => setShowMenu(!showMenu)}
          className="w-8 h-8 flex justify-center items-center rounded-full bg-black text-white relative cursor-pointer"
        >
          {userData.name[0].toUpperCase()}
          <div
            className={`absolute top-10 right-0 z-10 text-black rounded ${
              showMenu ? "block" : "hidden"
            }`}
          >
            <ul className="list-none m-0 p-2 bg-gray-100 text-sm">
              <li className="font-semibold">{userData.name}</li>
              <li className="font-small text-gray-800">{userData.email}</li>

              <li
                onClick={logout}
                className="hover:bg-gray-100 cursor-pointer pr-10 text-red-500 py-2"
              >
                Logout
              </li>
            </ul>
          </div>
        </div>
      ) : (
        <div className="flex gap-4">
          <button
            onClick={() => navigate("/login")}
            className="flex items-center gap-2 border border-gray-500 
      rounded-full px-6 py-2 text-gray-800 hover:bg-gray-100 transition-all"
          >
            Login
          </button>
          <button
            onClick={() => navigate("/register")}
            className="flex items-center gap-2 border border-gray-500 
      rounded-full px-6 py-2 text-gray-800 hover:bg-gray-100 transition-all"
          >
            Register
          </button>
        </div>
      )}
    </div>
  );
};

export default Navbar;
