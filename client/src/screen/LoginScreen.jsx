import { useNavigate } from 'react-router-dom';
import { useLoginMutation } from '../features/auth/authApiSlice'
import useTitle from '../hooks/useTitle';
import { useDispatch } from 'react-redux';
import { setCredentials } from '../features/auth/authSlice';
import { useEffect, useRef, useState } from 'react';

function LoginScreen() {

  useTitle('Admin Login')

  const [login, { isLoading }] = useLoginMutation()

  const emailRef = useRef()
  const errRef = useRef()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errMsg, setErrMsg] = useState('')

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    emailRef.current.focus()
  }, [])

  useEffect(() => {
    setErrMsg('')
  }, [ email, password ])

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const { access_token } = await login({ email, password }).unwrap()

      dispatch(setCredentials({ access_token }))

      setEmail('');
      setPassword('');
      navigate('/');
    } catch (err) {
      if (!err.status) {
        setErrMsg('No Server Response');
      } else if (err.status === 400) {
        setErrMsg('Missing Email or Password');
      } else if (err.status === 401) {
        setErrMsg('Unauthorized');
      } else {
        setErrMsg(err.data?.message);
      }
      errRef.current.focus();
    }
  }

  const handleEmailInput = (e) => setEmail(e.target.value)
  const handlePwdInput = (e) => setPassword(e.target.value)

  const errClass = errMsg ? 'alert alert-danger' : 'd-none';

  return (
    <section>
      <div ref={errRef} className={errClass} role="alert">{errMsg}</div>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="email_input" className="form-label">Email address</label>
          <input type="email" className="form-control" id="email_input" ref={emailRef} value={email} onChange={handleEmailInput} required />
          <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
        </div>
        <div className="mb-3">
          <label htmlFor="password_input" className="form-label">Password</label>
          <input type="password" className="form-control" id="password_input" value={password} onChange={handlePwdInput} required />
        </div>
        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
    </section>
  )
}

export default LoginScreen