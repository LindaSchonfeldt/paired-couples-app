import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

import { Button, Input, PageLayout } from '../components'
import { useAuth } from '../context/AuthContext'
import { useListItems } from '../hooks/useListItems'
import { supabase } from '../utils/supabase'

type List = {
  id: number
  name: string
  is_shared: boolean
  created_by: string
  deadline: string | null
}

export const ListDetail = () => {
  const { user } = useAuth()
  const { listId } = useParams()
  const navigate = useNavigate()
  const [list, setList] = useState<List | null>(null)
  const [newItem, setNewItem] = useState('')
  const [addingType, setAddingType] = useState<'todo' | 'text' | null>(null)
  const { items, addItem, toggleItem } = useListItems(listId)

  useEffect(() => {
    if (!listId) return

    const fetchList = async () => {
      const { data, error } = await supabase
        .from('lists')
        .select('id, name, is_shared, created_by, deadline')
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

  const handleAdd = async () => {
    if (!addingType) return
    const titles = newItem
      .split(',')
      .map((t) => t.trim())
      .filter(Boolean)
    for (const title of titles) {
      await addItem(title, addingType)
    }
    setNewItem('')
    setAddingType(null)
  }

  return (
    <PageLayout title={list?.name ?? 'List'}>
      {items.length === 0 ? (
        <p className='text-sm text-neutral-400'>No items yet.</p>
      ) : (
        <ul className='flex flex-col gap-2'>
          {items.map((item) => (
            <li key={item.id} className='flex items-center gap-3'>
              {canToggle && item.type === 'todo' && (
                <input
                  type='checkbox'
                  checked={item.is_done}
                  onChange={() => toggleItem(item)}
                  className='w-4 h-4 accent-brand-500'
                />
              )}
              <span
                className={`text-sm ${item.is_done ? 'line-through text-neutral-400' : 'text-neutral-800'}`}
              >
                {item.title}
              </span>
              <span className='text-xs text-neutral-400'>
                {item.profiles?.display_name ?? 'Unknown'}
              </span>
            </li>
          ))}
        </ul>
      )}
      <div className='mt-6'>
        {addingType === null ? (
          <Button variant='ghost' onPress={() => setAddingType('todo')}>
            + Add item
          </Button>
        ) : (
          <div className='flex flex-col gap-2'>
            <div className='flex gap-2'>
              <Button
                variant={addingType === 'todo' ? 'primary' : 'ghost'}
                size='sm'
                onPress={() => setAddingType('todo')}
              >
                Todo
              </Button>
              <Button
                variant={addingType === 'text' ? 'primary' : 'ghost'}
                size='sm'
                onPress={() => setAddingType('text')}
              >
                Text
              </Button>
            </div>
            <div className='flex gap-2'>
              <Input
                placeholder='Add item...'
                value={newItem}
                onChange={setNewItem}
              />
              <Button variant='primary' size='sm' onPress={handleAdd}>
                Add
              </Button>
              <Button
                variant='ghost'
                size='sm'
                onPress={() => {
                  setAddingType(null)
                  setNewItem('')
                }}
              >
                Cancel
              </Button>
            </div>
          </div>
        )}
      </div>
      {list?.created_by === user?.id && (
        <Button
          variant='ghost'
          size='sm'
          onPress={() => navigate(`/lists/${listId}/manage`)}
        >
          Manage list
        </Button>
      )}
    </PageLayout>
  )
}
