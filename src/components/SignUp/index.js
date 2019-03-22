import React, {useState} from 'react'
import { Link, withRouter } from 'react-router-dom';


import * as ROUTES from '../../constants/routes'
import { withFirebase } from '../Firebase';

const INITIAL_STATE = {
  username: '',
  email: '',
  passwordOne: '',
  passwordTwo: '',
  error: null,
};


const SignUpPage = () => {
  return (
    <div>
      <h1>Sing up!</h1>
      <SignUpForm />
    </div>
  )
}


const SignUpFormBase = ({firebase, history}) => {
  const [state, setState] = useState(INITIAL_STATE)

  const {
    username,
    email,
    passwordOne,
    passwordTwo,
    error,
    } = state;

  const isInvalid = 
    passwordOne !== passwordTwo ||
    passwordOne.length < 6 ||
    email.length < 5 ||
    username.length < 2;

  function onSubmit(event) {
    const { username, email, passwordOne} = state;
    firebase.doCreateUserWithEmailAndPassword(email, passwordOne)
      .then(authUser => {
        console.log('succes');
        setState({...INITIAL_STATE})
        history.push(ROUTES.LANDING)
      })
      .catch(error => {
        setState({...state, error})
      })
    event.preventDefault();

  }

  function onChange(event) {
    setState({...state, [event.target.name]: event.target.value})

  }

  return (
    <form onSubmit={onSubmit}>
      <input
        name="username"
        value = {username}
        onChange={onChange}
        type="text"
        placeholder="full name"
      />
      <input
        name="email"
        value = {email}
        onChange={onChange}
        type="text"
        placeholder="email"
      />
      <input
        name="passwordOne"
        value = {passwordOne}
        onChange={onChange}
        type="password"
        placeholder="password"
      />
      <input
        name="passwordTwo"
        value = {passwordTwo}
        onChange={onChange}
        type="password"
        placeholder="retype password"
      />
      <button disabled={isInvalid} type="submit">
        Sign Up
      </button>

      {error && <p>{error.message}</p>}
    </form>
  )
}

const SignUpLink = () => {
  return (
    <p> 
      Don't have an account? <Link to={ROUTES.SIGN_UP}>Sign Up</Link>
    </p>
  )
}

const SignUpForm = withRouter(withFirebase(SignUpFormBase))

export default SignUpPage

export { SignUpForm, SignUpLink }
