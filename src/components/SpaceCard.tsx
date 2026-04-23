import { useNavigate } from 'react-router-dom'

type Props = {
  id: number
  name: string
  memberCount: number
  color?: string
}

export const SpaceCard = ({
  id,
  name,
  memberCount,
  color = '#e5e5e5'
}: Props) => {
  const navigate = useNavigate()

  return (
    <div
      className='flex items-center gap-4 p-4 rounded-2xl border border-brand-100 cursor-pointer hover:bg-brand-50'
      onClick={() => navigate(`/space/${id}`)}
    >
      <div
        className='w-10 h-10 rounded-xl flex-shrink-0'
        style={{ backgroundColor: color }}
      />
      <div>
        <p className='font-medium text-brand-900'>{name}</p>
        <p className='text-sm text-brand-500'>{memberCount} members</p>
      </div>
    </div>
  )
}
