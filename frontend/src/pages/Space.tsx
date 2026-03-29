import { useAuth } from '../context/AuthContext'

export const Space = () => {
  const { space } = useAuth()

  return (
    <div>
      <h1>{space?.name ?? 'Space'}</h1>
      {space ? (
        <p>Detaljer för ditt space '{space.name}' visas här.</p>
      ) : (
        <p>Du har inget space ännu. Gå till Setup för att skapa ett.</p>
      )}
    </div>
  )
}
