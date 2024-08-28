import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import LoadingIcon from "./loadingIcon.svg";

const SignInPage = () => {
  const navigate = useNavigate();

  const apiUrl = process.env.REACT_APP_API_URL;

  const [message, setMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = { email: "", password: "" };

    if (!formData.email) {
      newErrors.email = "Email is required";
      setErrors(newErrors);
      return;
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
      setErrors(newErrors);
      return;
    }

    setIsLoading(true);
    try {
      const res = await fetch(`${apiUrl}/signin`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (res.status !== 201) {
        setMessage(data.error);
      } else {
        setMessage(data.message);
        navigate("/profile");
      }
      setTimeout(() => {
        setMessage(null);
      }, 2000);
    } catch (error) {
      console.log(error);
    }
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      {message && (
        <div
          className={`absolute top-0 z-50 w-full p-2 font-medium text-sm ${
            message === "Successfully logged in"
              ? "bg-green-400"
              : "bg-red-500 text-white"
          }`}
        >
          {message}
        </div>
      )}
      {isLoading ? (
        <div className="min-h-screen w-full place-content-center">
          <img
            src={LoadingIcon}
            alt="loading"
            className="m-auto w-[150px] h-[100px]"
          />
        </div>
      ) : (
        <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
          <h1 className="text-2xl font-semibold mb-4">Sign In</h1>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2" htmlFor="email">
                Email
              </label>
              <input
                type="email"
                name="email"
                id="email"
                value={formData.email}
                onChange={handleChange}
                className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
                  errors.email ? "border-red-500" : "focus:ring-blue-500"
                }`}
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">{errors.email}</p>
              )}
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2" htmlFor="password">
                Password
              </label>
              <input
                type="password"
                name="password"
                id="password"
                value={formData.password}
                onChange={handleChange}
                className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
                  errors.password ? "border-red-500" : "focus:ring-blue-500"
                }`}
              />
              {errors.password && (
                <p className="text-red-500 text-sm mt-1">{errors.password}</p>
              )}
            </div>
            <button
              type="submit"
              className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 w-full"
            >
              Sign In
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default SignInPage;
