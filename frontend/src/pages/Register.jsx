import { useState } from 'react'
import { supabase } from '../utils/supabase'

export const Register = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    const { error } = await supabase.auth.signUp({ email, password })
    if (error) {
      console.error(error.message)
    } else {
      console.log('Konto skapat!')
      setEmail('')
      setPassword('')
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <h1>Skapa konto</h1>
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
      <button type='submit'>Registrera</button>
    </form>
  )
}
