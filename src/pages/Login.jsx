import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useAuth } from '../context/AuthContext'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const { signIn } = useAuth()
  const navigate = useNavigate()

  async function handleSubmit(e) {
    e.preventDefault()
    const { error } = await signIn(email, password)
    if (error) return setError(error.message)
    navigate('/')
  }

  return (
    <div className='auth-page'>
      <motion.form className='auth-card' initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} onSubmit={handleSubmit}>
        <h1>Login</h1>
        <input placeholder='Email' type='email' value={email} onChange={(e) => setEmail(e.target.value)} />
        <input placeholder='Password' type='password' value={password} onChange={(e) => setPassword(e.target.value)} />
        {error && <p>{error}</p>}
        <button type='submit'>Login</button>
        <Link to='/register'>Create Account</Link>
      </motion.form>
    </div>
  )
}
