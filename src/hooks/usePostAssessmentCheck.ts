import { useState, useEffect } from 'react'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || '',
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''
)

export function usePostAssessmentCheck() {
  const [isBlocked, setIsBlocked] = useState(false)
  const [showModal, setShowModal] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const checkPostAssessment = async () => {
      try {
        const { data: { user } } = await supabase.auth.getUser()
        if (!user) {
          setLoading(false)
          return
        }

        // Get user progress
        const { data: progressData } = await supabase
          .from('user_progress')
          .select('lesson_path')
          .eq('user_id', user.id)

        if (!progressData) {
          setLoading(false)
          return
        }

        // Calculate progress
        const base2Count = progressData.filter(item => item.lesson_path.includes('/base2/')).length
        const apply1Count = progressData.filter(item => item.lesson_path.includes('/apply1/')).length
        
        const base2Progress = Math.round((base2Count / 6) * 100)
        const apply1Progress = Math.round((apply1Count / 6) * 100)

        // Check if qualifies for post-assessment
        if (base2Progress >= 50 && apply1Progress >= 50) {
          // Check if already completed after assessment
          const { data: afterAssessment } = await supabase
            .from('user_assessments')
            .select('*')
            .eq('user_id', user.id)
            .eq('assessment_time', 'after')
            .single()

          if (!afterAssessment) {
            setIsBlocked(true)
            setShowModal(true)
          }
        }
      } catch (error) {
        console.error('Error checking post-assessment:', error)
      } finally {
        setLoading(false)
      }
    }

    checkPostAssessment()
  }, [])

  return { isBlocked, showModal, setShowModal, loading }
}