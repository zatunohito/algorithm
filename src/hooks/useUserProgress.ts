import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'

export function useUserProgress(lessonPath: string) {
  const [user, setUser] = useState<{ id: string } | null>(null)
  const [isCompleted, setIsCompleted] = useState(false)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const getUser = async () => {
      try {
        const { data: { user }, error: authError } = await supabase.auth.getUser()
        if (authError) throw authError
        
        setUser(user)
        
        if (user) {
          const { data, error: progressError } = await supabase
            .from('user_progress')
            .select('lesson_path')
            .eq('user_id', user.id)
            .eq('lesson_path', lessonPath)
            .single()
          
          if (progressError && progressError.code !== 'PGRST116') {
            throw progressError
          }
          
          setIsCompleted(!!data)
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'エラーが発生しました')
      } finally {
        setLoading(false)
      }
    }
    
    getUser()
  }, [lessonPath])

  const handleComplete = async () => {
    if (!user) return
    
    try {
      if (isCompleted) {
        const { error } = await supabase
          .from('user_progress')
          .delete()
          .eq('user_id', user.id)
          .eq('lesson_path', lessonPath)
        
        if (error) throw error
        setIsCompleted(false)
      } else {
        const { error } = await supabase
          .from('user_progress')
          .upsert({ user_id: user.id, lesson_path: lessonPath })
        
        if (error) throw error
        setIsCompleted(true)
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'エラーが発生しました')
    }
  }

  return { user, isCompleted, loading, error, handleComplete }
}

export function useAllUserProgress() {
  const [user, setUser] = useState<{ id: string } | null>(null)
  const [completedLessons, setCompletedLessons] = useState<string[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const getUser = async () => {
      try {
        const { data: { user }, error: authError } = await supabase.auth.getUser()
        if (authError) throw authError
        
        setUser(user)
        
        if (user) {
          const { data, error: progressError } = await supabase
            .from('user_progress')
            .select('lesson_path')
            .eq('user_id', user.id)
          
          if (progressError) throw progressError
          
          if (data) {
            setCompletedLessons(data.map(item => item.lesson_path))
          }
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'エラーが発生しました')
      } finally {
        setLoading(false)
      }
    }
    
    getUser()
  }, [])

  const isCompleted = (lessonPath: string) => {
    return completedLessons.includes(lessonPath)
  }

  return { user, completedLessons, isCompleted, loading, error }
}