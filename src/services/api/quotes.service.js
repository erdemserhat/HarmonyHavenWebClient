import axios from './axios'

export const quotesService = {
  getQuotes: async (categories = [1], page = 1, pageSize = 10, seed = Math.floor(Math.random() * 1000000)) => {
    try {
      const requestPayload = {
        categories,
        page,
        pageSize,
        seed
      }

      console.log('Making POST request to /api/v3/get-quotes with payload:', requestPayload)

      const response = await axios.post('/api/v3/get-quotes', requestPayload)

      console.log('Response:', response.data)
      return response.data
    } catch (error) {
      console.error('Error details:', {
        message: error.message,
        status: error.response?.status,
        data: error.response?.data,
        config: error.config
      })
      throw error
    }
  }
}
//