import { useNavigate } from 'react-router-dom'

import { Button } from './Button'

type List = {
  id: number
  name: string
}

type Props = {
  lists: List[]
  spaceId: string
}

export const SpaceListSection = ({ lists, spaceId }: Props) => {
  const navigate = useNavigate()

  return (
    <div>
      <h2 className='text-sm font-medium text-brand-500 mb-2'>Lists</h2>
      {lists.length === 0 ? (
        <p className='text-sm text-brand-500'>No lists yet.</p>
      ) : (
        lists.map((list) => (
          <button
            key={list.id}
            onClick={() => navigate(`/lists/${list.id}`)}
            className='w-full text-left px-3 py-2 rounded-lg hover:bg-neutral-100 text-sm text-neutral-800'
          >
            {list.name}
          </button>
        ))
      )}
      <Button
        variant='ghost'
        onPress={() => navigate(`/lists/new?spaceId=${spaceId}`)}
      >
        Create list
      </Button>
    </div>
  )
}
