import { Link, useNavigate } from 'react-router-dom'
import { supabase } from '../utils/supabase'

export const Navbar = () => {
  const navigate = useNavigate()

  const handleSignOut = async () => {
    await supabase.auth.signOut()
    navigate('/login')
  }

  return (
    <nav>
      <Link to='/'>Hem</Link>
      <Link to='/calendar'>Kalender</Link>
      <Link to='/lists'>Listor</Link>
      <button onClick={handleSignOut}>Logga ut</button>
    </nav>
  )
}
