import axios from './axios'

export const notificationService = {
  getNotifications: async (page = 1, size = 20) => {
    const response = await axios.get(`/api/v1/user/get-notifications?page=${page}&size=${size}`)
    return response.data
  }
} 