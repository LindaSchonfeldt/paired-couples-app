import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { Alert, Button, Input, PageLayout } from '../components'
import { supabase } from '../utils/supabase'

export const Register = () => {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [displayName, setDisplayName] = useState('')
  const [message, setMessage] = useState('')
  const [messageType, setMessageType] = useState('error')
  const [accountExists, setAccountExists] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setAccountExists(false)

    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { display_name: displayName }
      }
    })

    if (error) {
      console.error(error.message)
      setMessageType('error')
      setMessage(error.message)
      setAccountExists(error.message.toLowerCase().includes('already registered'))
      return
    }

    setMessageType('success')
    setMessage('Check your email to confirm your account!')
    setEmail('')
    setPassword('')
    setDisplayName('')
  }

  return (
    <PageLayout title='Create account'>
      <form onSubmit={handleSubmit}>
        <Input
          placeholder='Display name'
          value={displayName}
          onChange={(value) => setDisplayName(value)}
          status={message && messageType === 'error' ? 'error' : undefined}
          required
        />
        <Input
          type='email'
          placeholder='Email'
          value={email}
          onChange={(value) => setEmail(value)}
          status={message && messageType === 'error' ? 'error' : undefined}
          required
        />
        <Input
          type='password'
          placeholder='Password'
          value={password}
          onChange={(value) => setPassword(value)}
          status={message && messageType === 'error' ? 'error' : undefined}
          required
        />
        <Button type='submit'>Register</Button>
      </form>
      <Alert type={messageType} message={message} />
      {accountExists && (
        <Button variant='secondary' onPress={() => navigate('/login')}>
          Log in instead
        </Button>
      )}
    </PageLayout>
  )
}
