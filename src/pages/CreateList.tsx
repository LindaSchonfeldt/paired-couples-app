import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { Alert, Button, Input, PageLayout } from '../components'
import { useAuth } from '../context/AuthContext'
import { supabase } from '../utils/supabase'

export const CreateList = () => {
  const { space, user } = useAuth()
  const navigate = useNavigate()
  const [name, setName] = useState('')
  const [type, setType] = useState('shopping')
  const [isShared, setIsShared] = useState(true)
  const [message, setMessage] = useState('')
  const [messageType, setMessageType] = useState<
    'error' | 'success' | 'info' | 'warning'
  >('error')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    const { error } = await supabase
      .from('lists')
      .insert({ name, type, is_shared: isShared, space_id: space.id, created_by: user.id })

    if (error) {
      setMessageType('error')
      setMessage(error.message)
      return
    }

    navigate('/lists')
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
        <select value={type} onChange={(e) => setType(e.target.value)}>
          <option value='shopping'>Shopping</option>
          <option value='todo'>To-do</option>
        </select>

        <div className='flex items-center gap-3 my-4'>
          <input
            type='checkbox'
            id='isShared'
            checked={isShared}
            onChange={(e) => setIsShared(e.target.checked)}
            className='w-4 h-4 accent-brand-500'
          />
          <label htmlFor='isShared' className='text-sm text-neutral-700'>
            Shared — everyone in the space can check off items
          </label>
        </div>

        <Button type='submit'>Create</Button>
      </form>
      <Alert type={messageType} message={message} />
    </PageLayout>
  )
}
