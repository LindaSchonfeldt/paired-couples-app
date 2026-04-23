import { Button } from './Button'

type Props = {
  onLinkCalendar: () => void
}

export const SpaceCalendarSection = ({ onLinkCalendar }: Props) => {
  return (
    <div>
      <h2 className='text-sm font-medium text-brand-500 mb-2'>Calendar</h2>
      <p className='text-sm text-brand-500'>No calendar yet.</p>
      <Button variant='ghost' onPress={onLinkCalendar}>
        Link calendar
      </Button>
    </div>
  )
}
