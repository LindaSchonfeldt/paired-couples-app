import { Link, useNavigate } from 'react-router-dom'
import { supabase } from '../utils/supabase'
import { HiOutlineHome } from 'react-icons/hi2'

export const Navbar = () => {
  const navigate = useNavigate()

  const handleSignOut = async () => {
    await supabase.auth.signOut()
    navigate('/login')
  }

  return (
    <nav className='flex items-center gap-6 px-6 py-4 bg-white border-b border-neutral-200'>
      <Link
        to='/'
        className='text-sm font-medium text-neutral-700 hover:text-neutral-900'
      >
        <HiOutlineHome size={22} />
      </Link>
      <Link
        to='/spaces'
        className='text-sm font-medium text-neutral-700 hover:text-neutral-900'
      >
        Spaces
      </Link>
      <Link
        to='/calendars'
        className='text-sm font-medium text-neutral-700 hover:text-neutral-900'
      >
        Calendars
      </Link>
      <Link
        to='/lists'
        className='text-sm font-medium text-neutral-700 hover:text-neutral-900'
      >
        Lists
      </Link>
      <button
        onClick={handleSignOut}
        className='ml-auto text-sm font-medium text-neutral-500 hover:text-neutral-900'
      >
        Sign out
      </button>
    </nav>
  )
}
