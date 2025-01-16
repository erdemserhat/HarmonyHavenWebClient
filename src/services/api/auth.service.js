import axios from './axios'

export const authService = {
  login: async (credentials) => {
    try {
      const response = await axios.post('/api/v1/user/authenticate', credentials)
      
      // Check both validation results and authentication status
      if (response.data.isAuthenticated && response.data.jwt) {
        localStorage.setItem('auth_token', response.data.jwt)
        return {
          isAuthenticated: true,
          jwt: response.data.jwt
        }
      } else {
        // Handle validation errors
        const errorMessage = response.data.formValidationResult?.errorMessage || 
                           response.data.credentialsValidationResult?.errorMessage ||
                           'Authentication failed'
        throw new Error(errorMessage)
      }
    } catch (error) {
      console.error('Login error:', error)
      throw error.response?.data?.message || error.message || 'Login failed'
    }
  },

  logout: () => {
    localStorage.removeItem('auth_token')
  },

  isAuthenticated: () => {
    return !!localStorage.getItem('auth_token')
  },

  register: async (userData) => {
    const response = await fetch('https://harmonyhavenappserver.erdemserhat.com/api/v1/user/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'harmonyhavenapikey': 'harmonyhavenapikeyK12yW8CBSoBfy41Cu6b3UDbMfEjijD0cKp4K166z29CADrYT4nRtOolZlOxGaOL5X7wmXY9fqyiFRvLeCB2OYS6J9x5zYbtSuiqsieelAD2lo9'
      },
      body: JSON.stringify({
        name: userData.name,
        surname: "Default",
        email: userData.email,
        password: userData.password,
        gender: "",
        profilePhotoPath: "-"
      })
    })

    if (!response.ok) {
      const error = await response.json()
      throw new Error(error.message || 'Kayıt işlemi başarısız')
    }

    return response.json()
  }
} 