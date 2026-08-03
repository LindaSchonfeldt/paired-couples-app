import { useEffect, useState } from 'react'

import { useAuth } from '../context/AuthContext'
import { supabase } from '../utils/supabase'

type Event = {
  id: number
  title: string
  description: string | null
  is_all_day: boolean
  start_time: string
  end_time: string | null
  created_by: string
}

export const useEvents = (spaceId: string | undefined) => {
  const { user } = useAuth()
  const [events, setEvents] = useState<Event[]>([])

  useEffect(() => {
    if (!spaceId) return

    const fetchEvents = async () => {
      const { data, error } = await supabase
        .from('events')
        .select('id, title, description, is_all_day, start_time, end_time, created_by')
        .eq('space_id', spaceId)
        .order('start_time')

      if (error) {
        console.error(error.message)
        return
      }

      setEvents(data as Event[])
    }

    fetchEvents()
  }, [spaceId])

  const addEvent = async ({
    title,
    description,
    isAllDay,
    startTime,
    endTime
  }: {
    title: string
    description?: string
    isAllDay: boolean
    startTime: string
    endTime?: string
  }) => {
    if (!title.trim() || !spaceId) return

    const { data, error } = await supabase
      .from('events')
      .insert({
        space_id: Number(spaceId),
        title: title.trim(),
        description: description?.trim() || null,
        is_all_day: isAllDay,
        start_time: startTime,
        end_time: endTime || null,
        created_by: user?.id
      })
      .select('id, title, description, is_all_day, start_time, end_time, created_by')
      .single()

    if (error) {
      console.error(error.message)
      return
    }

    setEvents((prev) => [...prev, data as Event])
  }

  return { events, addEvent }
}
