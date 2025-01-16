import axios from './axios'

export const categoryService = {
  getAllCategories: async () => {
    const response = await axios.get('/categories')
    return response.data
  }
} 