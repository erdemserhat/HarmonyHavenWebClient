import axios from './axios'

export const authService = {
  login: async (credentials) => {
    try {
      console.log("Gönderilen body:", credentials);
      const response = await axios.post('/user/authenticate', credentials);
      console.log("Sunucudan gelen yanıt:", response);

      if (response.status === 200) {
        return response.data;
      } else {
        throw new Error(response.data?.message || "Authentication failed");
      }
    } catch (error) {
      console.error("Giriş hatası:", error);
      throw error.response?.data || error.message || "Giriş başarısız oldu.";
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
    try {
      const response = await axios.post('/user/register', {
        name: userData.name,
        surname: "Default",
        email: userData.email,
        password: userData.password,
        gender: "",
        profilePhotoPath: "-"
      });

      if (response.status === 200) {
        return response.data;
      } else {
        throw new Error(response.data?.message || 'Kayıt işlemi başarısız');
      }
    } catch (error) {
      console.error("Kayıt hatası:", error);
      throw error.response?.data || error.message || "Kayıt işlemi başarısız oldu.";
    }
  }
}
