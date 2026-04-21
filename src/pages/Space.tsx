import { useAuth } from '../context/AuthContext'

export const Space = () => {
  const { space } = useAuth()

  return (
    <div>
      <h1>{space?.name ?? 'Space'}</h1>
      {space ? (
        <p>Details for your space '{space.name}' will appear here.</p>
      ) : (
        <p>You don't have a space yet. Go to Setup to create one.</p>
      )}
    </div>
  )
}
