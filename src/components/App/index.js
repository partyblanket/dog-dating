import React, {useState, useEffect} from 'react'
import {BrowserRouter as Router, Route} from 'react-router-dom'
import Nav from '../Nav';
import Landing from '../Landing'
import Profile from '../Profile'


import * as ROUTES from '../../constants/routes'
import SignUpPage from '../SignUp';
import SignInPage from '../SignIn';
import { withFirebase } from '../Firebase';


const App = ({firebase}) => {

  const [authUser, setAuthUser] = useState(null);

  useEffect(() => {
    firebase.auth.onAuthStateChanged((authUser) => {
      console.log(authUser);
      
      authUser ? setAuthUser(authUser) : setAuthUser(null)
        
    })
  })

  return (

    <Router>
      
      <Nav authUser={authUser}/>
      <hr />
      <Route exact path={ROUTES.LANDING} component={Landing} />
      <Route path={ROUTES.PROFILE} component={Profile} />
      <Route path={ROUTES.SIGN_UP} component={SignUpPage} />
      <Route path={ROUTES.SIGN_IN} component={SignInPage} />
      
    </Router>
  )
}

export default withFirebase(App);