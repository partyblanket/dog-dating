import React from 'react'
import {Link} from 'react-router-dom'
import * as ROUTES from '../../constants/routes'
import SignOutButton from '../SignOut'

const Nav = ({authUser}) => <div>{authUser ? <NavAuth /> : <NavNonAuth />}</div>

const NavNonAuth = () => {
  return (
    <div>
      <ul>
          <li>
            <Link to={ROUTES.LANDING}>Home</Link>
          </li>
          <li>
            <Link to={ROUTES.SIGN_UP}>Sign Up</Link>
          </li>
          <li>
            <Link to={ROUTES.SIGN_IN}>Sign In</Link>
          </li>
      </ul>
    </div>
  )
}

const NavAuth = () => {
  return (
    <div>
    <ul>
        <li>
          <Link to={ROUTES.LANDING}>Home</Link>
        </li>
        <li>
          <Link to={ROUTES.PROFILE}>Profile</Link>
        </li>
    </ul>
    <SignOutButton />
  </div>
  )
}


export default Nav
