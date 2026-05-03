import { useEffect, useState } from 'react'
import { MdDelete, MdModeEditOutline } from 'react-icons/md'
import { useNavigate } from 'react-router-dom'

import { Button, PageLayout } from '../components'
import { useAuth } from '../context/AuthContext'
import { supabase } from '../utils/supabase'

export const Lists = () => {
  const { space } = useAuth()
  const [lists, setLists] = useState([])
  const navigate = useNavigate()

  useEffect(() => {
    if (!space) return

    const fetchLists = async () => {
      const { data, error } = await supabase
        .from('lists')
        .select('*')
        .eq('space_id', space.id)

      if (error) {
        console.error(error.message)
        return
      }

      setLists(data)
    }

    fetchLists()
  }, [space])

  return (
    <PageLayout title='Lists'>
      {lists.map((list) => (
        <div key={list.id} className='flex items-center justify-between'>
          <Button variant='ghost' onPress={() => navigate(`/lists/${list.id}`)}>
            {list.name}
          </Button>
        </div>
      ))}
      <Button onPress={() => navigate('/lists/new')}>Create list</Button>
    </PageLayout>
  )
}
