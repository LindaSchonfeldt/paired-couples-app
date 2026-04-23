import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

import { Button, Input, PageLayout } from '../components'
import { useAuth } from '../context/AuthContext'
import { useListItems } from '../hooks/useListItems'
import { supabase } from '../utils/supabase'

type List = {
  id: number
  name: string
  type: string
  is_shared: boolean
  created_by: string
}

export const ListDetail = () => {
  const { user } = useAuth()
  const { listId } = useParams()
  const [list, setList] = useState<List | null>(null)
  const [newItem, setNewItem] = useState('')
  const [sortBy, setSortBy] = useState<'title' | 'user'>('title')
  const { items, addItem, toggleItem } = useListItems(listId)

  useEffect(() => {
    if (!listId) return

    const fetchList = async () => {
      const { data, error } = await supabase
        .from('lists')
        .select('id, name, type, is_shared, created_by')
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

  const canToggle = list?.is_shared || list?.created_by === user?.id

  const sortedItems = [...items].sort((a, b) => {
    if (sortBy === 'title') return a.title.localeCompare(b.title)
    const nameA = a.profiles?.display_name ?? ''
    const nameB = b.profiles?.display_name ?? ''
    return nameA.localeCompare(nameB)
  })

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

      {items.length > 0 && (
        <div className='flex gap-2 mb-4'>
          <Button variant={sortBy === 'title' ? 'primary' : 'ghost'} onPress={() => setSortBy('title')}>
            Name
          </Button>
          <Button variant={sortBy === 'user' ? 'primary' : 'ghost'} onPress={() => setSortBy('user')}>
            User
          </Button>
        </div>
      )}

      {items.length === 0 ? (
        <p className='text-sm text-neutral-400'>No items yet.</p>
      ) : (
        <ul className='flex flex-col gap-2'>
          {sortedItems.map((item) => (
            <li key={item.id} className='flex items-center gap-3'>
              {canToggle && (
                <input
                  type='checkbox'
                  checked={item.is_done}
                  onChange={() => toggleItem(item)}
                  className='w-4 h-4 accent-brand-500'
                />
              )}
              <span className={`text-sm ${item.is_done ? 'line-through text-neutral-400' : 'text-neutral-800'}`}>
                {item.title}
              </span>
              <span className='text-xs text-neutral-400'>
                {item.profiles?.display_name ?? 'Unknown'}
              </span>
            </li>
          ))}
        </ul>
      )}
    </PageLayout>
  )
}
