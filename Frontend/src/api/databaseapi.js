import axios from "axios";
const databaseapi = axios.create({
    baseURL:"http://127.0.0.1:8000",
    timeout:1200000

})
export default databaseapi;