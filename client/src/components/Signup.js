import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import LoadingIcon from "./loadingIcon.svg";

const Signup = () => {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [resume, setResume] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState(null);

  const apiUrl = process.env.REACT_APP_API_URL;
  const resumeUrl = process.env.REACT_APP_RESUME_API_URL;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !email || !password || !confirmPassword || !resume) {
      return alert("Please complete the sign up form");
    }
    if (password !== confirmPassword) {
      return alert("Passwords not matched");
    }

    setIsLoading(true);

    const resumeFile = new FormData();
    resumeFile.append("file", resume);
    resumeFile.append("upload_preset", "kfgw6ech");

    try {
      const resCloudinary = await fetch(`${resumeUrl}`, {
        method: "POST",
        body: resumeFile,
      });

      const dataCloudinary = await resCloudinary.json();
      if (dataCloudinary && dataCloudinary.url) {
        const formDataObj = {
          name: name,
          email: email,
          password: password,
          confirm_password: confirmPassword,
          resume_url: dataCloudinary.url,
        };
        const response = await fetch(`${apiUrl}/signup`, {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify(formDataObj),
        });
        const data = await response.json();
        if (response.status !== 201) {
          setMessage(data.error);
        } else {
          setMessage("Successfully registered");
          setName("");
          setEmail("");
          setPassword("");
          setConfirmPassword("");
          setResume(null);
          navigate("/profile");
        }
      } else {
        setMessage("Error in uploading pdf");
      }

      setTimeout(() => {
        setMessage(null);
      }, 2000);
    } catch (error) {
      console.error("Error during signup:", error);
    }
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 relative">
      {message && (
        <div
          className={`absolute top-0 z-50 w-full p-2 font-medium text-sm ${
            message === "Successfully registered"
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
        <div className="w-full max-w-lg bg-white p-8 rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold text-center mb-6">Sign Up</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label
                className="block text-gray-700 font-bold mb-2"
                htmlFor="name"
              >
                Full Name
              </label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter your full name"
                required
              />
            </div>
            <div className="mb-4">
              <label
                className="block text-gray-700 font-bold mb-2"
                htmlFor="email"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter your email"
                required
              />
            </div>
            <div className="mb-4 relative">
              <label
                className="block text-gray-700 font-bold mb-2"
                htmlFor="password"
              >
                Password
              </label>
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter your password"
                required
              />
              <button
                type="button"
                className="absolute top-[47%] right-0 px-3 py-1 text-gray-600"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>
            <div className="mb-4 relative">
              <label
                className="block text-gray-700 font-bold mb-2"
                htmlFor="confirmPassword"
              >
                Confirm Password
              </label>
              <input
                type="password"
                id="confirmPassword"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Confirm your password"
                required
              />
            </div>
            <div className="mb-6">
              <label
                className="block text-gray-700 font-bold mb-2"
                htmlFor="resume"
              >
                Upload Resume
              </label>
              <input
                type="file"
                id="resume"
                onChange={(e) => setResume(e.target.files[0])}
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full bg-blue-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Sign Up
            </button>
          </form>

          <div className="mt-5 text-blue-600 text-sm">
            <a href="/">Login now!</a>
          </div>
        </div>
      )}
    </div>
  );
};

export default Signup;
