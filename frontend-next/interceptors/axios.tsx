import axios from "axios";
import Cookies from "js-cookie";

const baseURL = 'http://localhost:4000/'

const axiosInstance = axios.create({
  baseURL: baseURL,
  headers: {
    "Content-Type": "application/json",
  }
});

const redirectToLogin = () => {
  // You may replace this with your own logic to redirect the user to the login page
  window.location.href = '/login';
};
// const email = "kritgyakumar92@gmail.com"
// const password = "tempuser@123"
// const loginData = {
//     "email": email,
//     "password": password
// }

// const getCourses = () => {
//   axiosInstance  
//     .post("login", loginData)
//     .then((res) => {
//         localStorage.setItem("access", res.data.data.access);
//         localStorage.setItem("refresh", res.data.data.refresh);
//     })
// }

// const token = localStorage.getItem("access");
// if(!token) {
//   getCourses()
// } else {
//   getCourses()
// }

// Add an interceptor for setting the Authorization header with the access token
axiosInstance.interceptors.request.use(
    (config) => {
      const token = Cookies.get("access");
      if (token) {
        config.headers["Authorization"] = `Bearer ${token}`;
      }
      return config;
    },
    (error) => {
      if (error.response.status === 401) { // Assuming 401 is returned for unauthorized access
        redirectToLogin(); // Redirect to login page
      }
      return Promise.reject(error);
    }
)


export default axiosInstance;