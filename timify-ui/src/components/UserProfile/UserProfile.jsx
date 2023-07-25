import React from 'react'
import { UserContext } from '../../state/UserContext'
import { useContext } from 'react'
import './UserProfile.css'

const UserProfile = () => {
  const {user, updateUser} = useContext(UserContext)

  return (
    <div className='user-profile'>
    <div>profile-picture</div>
    <div>username: {user.username}</div>
    <div>first name: {user.first_name}</div>
    <div>last name: {user.last_name}</div>
    <div>email address attached to this account: {user.email}</div>
    </div>
  )
}

export default UserProfile