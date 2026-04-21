import { useState } from 'react'
import { supabase } from '../utils/supabase'

export const Register = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [message, setMessage] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    const { error } = await supabase.auth.signUp({ email, password })
    if (error) {
      console.error(error.message)
      setMessage(error.message)
    } else {
      setMessage('Check your email to confirm your account!')
      setEmail('')
      setPassword('')
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <h1>Create account</h1>
      <input
        type='email'
        placeholder='Email'
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type='password'
        placeholder='Password'
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button type='submit'>Register</button>

      {message && <p>{message}</p>}
    </form>
  )
}
