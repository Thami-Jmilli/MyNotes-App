import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useAuth } from '../context/AuthContext'

export default function Register() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const { signUp } = useAuth()
  const navigate = useNavigate()

  async function handleSubmit(e) {
    e.preventDefault()
    const { error } = await signUp(email, password)
    if (error) return setError(error.message)
    navigate('/login')
  }

  return (
    <div className='auth-page'>
      <motion.form className='auth-card' initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} onSubmit={handleSubmit}>
        <h1>Register</h1>
        <input placeholder='Email' type='email' value={email} onChange={(e) => setEmail(e.target.value)} />
        <input placeholder='Password' type='password' value={password} onChange={(e) => setPassword(e.target.value)} />
        {error && <p>{error}</p>}
        <button type='submit'>Create Account</button>
        <Link to='/login'>Already have an account?</Link>
      </motion.form>
    </div>
  )
}
