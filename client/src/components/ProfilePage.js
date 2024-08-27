import React, { useState } from 'react';

const ProfilePage = () => {
  // Dummy user data
  const [user, setUser] = useState({
    name: 'John Doe',
    email: 'john.doe@example.com',
    resumeUrl: 'https://www.cloudinary.com/resume.pdf',
  });

  // Edit mode state
  const [isEditing, setIsEditing] = useState(false);

  // Form data state for editing
  const [formData, setFormData] = useState({
    name: user.name,
    email: user.email,
  });

  // Handle input change
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Handle form submit for updating user details
  const handleSubmit = (e) => {
    e.preventDefault();
    // Update user details (you would send this to your backend)
    setUser(formData);
    setIsEditing(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        {!isEditing ? (
          <div>
            <h1 className="text-2xl font-semibold mb-4">Profile</h1>
            <p className="text-gray-700 mb-2"><strong>Name:</strong> {user.name}</p>
            <p className="text-gray-700 mb-4"><strong>Email:</strong> {user.email}</p>
            <p className="text-gray-700 mb-4">
              <strong>Resume:</strong> 
              <a href={user.resumeUrl} target="_blank" rel="noopener noreferrer" className="text-blue-500 underline">
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
              <label className="block text-gray-700 mb-2" htmlFor="name">Name</label>
              <input
                type="text"
                name="name"
                id="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2" htmlFor="email">Email</label>
              <input
                type="email"
                name="email"
                id="email"
                value={formData.email}
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
