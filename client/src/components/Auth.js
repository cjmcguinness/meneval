import { useState } from 'react'
import { useCookies } from 'react-cookie'

function Auth() {
  const [cookies, setCookie, removeCookie] = useCookies(null)
  const [isLogIn, setIsLogin] = useState(true)
  const [email, setEmail] = useState(null)
  const [password, setPassword] = useState(null)
  const [confirmPassword, setConfirmPassword] = useState(null)
  const [error, setError] = useState(null)

  console.log(cookies)

  function viewLogin(status) {
    setError(null)
    setIsLogin(status)
  }

  function validateEmail(email) {
    // Basic email validation regex
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
  }

  async function handleSubmit(e, endpoint) {
    e.preventDefault()

    setError(null)

    if (!validateEmail(email)) {
      setError('Please enter a valid email address');
      return;
    }

    if (!isLogIn && password !== confirmPassword) {
      setError('Passwords do not match')
      return
    }

    try {
      const response = await fetch(`http://localhost:8000/${endpoint}`, {
            method: 'POST',
            headers: { 'Content-Type':'application/json' },
            body: JSON.stringify({ email, password})
          })
          const data = await response.json()
          if (data.detail) {
            setError(data.detail)  
          } else {
            setCookie('Email', data.email)
            setCookie('AuthToken', data.token)
          }
    } catch {
      setError('An error occurred')
    }
  }

    return (
      <div className="auth-container">
        <div className="auth-container-box">
          <form>
            <h1>{isLogIn ? 'Log in' : 'Sign up'}</h1>
            <input 
              type="email" 
              placeholder="email"
              onChange={(e) => {setEmail(e.target.value)}}
            />
            <input 
              type="password" 
              placeholder="password"
              onChange={(e) => {setPassword(e.target.value)}}
            />
            {!isLogIn && <input 
              type="password" 
              placeholder="confirm password"
              onChange={(e) => {setConfirmPassword(e.target.value)}}
            />}
            <input 
              type="submit" 
              className="create" 
              onClick={(e) => {handleSubmit(e, isLogIn ? 'login' : 'signup')}}
            />
            {error && <p style={{ color: 'red' }}>{error}</p>}
          </form>
          <div className="auth-options">
            <button 
              onClick={() => {viewLogin(false)}}
              style={{backgroundColor: !isLogIn ? 'rgb(255,255,255)': 'rgb(188,188,188)'}}>Sign Up</button>
            <button 
              onClick={() => {viewLogin(true)}}
              style={{backgroundColor: isLogIn ? 'rgb(255,255,255)': 'rgb(188,188,188)'}}>Login</button>
          </div>
        </div>
      </div>
    )
  }
  
  export default Auth
  
