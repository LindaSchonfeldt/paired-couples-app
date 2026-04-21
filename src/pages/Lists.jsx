import { useEffect, useState } from 'react'

import { useAuth } from '../context/AuthContext'
import { supabase } from '../utils/supabase'

export const Lists = () => {
  const { space } = useAuth()
  const [lists, setLists] = useState([])

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
    <div>
      <h1>Lists</h1>
      {lists.map((list) => (
        <p key={list.id}>
          {list.name} ({list.type})
        </p>
      ))}
    </div>
  )
}
