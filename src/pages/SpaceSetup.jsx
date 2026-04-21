import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { Alert, Button, ButtonGroup, Input, PageLayout } from '../components'
import { useAuth } from '../context/AuthContext'
import { supabase } from '../utils/supabase'

export const SpaceSetup = () => {
  const [name, setName] = useState('')
  const [message, setMessage] = useState('')
  const [messageType, setMessageType] = useState('error')
  const navigate = useNavigate()
  const { setSpace } = useAuth()

  const handleSubmit = async (e) => {
    e.preventDefault()

    const {
      data: { user }
    } = await supabase.auth.getUser()

    if (!user) {
      setMessageType('error')
      setMessage('You must be logged in to create a space.')
      return
    }

    const { data, error } = await supabase
      .from('spaces')
      .insert({ name })
      .select()
      .single()

    if (error) {
      console.error(error.message)
      setMessageType('error')
      setMessage(error.message)
      return
    }

    const { error: memberError } = await supabase.from('space_members').insert({
      space_id: data.id,
      user_id: user.id
    })

    if (memberError) {
      console.error(memberError.message)
      setMessageType('error')
      setMessage(memberError.message)
      return
    }

    setSpace(data)
    navigate('/')
  }

  return (
    <PageLayout title='Get started'>
      <p>Create a new space or join an existing one.</p>
      <form onSubmit={handleSubmit}>
        <Input
          placeholder='Space name'
          value={name}
          onChange={(value) => setName(value)}
          status={message ? messageType : undefined}
          required
        />

        <ButtonGroup>
          <Button type='submit'>Create space</Button>
          <Button type='button' variant='secondary'>
            Join existing space
          </Button>
        </ButtonGroup>
      </form>
      <Alert type={messageType} message={message} />
    </PageLayout>
  )
}
