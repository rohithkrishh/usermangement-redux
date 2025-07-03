import React, { useState } from 'react';
import axiosInstance from '../../utils/axiosInstance';
import { useNavigate } from 'react-router-dom';
import '../../assets/styles/Signup.css';
import { toast, Toaster } from 'sonner';

function SignUp() {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    phone: '',
    password: '',
    profileImage: null,
  });

  const [errors, setErrors] = useState({
    username: '',
    phone: '',
    email: '',
    password: '',
    profileImage: '',
  });


  const navigate = useNavigate();
  const [message, setMessage] = useState('');

  const validateName = (name) => {
    const nameRegex = /^[a-zA-Z]+(?:\s[a-zA-Z]+)*$/;
    if (!nameRegex.test(name)) {
      return "Name should only contain letters and single spaces";
    }
    return "";
  };

  const validatePhone = (phone) => {
    const phoneRegex = /^\d{10}$/;
    if (!phoneRegex.test(phone)) {
      return "Phone number must be exactly 10 digits";
    }
    return "";
  };

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return "Invalid email format";
    }
    return "";
  };

  const validatePassword = (password) => {
    const passwordRegex = /^(?=.*[A-Z])(?=.*\d).{6,}$/;
    if (!passwordRegex.test(password)) {
      return "Password must be at least 6 characters with 1 uppercase and 1 number";
    }
    return "";
  };

  const validateProfileImage = (file) => {
    if (!file) return "Need to give a profile image";
    const validTypes = ['image/jpeg', 'image/png'];
    if (!validTypes.includes(file.type)) {
      return "Only JPEG and PNG files are allowed";
    }
    if (file.size > 2 * 1024 * 1024) {
      return "File size should be under 2MB";
    }
    return "";
  };


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    if (name === 'username') {
      setErrors(prev => ({ ...prev, username: validateName(value) }));
    } else if (name === 'phone') {
      setErrors(prev => ({ ...prev, phone: validatePhone(value) }));
    }
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, profileImage: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const nameError = validateName(formData.username);
    const phoneError = validatePhone(formData.phone);
    const emailError = validateEmail(formData.email);
    const passwordError = validatePassword(formData.password);
    const profileImageError = validateProfileImage(formData.profileImage);

    setErrors({
      username: nameError,
      phone: phoneError,
      email: emailError,
      password: passwordError,
      profileImage: profileImageError,
    });

    if (nameError || phoneError || emailError || passwordError || profileImageError) {
      return;
    }

    // Proceed with submission...
    const formDataToSend = new FormData();
    formDataToSend.append('username', formData.username);
    formDataToSend.append('email', formData.email);
    formDataToSend.append('phone', formData.phone);
    formDataToSend.append('password', formData.password);
    if (formData.profileImage) {
      formDataToSend.append('profileImage', formData.profileImage);
    }

    try {
      const response = await axiosInstance.post('/auth/signup', formDataToSend);
      setMessage(response.data.message);
      toast.success('Registration successful');
      setTimeout(() => navigate('/'), 2000);
    } catch (error) {
      const errorMsg = error.response?.data?.message || 'Signup failed';
      setMessage(errorMsg);
      toast.error(errorMsg);
    }
  };


  return (
    <>
      <Toaster position="top-center" />
      <div className="signup-container">
        <h2 className="signup-title">Signup</h2>
        <form onSubmit={handleSubmit} className="signup-form">
          <div className="form-group">
            <input
              type="text"
              name="username"
              placeholder="Username"
              value={formData.username}
              onChange={handleChange}
              className={`form-input ${errors.username ? 'input-error' : ''}`}
            />
            {errors.username && <p className="error-message">{errors.username}</p>}
          </div>

          <div className="form-group">
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              className={`form-input ${errors.email ? 'input-error' : ''}`}
            />
            {errors.email && <p className="error-message">{errors.email}</p>}
          </div>

          <div className="form-group">
            <input
              type="text"
              name="phone"
              placeholder="Phone"
              value={formData.phone}
              onChange={handleChange}
              className={`form-input ${errors.phone ? 'input-error' : ''}`}
            />
            {errors.phone && <p className="error-message">{errors.phone}</p>}
          </div>

          <div className="form-group">
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              className="form-input"
            />
            {errors.password && <p className="error-message">{errors.password}</p>}
          </div>

          <div className="form-group">
            <input
              type="file"
              name="profileImage"
              onChange={handleFileChange}
              className="form-file-input"
            />
            {errors.profileImage && <p className="error-message">{errors.profileImage}</p>}

          </div>
          <button type="submit" className="submit-btn" disabled={!!errors.username || !!errors.phone}>Sign Up</button>
        </form>
        {message && <p className="signup-message">{message}</p>}
      </div>
    </>
  );
}

export default SignUp;

