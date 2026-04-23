import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { Button, PageLayout, SpaceCard } from '../components'
import { useAuth } from '../context/AuthContext'
import { supabase } from '../utils/supabase'

type Space = {
  id: number
  name: string
}

export const Spaces = () => {
  const { user } = useAuth()
  const [spaces, setSpaces] = useState<Space[]>([])
  const navigate = useNavigate()

  useEffect(() => {
    if (!user) return

    const fetchSpaces = async () => {
      const { data, error } = await supabase
        .from('space_members')
        .select('spaces(id, name)')
        .eq('user_id', user.id)

      if (error) {
        console.error(error.message)
        return
      }

      const result = data
        .map((row) => row.spaces as unknown as Space)
        .filter((s): s is Space => s !== null && s !== undefined)

      setSpaces(result)
    }

    fetchSpaces()
  }, [user?.id])

  return (
    <PageLayout title='Spaces'>
      {spaces.map((space) => (
        <SpaceCard
          key={space.id}
          id={space.id}
          name={space.name}
          memberCount={0}
        />
      ))}
      <Button variant='primary' onPress={() => navigate('/create-space')}>
        Create space
      </Button>
    </PageLayout>
  )
}
