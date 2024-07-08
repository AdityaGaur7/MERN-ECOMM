import React from 'react'

const Profile = () => {
  const user = JSON.parse(localStorage.getItem('user')).user;
  console.log(user);
  return (
    <div className='home '>
    <div className='profile'>

      <h3>Admin Details</h3>
      <p>Name: {user.name}</p>
      <p>Email: {user.email}</p>
    </div>

    </div>
  )
}

export default Profile