import React from "react";
import{BrowserRouter as Router, Route, Routes} from "react-router-dom"
import { UserLoginProtect } from "./protectRoute/UserProtect";
import SignUp from "./components/signUp/SignUp";
import Login from "./components/Login/Login";





function App(){
return(
  <Router>
    <Routes>
      <Route path="/signup" element={
        <UserLoginProtect>
        <SignUp/>
        </UserLoginProtect>
      }/>
      <Route path="/" element={
        <UserLoginProtect>
         <Login/>
        </UserLoginProtect>
      }/>
    </Routes>
  </Router>
)
}

export default App