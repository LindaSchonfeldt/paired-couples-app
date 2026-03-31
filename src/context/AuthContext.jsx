import { createContext, useContext, useEffect, useState } from 'react'
import { supabase } from '../utils/supabase'

// Create a context object that will hold auth data for the entire app
const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  // Track the logged-in user (null = not logged in)
  const [user, setUser] = useState(null)
  // Track the space the user belongs to (null = no space yet)
  const [space, setSpace] = useState(null)
  // Prevent rendering until we know the auth state, to avoid flickering
  const [loading, setLoading] = useState(true)

  // Fetch the space that the user is a member of
  const fetchUserSpace = async (userId) => {
    const { data, error } = await supabase
      .from('space_members')
      // Get the space_id and join the spaces table to get id and name
      .select('space_id, spaces(id, name)')
      .eq('user_id', userId)
    if (error) console.error('fetchUserSpace:', error.message)
    // If data exists, set the space — otherwise set null
    setSpace(data?.[0]?.spaces ?? null) // Note: data is an array of memberships, we take the first one and get its space, otherwise null
  }

  useEffect(() => {
    // Check if there is an active session when the app first loads
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null)
      // If a user is logged in, fetch their space
      if (session?.user) {
        fetchUserSpace(session.user.id)
      }
      // Done loading — allow the app to render
      setLoading(false)
    })

    // Listen for auth changes (login, logout, token refresh)
    const {
      data: { subscription }
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null)
      if (session?.user) {
        // User logged in — fetch their space
        fetchUserSpace(session.user.id)
      } else {
        // User logged out — clear the space
        setSpace(null)
      }
    })

    // Clean up the listener when the component unmounts
    return () => subscription.unsubscribe()
  }, [])

  return (
    // Make user, space and loading available to the entire app
    // Only render children when loading is done to prevent flickering
    <AuthContext.Provider value={{ user, space, setSpace, loading }}>
      {!loading && children}
    </AuthContext.Provider>
  )
}

// Custom hook to access auth context from any component
// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => useContext(AuthContext)
