import { UserContext } from '../../state/UserContext'
import { useContext } from 'react'
import Recommendation from '../Recommendations/Recommendation'
import './UserProfile.css'

const UserProfile = () => {
  const {user} = useContext(UserContext)

  const getFirstLetter = (username) => {
    return username ? username.charAt(0).toUpperCase() : '';
  };


  return (
    <div className='user-profile'>
    <div className='profile-picture' style={{ backgroundColor: user.username ? 'yellow' : 'gray' }}>
        {getFirstLetter(user.username)}
      </div>
    <div className='first-name'>first name: <p className='res'>{user.first_name}</p></div> 
    <div className='last-name'>last name: <p className='res'>{user.last_name}</p></div>
    <div className='user-name'>username: <p className='res'>{user.username}</p></div>
    <div className='email-bar'>email address attached to this account: <p className='res'>{user.email}</p></div>

    <Recommendation />
    </div>
  )
}

export default UserProfile