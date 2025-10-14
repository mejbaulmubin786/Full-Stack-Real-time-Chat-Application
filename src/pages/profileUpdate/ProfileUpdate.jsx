import React from 'react'
import './ProfileUpdate.css'
import assets from '../../assets/assets'

const ProfileUpdate = () => {
  return (
    <div className='profile'>
      <div className="profile-container">
        <form>
          <h3>Profile Details</h3>
          <label htmlFor="avatar">
            <input type="file" id='avatar' accept='.png, .jpg, jpeg' higgen/>
            <img src={assets.avatar_icon} alt="" />
          </label>
        </form>
      </div>
    </div>
  )
}

export default ProfileUpdate