import { PageLayout } from '../components'
import { useAuth } from '../context/AuthContext'
import { useEvents } from '../hooks/useEvents'

export const Calendars = () => {
  const { space } = useAuth()
  const { events } = useEvents(space?.id)

  return (
    <PageLayout title='Calendars'>
      {events.length === 0 ? (
        <p>No events yet.</p>
      ) : (
        <ul>
          {events.map((event) => (
            <li key={event.id}>
              {event.title} — {new Date(event.start_time).toLocaleString()}
            </li>
          ))}
        </ul>
      )}
    </PageLayout>
  )
}
