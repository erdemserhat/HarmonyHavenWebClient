import axios from './axios'

export const notificationService = {
  getNotifications: async (page = 1, size = 40) => {
    try {
      const response = await axios.get(`/user/get-notifications?page=${page}&size=${size}`)
      return response.data
    } catch (error) {
      console.error('Error fetching notifications:', error)
      throw error
    }
  }
} 