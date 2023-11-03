import React, { useContext } from 'react'
import { FaSignOutAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();

  return (
    <div className='navbar_d off'>
      <span className="navbar-logo">Chat</span>
      <div className="navbar-user">
        {/* <span>{currentUser.currentUserDisplayName}</span> */}
        {/* <button className="btn" onClick={() => dispatch({ type: "CHANGE_CURRENTUSER", payload: "" }, navigate("/login"))}><FaSignOutAlt /></button> */}
      </div>
    </div>
  )
}

export default Navbar