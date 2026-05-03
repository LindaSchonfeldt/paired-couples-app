import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { Alert, Button, Input, PageLayout } from '../components'
import { useAuth } from '../context/AuthContext'
import { supabase } from '../utils/supabase'

export const CreateList = () => {
  const { space, user } = useAuth()
  const navigate = useNavigate()
  const [name, setName] = useState('')
  const [isShared, setIsShared] = useState(true)
  const [message, setMessage] = useState('')
  const [messageType, setMessageType] = useState<
    'error' | 'success' | 'info' | 'warning'
  >('error')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    const { data, error } = await supabase
      .from('lists')
      .insert({
        name,
        is_shared: isShared,
        space_id: space.id,
        created_by: user.id
      })
      .select('id')
      .single()

    if (error) {
      setMessageType('error')
      setMessage(error.message)
      return
    }

    navigate(`/lists/${data.id}`)
  }

  return (
    <PageLayout title='Create list'>
      <form onSubmit={handleSubmit}>
        <Input
          placeholder='List name'
          value={name}
          onChange={(value) => setName(value)}
          status={message ? 'error' : undefined}
          required
        />

        <div className='flex items-center gap-3 my-4'>
          <input
            type='checkbox'
            id='isShared'
            checked={isShared}
            onChange={(e) => setIsShared(e.target.checked)}
            className='w-4 h-4 accent-brand-500'
          />
          <label htmlFor='isShared' className='text-sm text-neutral-700'>
            Shared — everyone in the space can alter it
          </label>
        </div>

        <Button type='submit'>Create</Button>
      </form>
      <Alert type={messageType} message={message} />
    </PageLayout>
  )
}
