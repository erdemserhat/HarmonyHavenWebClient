import axios from './axios'

export const authService = {
  login: async (credentials) => {
    try {
      console.log("Gönderilen body:", credentials); // İstekten önce body'yi yazdır
      const response = await axios.post('/api/v1/user/authenticate', credentials);
      console.log("Sunucudan gelen yanıt:", response);

      // Check both validation results and authentication status
      if (response.status === 200) {
        console.log("Giriş başarılı.");
        return {
          isAuthenticated: true,
          jwt: response.data.jwt,
        };
      } else {
        // Handle validation errors
        const errorMessage =
            response.data.formValidationResult?.errorMessage ||
            response.data.credentialsValidationResult?.errorMessage ||
            "Authentication failed";
        throw new Error(errorMessage);
      }
    } catch (error) {
      console.error("Giriş hatası:", error);
      throw error.response?.data?.message || error.message || "Giriş başarısız oldu.";
    }
  },


  logout: () => {
    // Set the JWT cookie with an expiration date in the past
    document.cookie = "auth_token=; Path=/; Expires=Thu, 01 Jan 1970 00:00:00 UTC; Secure; SameSite=Lax";
    console.log("User logged out, JWT cookie cleared.");
  },


  isAuthenticated:async () => {
    // Verify authentication status by making a request
    try {
      const response = await axios.post('/api/v1/user/authenticate')

      if (response.status === 200) {
        // If the server responds with 200, the user is authenticated
        return true;
      } else {
        // If the server responds with an error, the user is not authenticated
        return false;
      }
    } catch (error) {
      console.error('Error while verifying authentication:', error);
      return false; // Treat errors as unauthenticated
    }
  },



  register: async (userData) => {
    const response = await fetch('https://harmonyhavenappserver.erdemserhat.com/api/v1/user/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
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
