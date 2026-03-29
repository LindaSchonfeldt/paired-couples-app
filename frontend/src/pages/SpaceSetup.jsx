import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '../utils/supabase'
import { useAuth } from '../context/AuthContext'

export const SpaceSetup = () => {
  const [name, setName] = useState('')
  const [message, setMessage] = useState('')
  const navigate = useNavigate()
  const { setSpace } = useAuth()

  const handleSubmit = async (e) => {
    e.preventDefault()

    const {
      data: { user }
    } = await supabase.auth.getUser()

    if (!user) {
      setMessage('Du måste vara inloggad för att skapa ett space.')
      return
    }

    const { data, error } = await supabase
      .from('spaces')
      .insert({ name })
      .select()
      .single()

    if (error) {
      console.error(error.message)
      setMessage(error.message)
      return
    }

    const { error: memberError } = await supabase.from('space_members').insert({
      space_id: data.id,
      user_id: user.id
    })

    if (memberError) {
      console.error(memberError.message)
      setMessage(memberError.message)
      return
    }

    setSpace(data)
    navigate('/space')
  }

  return (
    <div>
      <h1>Kom igång</h1>
      <p>Skapa ett nytt space eller gå med i ett befintligt.</p>
      <form onSubmit={handleSubmit}>
        <input
          type='text'
          placeholder='Namn på space'
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <button type='submit'>Skapa space</button>
        <button type='button'>Gå med i befintligt space</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  )
}
