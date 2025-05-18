import axios from './axios'

export const notificationSchedulerService = {
  getScheduledNotifications: async () => {
    try {
      const response = await axios.get('/notification/schedulers')
      return response.data
    } catch (error) {
      console.error('Error fetching scheduled notifications:', error)
      throw error
    }
  },

  scheduleNotification: async (schedulerData) => {
    try {
      const response = await axios.post('/schedule-notification', schedulerData)
      return response.data
    } catch (error) {
      console.error('Error scheduling notification:', error)
      throw error
    }
  },

  updateScheduledNotification: async (schedulerData) => {
    try {
      const response = await axios.patch('/schedule-notification', schedulerData)
      return response.data
    } catch (error) {
      console.error('Error updating scheduled notification:', error)
      throw error
    }
  },

  deleteScheduledNotification: async (id) => {
    try {
      const response = await axios.delete(`/schedule-notification/${id}`)
      return response.data
    } catch (error) {
      console.error('Error deleting scheduled notification:', error)
      throw error
    }
  }
} 