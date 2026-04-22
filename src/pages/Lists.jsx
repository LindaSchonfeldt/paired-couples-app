import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { useAuth } from '../context/AuthContext'
import { supabase } from '../utils/supabase'
import { Button, PageLayout } from '../components'
import { MdDelete, MdModeEditOutline } from 'react-icons/md'

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
        <div key={list.id}>
          <p>
            {list.name} ({list.type})
          </p>
          <Button variant='danger' size='sm'>
            <MdDelete />
          </Button>
          <Button variant='primary' size='sm'>
            <MdModeEditOutline />
          </Button>
        </div>
      ))}
      <Button onPress={() => navigate('/lists/new')}>Create list</Button>
    </PageLayout>
  )
}
