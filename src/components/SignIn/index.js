import React, {useState} from 'react'
import { SignUpLink } from '../SignUp';
import { withFirebase } from '../Firebase';
import { Link, withRouter } from 'react-router-dom';
import * as ROUTES from '../../constants/routes'



const INITIAL_STATE = {
  email: '',
  password: '',
  error: null,
};

const SignInPage = () => {

  return (
    <div>
      <h1>Sign In</h1>
      <SignInForm />
      <SignUpLink />
    </div>
  )
}

const SignInFormBase = ({firebase, history}) => {

  const [state, setState] = useState(INITIAL_STATE)

  const {
    username,
    email,
    password,
    error,
    } = state;

  const isInvalid = 
    password.length < 6 ||
    email.length < 5

  const onChange = e => {
    setState({...state, [e.target.name]: e.target.value})
  }

  const onSubmit = e => {
    firebase.doSignInWithEmailAndPassword(email, password)
      .then(() => {
        setState(INITIAL_STATE)
        history.push(ROUTES.PROFILE)
      })
      .catch(e => {
        setState({...state, error: e})
      })

    e.preventDefault()
  }

  return (
    <form onSubmit={onSubmit}>
      <input
        name="email"
        value={email}
        onChange={onChange}
        type="text"
        placeholder="Email Address"
      />
      <input
        name="password"
        value={password}
        onChange={onChange}
        type="password"
        placeholder="Password"
      />
      <button disabled={isInvalid} type="submit">
        Sign In
      </button>
      {error && <p>{error.message}</p>}
    </form>
  )
}

const SignInForm = withRouter(withFirebase(SignInFormBase))

export default SignInPage

export {SignInForm}