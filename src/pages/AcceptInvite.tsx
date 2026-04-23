import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

import { Alert, Button, PageLayout } from '../components'
import { useAuth } from '../context/AuthContext'
import { supabase } from '../utils/supabase'

export const AcceptInvite = () => {
  const { token } = useParams<{ token: string }>()
  const { user } = useAuth()
  const navigate = useNavigate()
  const [message, setMessage] = useState('')
  const [messageType, setMessageType] = useState<
    'error' | 'success' | 'info' | 'warning'
  >('info')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const handleInvite = async () => {
      const { data: invite, error } = await supabase
        .from('invites')
        .select('id, space_id, is_accepted')
        .eq('token', token)
        .single()

      if (error || !invite) {
        setMessageType('error')
        setMessage('Invalid or expired invite link.')
        setLoading(false)
        return
      }

      if (invite.is_accepted) {
        setMessageType('info')
        setMessage('This invite has already been used.')
        setLoading(false)
        return
      }

      if (!user) {
        setLoading(false)
        return
      }

      const { error: memberError } = await supabase
        .from('space_members')
        .insert({ space_id: invite.space_id, user_id: user.id })

      if (memberError) {
        setMessageType('error')
        setMessage(memberError.message)
        setLoading(false)
        return
      }

      await supabase
        .from('invites')
        .update({ is_accepted: true })
        .eq('id', invite.id)

      navigate(`/space/${invite.space_id}`)
    }

    handleInvite()
  }, [token, user])

  if (loading)
    return (
      <PageLayout title='Joining space...'>
        <p className='text-sm text-brand-500'>Please wait...</p>
      </PageLayout>
    )

  return (
    <PageLayout title='You have been invited!'>
      {!user ? (
        <div className='flex flex-col gap-3'>
          <p className='text-sm text-brand-500'>
            Create an account or log in to join the space.
          </p>
          <Button onPress={() => navigate(`/register?invite=${token}`)}>
            Register
          </Button>
          <Button
            variant='secondary'
            onPress={() => navigate(`/login?invite=${token}`)}
          >
            Log in
          </Button>
        </div>
      ) : (
        <Alert type={messageType} message={message} />
      )}
    </PageLayout>
  )
}
