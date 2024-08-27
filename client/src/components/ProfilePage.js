import React, { useEffect, useState } from "react";

const ProfilePage = () => {
  const [user, setUser] = useState();
  const [message, setMessage] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Update user details (you would send this to your backend)
    // setUser(formData);
    // setIsEditing(false);
  };

  useEffect(() => {
    const getUser = async () => {
      try {
        const res = await fetch("http://localhost:5000/profile", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        });

        const data = await res.json();
        if (res.status !== 201) {
          setMessage(data.error);
        } else {
          setUser(data);
        }
        setTimeout(() => {
          setMessage(null);
        }, 2000);
      } catch (error) {
        console.log(error);
      }
    };

    getUser();
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 relative">
      {message && (
        <div
          className={`absolute top-0 z-50 w-full p-2 font-medium text-sm ${
            message === "Successfully registered"
              ? "bg-green-400"
              : "bg-red-600 text-white"
          }`}
        >
          {message}
        </div>
      )}
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        {!isEditing ? (
          <div>
            <h1 className="text-2xl font-semibold mb-4">Profile</h1>
            <p className="text-gray-700 mb-2">
              <strong>Name:</strong> {user?.name}
            </p>
            <p className="text-gray-700 mb-4">
              <strong>Email:</strong> {user?.email}
            </p>
            <p className="text-gray-700 mb-4">
              <strong>Resume:</strong>
              <a
                href={user?.resume_url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 underline"
              >
                View Resume
              </a>
            </p>
            <button
              onClick={() => setIsEditing(true)}
              className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
            >
              Edit Profile
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            <h1 className="text-2xl font-semibold mb-4">Edit Profile</h1>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2" htmlFor="name">
                Name
              </label>
              <input
                type="text"
                name="name"
                id="name"
                value={user?.name}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2" htmlFor="email">
                Email
              </label>
              <input
                type="email"
                name="email"
                id="email"
                value={user?.email}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="flex items-center justify-between">
              <button
                type="submit"
                className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600"
              >
                Save Changes
              </button>
              <button
                type="button"
                onClick={() => setIsEditing(false)}
                className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600"
              >
                Cancel
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default ProfilePage;
