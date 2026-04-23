import { useState } from 'react'
import { useParams } from 'react-router-dom'

import { Alert, Button, PageLayout } from '../components'
import { useAuth } from '../context/AuthContext'
import { supabase } from '../utils/supabase'

export const Invite = () => {
  const { spaceId } = useParams<{ spaceId: string }>()
  const { user } = useAuth()
  const [inviteLink, setInviteLink] = useState('')
  const [copied, setCopied] = useState(false)
  const [message, setMessage] = useState('')
  const [messageType, setMessageType] = useState<
    'error' | 'success' | 'info' | 'warning'
  >('error')

  const handleGenerate = async () => {
    const { data, error } = await supabase
      .from('invites')
      .insert({ space_id: Number(spaceId), created_by: user.id })
      .select('token')
      .single()

    if (error) {
      setMessageType('error')
      setMessage(error.message)
      return
    }

    const link = `${window.location.origin}/invite/${data.token}`
    setInviteLink(link)
  }

  const handleCopy = () => {
    navigator.clipboard.writeText(inviteLink)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <PageLayout title='Invite member'>
      <p className='text-sm text-brand-500 mb-4'>
        Generate a link and share it with someone you want to invite.
      </p>
      {!inviteLink ? (
        <Button onPress={handleGenerate}>Generate invite link</Button>
      ) : (
        <div className='flex flex-col gap-3'>
          <p className='text-sm break-all bg-brand-50 p-3 rounded-xl'>
            {inviteLink}
          </p>
          <Button onPress={handleCopy} variant='secondary'>
            {copied ? 'Copied!' : 'Copy link'}
          </Button>
        </div>
      )}
      <Alert type={messageType} message={message} />
    </PageLayout>
  )
}
