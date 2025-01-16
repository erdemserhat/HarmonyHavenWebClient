import { useState, useCallback } from 'react'
import { authService } from '../services/api/auth.service'

export const useAuth = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)

  const login = useCallback(async (credentials) => {
    try {
      setIsLoading(true)
      setError(null)
      const response = await authService.login(credentials)
      return response
    } catch (err) {
      setError(err.message || 'An error occurred during login')
      throw err
    } finally {
      setIsLoading(false)
    }
  }, [])

  return {
    login,
    isLoading,
    error,
  }
} 