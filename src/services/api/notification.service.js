import axios from './axios'

export const notificationService = {
  getNotifications: async (page = 1, size = 40) => {
    const response = await axios.get(`/user/get-notifications?page=${page}&size=${size}`)
    return response.data
  }
} 