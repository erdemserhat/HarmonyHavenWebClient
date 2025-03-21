import axios from './axios'

export const authService = {
  login: async (credentials) => {
    try {
      console.log("Gönderilen body:", credentials);
      const response = await axios.post('/user/authenticate', credentials);
      console.log("Sunucudan gelen yanıt:", response);

      if (response.status === 200) {
        console.log("Giriş başarılı.");
        return {
          isAuthenticated: true,
          jwt: response.data.jwt,
        };
      } else {
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
    document.cookie = "auth_token=; Path=/; Expires=Thu, 01 Jan 1970 00:00:00 UTC; Secure; SameSite=Lax";
    console.log("User logged out, JWT cookie and localStorage cleared.");
  },

  isAuthenticated: async () => {
    try {
      const response = await axios.get('check-auth-status');
      console.log(response);

      return response.status === 200;
    } catch (error) {
      console.error('Error while verifying authentication:', error);
      return false;
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
