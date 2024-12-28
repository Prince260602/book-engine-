// import axios from "axios";
// const databaseapi = axios.create({
//     baseURL:"http://127.0.0.1:8000",
//     timeout:1200000

// })
// export default databaseapi;

import axios from "axios";

const databaseapi = axios.create({
    baseURL: "http://127.0.0.1:8000",
    timeout: 120000, // Adjust timeout if needed
});

// Usage example
const getData = async () => {
    try {
        const response = await databaseapi.get("/get_genre_name/Fiction");
        console.log("Data:", response.data);
    } catch (error) {
        console.error("Error:", error.message);
    }
};

getData();
export default databaseapi;