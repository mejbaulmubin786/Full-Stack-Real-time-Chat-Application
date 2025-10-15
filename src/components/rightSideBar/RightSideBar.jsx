import React from 'react';
import './RightSideBar.css';
import assets from '../../assets/assets';
import { logout } from '../../config/firebase';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const RightSideBar = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      toast.info("Logged out successfully!");
      navigate('/'); // Login পেজে রিডিরেক্ট করবে
    } catch (error) {
      toast.error("Logout failed: " + error.message);
    }
  };

  return (
    <div className='rs'>
      <div className="rs-profile">
        <img src={assets.profile_img} alt="" />
        <h3>Mejbaul Mubin <img src={assets.green_dot} className='dot' /></h3>
        <p>Hey, There I am Mejbaul Mubin using chat app</p>
      </div>
      <hr />
      <div className="rs-media">
        <p>Media</p>
        <div>
          <img src={assets.pic1} alt="" />
          <img src={assets.pic2} alt="" />
          <img src={assets.pic3} alt="" />
          <img src={assets.pic4} alt="" />
          <img src={assets.pic1} alt="" />
          <img src={assets.pic2} alt="" />
        </div>
      </div>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default RightSideBar;
