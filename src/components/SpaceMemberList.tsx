import { Button } from './Button'

type Member = {
  user_id: string
  profiles:
    | {
        display_name: string | null
      }[]
    | null
}

type Props = {
  members: Member[]
  onInvite: () => void
}

export const SpaceMemberList = ({ members, onInvite }: Props) => {
  return (
    <div>
      <h2 className='text-sm font-medium text-brand-500 mb-2'>Members</h2>
      {members.map((member) => (
        <p key={member.user_id}>
          {member.profiles?.[0]?.display_name ?? 'Unknown'}
        </p>
      ))}
      <Button variant='ghost' onPress={onInvite}>
        Invite members
      </Button>
    </div>
  )
}
