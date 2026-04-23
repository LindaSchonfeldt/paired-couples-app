import { useEffect, useState } from 'react'

import { useAuth } from '../context/AuthContext'
import { supabase } from '../utils/supabase'

type ListItem = {
  id: number
  title: string
  is_done: boolean
  created_by: string
  profiles: { display_name: string | null } | null
}

export const useListItems = (listId: string | undefined) => {
  const { user } = useAuth()
  const [items, setItems] = useState<ListItem[]>([])

  useEffect(() => {
    if (!listId) return

    const fetchItems = async () => {
      const { data, error } = await supabase
        .from('list_items')
        .select('id, title, is_done, created_by, profiles(display_name)')
        .eq('list_id', listId)

      if (error) {
        console.error(error.message)
        return
      }

      setItems(data as unknown as ListItem[])
    }

    fetchItems()
  }, [listId])

  const addItem = async (title: string) => {
    if (!title.trim() || !listId) return

    const { data, error } = await supabase
      .from('list_items')
      .insert({ list_id: Number(listId), title: title.trim(), is_done: false, created_by: user?.id })
      .select('id, title, is_done, created_by, profiles(display_name)')
      .single()

    if (error) {
      console.error(error.message)
      return
    }

    setItems((prev) => [...prev, data as unknown as ListItem])
  }

  const toggleItem = async (item: ListItem) => {
    const { error } = await supabase
      .from('list_items')
      .update({ is_done: !item.is_done })
      .eq('id', item.id)

    if (error) {
      console.error(error.message)
      return
    }

    setItems((prev) =>
      prev.map((i) => (i.id === item.id ? { ...i, is_done: !i.is_done } : i))
    )
  }

  return { items, addItem, toggleItem }
}
