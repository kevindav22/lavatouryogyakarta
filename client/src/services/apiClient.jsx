import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'https://api.lavatouryogyakarta.com',
  //   baseURL: 'http://localhost:3000',
  withCredentials: true,
  headers: {},
});

apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('jwtToken');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const { data } = await axios.get('https://api.lavatouryogyakarta.com/token', { withCredentials: true });
        //       const { data } = await axios.get('https://localhost:3000/token', { withCredentials: true });
        const newAccessToken = data.accessToken;

        localStorage.setItem('jwtToken', newAccessToken);

        apiClient.defaults.headers.common['Authorization'] = `Bearer ${newAccessToken}`;
        originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;

        return apiClient(originalRequest);
      } catch (err) {
        alert('Sesi Anda telah berakhir. Silakan login kembali.');
        window.location.href = '/login';
        return Promise.reject(err);
      }
    }

    return Promise.reject(error);
  }
);

export default apiClient;
