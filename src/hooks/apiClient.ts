import axios from 'axios'
import { getCookie } from "cookies-next";

// Define the base URL for your API
const API_URL = process.env.NEXT_PUBLIC_API_URL // Replace with your actual backend URL

// Create an Axios instance with base configuration
const apiClient = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

// Optional: Add request/response interceptors for global handling
apiClient.interceptors.request.use(
  (config) => {
    // Example: Attach authentication token if available
    const token = getCookie("access_token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('API Error:', error.response?.data || error.message)
    return Promise.reject(error)
  }
)

export default apiClient
