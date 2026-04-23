import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

import { Button, Input, PageLayout } from '../components'
import { useListItems } from '../hooks/useListItems'
import { supabase } from '../utils/supabase'

type List = {
  id: number
  name: string
  type: string
}

export const ListDetail = () => {
  const { listId } = useParams()
  const [list, setList] = useState<List | null>(null)
  const [newItem, setNewItem] = useState('')
  const { items, addItem, toggleItem } = useListItems(listId)

  useEffect(() => {
    if (!listId) return

    const fetchList = async () => {
      const { data, error } = await supabase
        .from('lists')
        .select('id, name, type')
        .eq('id', listId)
        .single()

      if (error) {
        console.error(error.message)
        return
      }

      setList(data)
    }

    fetchList()
  }, [listId])

  const handleAdd = async () => {
    const titles = newItem.split(',').map((t) => t.trim()).filter(Boolean)
    for (const title of titles) {
      await addItem(title)
    }
    setNewItem('')
  }

  return (
    <PageLayout title={list?.name ?? 'List'}>
      <div className='flex gap-2 mb-6'>
        <Input
          placeholder='Add item...'
          value={newItem}
          onChange={setNewItem}
        />
        <Button variant='primary' onPress={handleAdd}>
          Add
        </Button>
      </div>

      {items.length === 0 ? (
        <p className='text-sm text-neutral-400'>No items yet.</p>
      ) : (
        <ul className='flex flex-col gap-2'>
          {items.map((item) => (
            <li key={item.id} className='flex items-center gap-3'>
              <input
                type='checkbox'
                checked={item.is_done}
                onChange={() => toggleItem(item)}
                className='w-4 h-4 accent-brand-500'
              />
              <span className={`text-sm ${item.is_done ? 'line-through text-neutral-400' : 'text-neutral-800'}`}>
                {item.title}
              </span>
            </li>
          ))}
        </ul>
      )}
    </PageLayout>
  )
}
