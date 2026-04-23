import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

import {
  PageLayout,
  SpaceListSection,
  SpaceMemberList,
  SpaceCalendarSection
} from '../components'
import { useAuth } from '../context/AuthContext'
import { supabase } from '../utils/supabase'

type Member = {
  user_id: string
  profiles:
    | {
        display_name: string | null
      }[]
    | null
}

type List = {
  id: number
  name: string
  type: string
}

export const Space = () => {
  const { space } = useAuth()
  const [members, setMembers] = useState<Member[]>([])
  const { spaceId } = useParams()
  const [lists, setLists] = useState<List[]>([])
  const navigate = useNavigate()

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

      const unique = data.filter(
        (m, i, self) => self.findIndex(x => x.user_id === m.user_id) === i
      )
      setMembers(unique)
    }

    fetchMembers()

    const fetchLists = async () => {
      const { data, error } = await supabase
        .from('lists')
        .select('id, name, type')
        .eq('space_id', spaceId)

      if (error) {
        console.error(error.message)
        return
      }

      const unique = data.filter(
        (l, i, self) => self.findIndex(x => x.id === l.id) === i
      )
      setLists(unique)
    }

    fetchLists()
  }, [space?.id, spaceId])

  return (
    <PageLayout title={space?.name ?? 'Space'}>
      <SpaceMemberList
        members={members}
        onInvite={() => navigate(`/space/${spaceId}/invite`)}
      />

      <SpaceCalendarSection
        onLinkCalendar={() => navigate(`/space/${spaceId}/calendar`)}
      />

      <SpaceListSection lists={lists} spaceId={spaceId ?? ''} />
    </PageLayout>
  )
}
