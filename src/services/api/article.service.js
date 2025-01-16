import axios from './axios'

export const articleService = {
  getAllArticles: async () => {
    const response = await axios.get('/api/v1/articles')
    return response.data
  },

  getArticleById: async (id) => {
    const response = await axios.get(`/api/v1/articles/${id}`)
    return response.data
  }
} 