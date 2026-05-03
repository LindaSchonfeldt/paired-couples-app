import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

import { Button, PageLayout } from '../components'
import { useAuth } from '../context/AuthContext'
import { useListItems } from '../hooks/useListItems'
import { supabase } from '../utils/supabase'

type List = {
  id: number
  name: string
  created_by: string
}

export const ListManage = () => {
  const { user } = useAuth()
  const { listId } = useParams()
  const navigate = useNavigate()
  const [list, setList] = useState<List | null>(null)
  const [selectedIds, setSelectedIds] = useState<number[]>([])
  const [confirmDelete, setConfirmDelete] = useState(false)
  const { items, deleteItems } = useListItems(listId)

  useEffect(() => {
    if (!listId) return

    const fetchList = async () => {
      const { data, error } = await supabase
        .from('lists')
        .select('id, name, created_by')
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

  const toggleSelect = (id: number) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    )
  }

  const handleDeleteSelected = async () => {
    await deleteItems(selectedIds)
    setSelectedIds([])
  }

  const handleDeleteList = async () => {
    await deleteItems(items.map((i) => i.id))
    await supabase.from('lists').delete().eq('id', listId)
    navigate('/lists')
  }

  if (list?.created_by !== user?.id) return null

  return (
    <PageLayout title={`Manage: ${list?.name ?? ''}`}>
      <ul className='flex flex-col gap-2 mb-6'>
        {items.map((item) => (
          <li key={item.id} className='flex items-center gap-3'>
            <input
              type='checkbox'
              checked={selectedIds.includes(item.id)}
              onChange={() => toggleSelect(item.id)}
              className='w-4 h-4 accent-brand-500'
            />
            <span className='text-sm text-neutral-800'>{item.title}</span>
          </li>
        ))}
      </ul>

      <div className='flex flex-col gap-2'>
        <Button
          variant='danger'
          onPress={handleDeleteSelected}
          disabled={selectedIds.length === 0}
        >
          Delete selected ({selectedIds.length})
        </Button>
        {confirmDelete ? (
          <div className='flex flex-col gap-2'>
            <p className='text-sm text-neutral-700 text-center'>
              Are you sure you want to delete the entire list?
            </p>
            <div className='flex gap-2 justify-center'>
              <Button variant='danger' onPress={handleDeleteList}>
                Yes, delete
              </Button>
              <Button variant='ghost' onPress={() => setConfirmDelete(false)}>
                Cancel
              </Button>
            </div>
          </div>
        ) : (
          <Button variant='danger' onPress={() => setConfirmDelete(true)}>
            Delete entire list
          </Button>
        )}
        <Button variant='ghost' onPress={() => navigate(`/lists/${listId}`)}>
          Cancel
        </Button>
      </div>
    </PageLayout>
  )
}
