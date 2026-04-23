import { useNavigate } from 'react-router-dom'

import { Button } from './Button'

type List = {
  id: number
  name: string
  type: string
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
          <p key={list.id}>
            {list.name} ({list.type})
          </p>
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
