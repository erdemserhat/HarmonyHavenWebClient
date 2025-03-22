import axios from './axios'


export const googleService = {
    login: async (credentials) => {
        try {
            console.log("Gönderilen body:", credentials);
            const response = await axios.post('user/authenticate-google', {
                googleIdToken: credentials
            });
            console.log("Sunucudan gelen yanıt:", response);

            if (response.status === 200) {
                console.log("okkk")
                return response.data;
            } else {
                throw new Error(response.data?.message || "Authentication failed");
            }
        } catch (error) {
            console.error("Giriş hatası:", error);
            throw error.response?.data || error.message || "Giriş başarısız oldu.";
        }
    }
}