import React from 'react'
import { UserContext } from '../../state/UserContext'
import { useContext } from 'react'

const UserProfile = () => {
  const {user, updateUser} = useContext(UserContext)

  return (
    <>
    <div>username: {user.username}</div>
    <div>first name: {user.first_name}</div>
    <div>last name: {user.last_name}</div>
    <div>email address attached to this account: {user.email}</div>
    </>
  )
}

export default UserProfile