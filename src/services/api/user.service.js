import axios from './axios'

export const userService = {
  getUserInfo: async () => {
    try {
      const response = await axios.get('/api/v1/user/get-information')
      return response.data
    } catch (error) {
      console.error('Error fetching user info:', error)
      throw error
    }
  }
} 