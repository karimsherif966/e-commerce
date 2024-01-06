import React, { createContext } from "react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

export const ForgetpasswordContext = createContext();
export default function ForgetPasswordProvider({ children }) {
  let [email, setEmail] = useState("");
  let navigate = useNavigate();
  let [loading, setLoading] = useState(false);
  let [code, setCode] = useState("");
  let [password, setPassword] = useState("");

  async function forgetPassword() {
    setLoading(true);
    try {
      let { data } = await axios.post(
        "https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords",
        { email: email }
      );
      navigate("/resetPassword");
      setLoading(false);
    } catch (err) {
      toast.error(err.response.data.message, { duration: 1000 });
    }
    setLoading(false);
  }

  async function resetPassword() {
    setLoading(true);
    try {
      let { data } = await axios.post(
        "https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode",
        { resetCode: code }
      );
      navigate("/setNewPassword");
      setLoading(false);
    } catch (err) {
      toast.error(err.response.data.message, { duration: 1000 });
    }
    setLoading(false);
  }

  async function changePassword() {
    setLoading(true);
    try {
      let res = await axios.put(
        "https://ecommerce.routemisr.com/api/v1/auth/resetPassword",
        {
          email: email,
          newPassword: password,
        }
      );
      console.log(res);
      navigate("/login");
      setLoading(false);
    } catch (err) {
      toast.error(err.response.data.message, { duration: 2000 });
    }
    setLoading(false);
  }

  return (
    <ForgetpasswordContext.Provider
      value={{
        forgetPassword,
        resetPassword,
        loading,
        setCode,
        setEmail,
        changePassword,
        setPassword,
      }}
    >
      {children}
    </ForgetpasswordContext.Provider>
  );
}
