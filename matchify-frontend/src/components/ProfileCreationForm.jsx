import React, { useState } from 'react';
import { Upload } from 'lucide-react';

const ProfileCreationForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    gender: '',
    location: '',
    interests: '',
    profilePicture: null
  });
  
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState(false);
  
  const validateForm = () => {
    const newErrors = {};
    if (!formData.name) newErrors.name = 'Name is required';
    if (!formData.age || formData.age < 18) newErrors.age = 'Valid age is required (18+)';
    if (!formData.gender) newErrors.gender = 'Gender is required';
    if (!formData.location) newErrors.location = 'Location is required';
    if (!formData.interests) newErrors.interests = 'Interests are required';
    if (!formData.profilePicture) newErrors.profilePicture = 'Profile picture is required';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      // Simulating API call
      setTimeout(() => {
        setSuccess(true);
        setFormData({
          name: '',
          age: '',
          gender: '',
          location: '',
          interests: '',
          profilePicture: null
        });
      }, 1000);
    }
  };
  
  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.type.startsWith('image/')) {
        setFormData({ ...formData, profilePicture: file });
        setErrors({ ...errors, profilePicture: '' });
      } else {
        setErrors({ ...errors, profilePicture: 'Please upload a valid image file' });
      }
    }
  };
  
  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-6">Create Profile</h1>
      
      {success && (
        <div className="mb-4 p-4 rounded bg-green-100 text-green-700 flex items-center">
          <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
          </svg>
          Profile created successfully!
        </div>
      )}
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Name</label>
          <input
            type="text"
            id="name"
            className="w-full p-2 border rounded"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          />
          {errors.name && (
            <p className="text-red-500 text-sm mt-1" id="name-error">{errors.name}</p>
          )}
        </div>
        
        <div>
          <label className="block text-sm font-medium mb-1">Age</label>
          <input
            type="number"
            id="age"
            className="w-full p-2 border rounded"
            value={formData.age}
            onChange={(e) => setFormData({ ...formData, age: e.target.value })}
          />
          {errors.age && (
            <p className="text-red-500 text-sm mt-1" id="age-error">{errors.age}</p>
          )}
        </div>
        
        <div>
          <label className="block text-sm font-medium mb-1">Gender</label>
          <select
            id="gender"
            className="w-full p-2 border rounded"
            value={formData.gender}
            onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
          >
            <option value="">Select gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
          {errors.gender && (
            <p className="text-red-500 text-sm mt-1" id="gender-error">{errors.gender}</p>
          )}
        </div>
        
        <div>
          <label className="block text-sm font-medium mb-1">Location</label>
          <input
            type="text"
            id="location"
            className="w-full p-2 border rounded"
            value={formData.location}
            onChange={(e) => setFormData({ ...formData, location: e.target.value })}
          />
          {errors.location && (
            <p className="text-red-500 text-sm mt-1" id="location-error">{errors.location}</p>
          )}
        </div>
        
        <div>
          <label className="block text-sm font-medium mb-1">Interests</label>
          <textarea
            id="interests"
            className="w-full p-2 border rounded"
            value={formData.interests}
            onChange={(e) => setFormData({ ...formData, interests: e.target.value })}
          />
          {errors.interests && (
            <p className="text-red-500 text-sm mt-1" id="interests-error">{errors.interests}</p>
          )}
        </div>
        
        <div>
          <label className="block text-sm font-medium mb-1">Profile Picture</label>
          <div className="flex items-center space-x-2">
            <input
              type="file"
              id="profilePicture"
              accept="image/*"
              className=""
              onChange={handleFileUpload}
            />
            <label
              htmlFor="profilePicture"
              className="flex items-center px-4 py-2 bg-gray-100 rounded cursor-pointer hover:bg-gray-200"
            >
              <Upload className="w-4 h-4 mr-2" />
              Upload Image
            </label>
            {formData.profilePicture && (
              <span className="text-sm text-green-600">✓ Image selected</span>
            )}
          </div>
          {errors.profilePicture && (
            <p className="text-red-500 text-sm mt-1" id="profilePicture-error">
              {errors.profilePicture}
            </p>
          )}
        </div>
        
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
          id="submit-button"
        >
          Create Profile
        </button>
      </form>
    </div>
  );
};

export default ProfileCreationForm;