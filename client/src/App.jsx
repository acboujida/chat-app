import Register from "./register"
import axios from "axios"

function App() {
  axios.defaults.baseURL = 'http://localhost:9999';
  axios.defaults.withCredentials = true;
  return (
    <Register/>
  )
}

export default App
