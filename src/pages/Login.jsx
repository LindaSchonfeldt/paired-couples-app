import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

import { Alert, Button, Input, PageLayout } from '../components'
import { supabase } from '../utils/supabase'

export const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [message, setMessage] = useState('')
  const [messageType, setMessageType] = useState('error')
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    const { error } = await supabase.auth.signInWithPassword({ email, password })
    if (error) {
      console.error(error.message)
      setMessageType('error')
      setMessage(error.message)
    } else {
      navigate('/')
    }
  }

  return (
    <PageLayout title='Log in'>
      <form onSubmit={handleSubmit}>
        <Input
          type='email'
          placeholder='Email'
          value={email}
          onChange={(value) => setEmail(value)}
          status={message ? 'error' : undefined}
          required
        />
        <Input
          type='password'
          placeholder='Password'
          value={password}
          onChange={(value) => setPassword(value)}
          status={message ? 'error' : undefined}
          required
        />
        <Button type='submit'>Sign in</Button>
      </form>
      <Alert type={messageType} message={message} />
      <p className='mt-4 text-sm text-brand-500'>
        Don't have an account?{' '}
        <Link to='/register' className='text-brand-900 font-medium'>
          Register
        </Link>
      </p>
    </PageLayout>
  )
}
