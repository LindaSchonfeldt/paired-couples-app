import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '../utils/supabase'

export const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [message, setMessage] = useState('')
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password
    })
    if (error) {
      console.error(error.message)
      setMessage(error.message)
    } else {
      navigate('/')
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <h1>Logga in</h1>
      <input
        type='email'
        placeholder='Email'
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type='password'
        placeholder='Lösenord'
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button type='submit'>Logga in</button>

      {message && <p>{message}</p>}
    </form>
  )
}
