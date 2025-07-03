import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import SignUp from "./componets/signUp/SignUp";
import Login from "./componets/Login/Login";
import Home from "./pages/userHome/Home";
import UserProfile from "./componets/userProfile/Profile";
import EditProfile from "./componets/editProfile/EditProfile";
import AdminLogin from "./pages/Admin/adminLogin/AdminLogin";
import AdminHome from "./pages/Admin/adminHome/AdminHome";
import Dashboard from "./pages/Admin/adminDahboard/Dahboard";
import AddUser from "./pages/Admin/adminAdduser/AddUser";
import { UserLoginProtect, UserProtect } from "./protectRoute/UserProtect";
import { AdminLoginProtect, AdminProtect } from "./protectRoute/AdminProtect";
import NotFound from "./pages/Notfound/NotFound"

function App() {
  return (
    <Router>
      <Routes>
        {/* userRoutes */}
        <Route path="/signup" element={
            <UserLoginProtect>
              <SignUp />
            </UserLoginProtect>
          }
        />
        <Route path="/login" element={
            <UserLoginProtect>
              <Login />
            </UserLoginProtect>
          }
        />
        <Route path="/" element={
            <UserProtect>
              <Home />
            </UserProtect>
          }
        />
        <Route path="/profile" element={
            <UserProtect>
              <UserProfile />
            </UserProtect>
          }
        />
        <Route path="/edit" element={
            <UserProtect>
              <EditProfile />
            </UserProtect>
          }
        />

        {/* Admin Routes */}
        <Route path="/admin/login" element={
            <AdminLoginProtect>
              <AdminLogin />
            </AdminLoginProtect>
          }
        />
        <Route path="/admin" element={
            <AdminProtect>
              <AdminHome />
            </AdminProtect>
          }
        />
        <Route path="/admin/dashboard" element={
            <AdminProtect>
              <Dashboard />
            </AdminProtect>
          }
        />
        <Route path="/admin/adduser" element={
            <AdminProtect>
              <AddUser />
            </AdminProtect>
          }
        />
        
        {/* notfound */}
        <Route path="*" element={<NotFound />} />  
      </Routes>
    </Router>
  );
}

export default App;

