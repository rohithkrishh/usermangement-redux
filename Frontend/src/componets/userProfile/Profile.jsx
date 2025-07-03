import axiosInstance from "../../utils/axiosInstance";
import { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { logout } from '../../redux/slice/UserSlice'
import { User, Mail, Phone, Edit2, LogOut } from 'lucide-react';
import '../../assets/styles/Profile.css'

function UserProfile() {
  const dispatch = useDispatch()
  const user = useSelector((state) => state.auth.user)
  const navigate = useNavigate()


  const [error, setError] = useState('')
  const [isLogoutPopupVisisble, setIsLogoutPopupVisible] = useState(false)
  console.log("profile", user)

  function handleEdit() {
    const confirmEdit = window.confirm('do you want to edit your profile ?')
    if (confirmEdit) {
      navigate('/edit')
    }
  }

  function handleLogout() {
    setIsLogoutPopupVisible(true)
  }

  const confirmLogout = async () => {
    dispatch(logout())
    await axiosInstance.post('/user/logout')
    navigate('/')
  }

  function cancelLogout() {
    setIsLogoutPopupVisible(false)
  }

  console.log(`${import.meta.env.VITE_BASE_IMG_URL}/${user?.profileImage}`);



  return (

    <div className="user-profile-container">
      <div className="profile-card">
        <h1>User Profile</h1>
        {error && <p className="error">{error}</p>}
        <div className="profile-image-container">
          <img
            src={user?.profileImage ? `${import.meta.env.VITE_BASE_IMG_URL.replace(/\/$/, '')}/${user.profileImage.replace(/^\//, '')}` : '/src/assets/dummy.jpg'}
            alt="Profile"
            className="profile-image"
          />
        </div>
        {user ? (
          <div className="profile-info">
            <div className="info-item">
              <User size={20} />
              <p><b>Name:</b> {user.username}</p>
            </div>
            <div className="info-item">
              <Mail size={20} />
              <p><b>Email:</b> {user.email}</p>
            </div>
            <div className="info-item">
              <Phone size={20} />
              <p><b>Mobile:</b> {user.phone}</p>
            </div>
          </div>
        ) : (
          <p className="loading">Loading profile...</p>
        )}
        <div className="button-container">
          <button onClick={handleEdit} className="edit-button">
            <Edit2 size={16} />
            Edit
          </button>
          <button onClick={handleLogout} className="logout-button">
            <LogOut size={16} />
            Logout
          </button>
        </div>
      </div>
      {isLogoutPopupVisisble && (
        <div className="confirmation-popup">
          <div className="popup-content">
            <h3>Are you sure you want to log out?</h3>
            <button className="confirm-btn" onClick={confirmLogout} >
              Confirm
            </button>
            <button className="cancel-btn" onClick={cancelLogout}>
              Cancel
            </button>
          </div>
        </div>
      )}

    </div>
  )

}

export default UserProfile