import axios from 'axios';
// import { useNavigate } from 'react-router-dom';
import config from './config';
const api = axios.create({
  baseURL: config.baseURL,
  timeout: 10000,
});
// Cancel Token ve Source oluşturma
api.CancelToken = axios.CancelToken;
api.isCancel = axios.isCancel
api.Controller  = new AbortController();
let navigate;


api.setNavigate = (navigateInstance) => {
  navigate = navigateInstance;
};
// Axios interceptor ile yapılandırma ayarlarını ekle
api.interceptors.request.use((config) => {
  // İstek yapıldığında yapılacak işlemler
  config.headers['Content-Type'] = 'application/json';
  const accessToken = sessionStorage.getItem('accessToken');
  if (accessToken) {
    config.headers['Authorization'] = `Bearer ${accessToken}`;
  }
  return config;
});


api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    const refreshToken = sessionStorage.getItem('refreshToken');
    if (error?.response?.status === 401 && !originalRequest._retry && refreshToken) {
      originalRequest._retry = true;

      try {
        
        // Yenileme tokenini almak için API isteği yapılabilir
        const response = await axios.post(config.baseURL + config.refreshToken, {
          refreshToken: refreshToken,
        });

        const accessToken = response.data.accessToken;
         // Yenileme tokenini güncelle
         sessionStorage.setItem('accessToken', accessToken);

        // Yenileme tokenini güncelle
        api.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;

        // Önceki isteği tekrar dene
        return api(originalRequest);
      } catch (error) {
        // Yenileme tokeni alınamadıysa oturumu sonlandır veya başka bir işlem yap
        // Örneğin, kullanıcıyı oturum açma sayfasına yönlendirebilirsiniz
       navigate('/login');
      }
    }else {
      // Something happened in setting up the request that triggered an Error
      console.log('Error', error.message);
    }

    return Promise.reject(error);
  }
);

export default api;
