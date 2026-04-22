import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

import { PageLayout } from '../components'
import { useAuth } from '../context/AuthContext'
import { supabase } from '../utils/supabase'

type Member = {
  user_id: string
  profiles: {
    display_name: string | null
  }[] | null
}

export const Space = () => {
  const { space } = useAuth()
  const [members, setMembers] = useState<Member[]>([])

  useEffect(() => {
    if (!space) return

    const fetchMembers = async () => {
      const { data, error } = await supabase
        .from('space_members')
        .select('user_id, profiles(display_name)')
        .eq('space_id', space.id)

      if (error) {
        console.error(error.message)
        return
      }

      setMembers(data)
    }

    fetchMembers()
  }, [space])

  return (
    <PageLayout title={space?.name ?? 'Space'}>
      <h2 className='text-sm font-medium text-brand-500 mb-2'>Members</h2>
      {members.map((member) => (
        <p key={member.user_id}>{member.profiles?.[0]?.display_name ?? 'Unknown'}</p>
      ))}

      <h2 className='text-sm font-medium text-brand-500 mt-6 mb-2'>
        Quick links
      </h2>
      <Link to='/lists'>Lists</Link>
      <Link to='/calendar'>Calendar</Link>
    </PageLayout>
  )
}
