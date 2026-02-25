import axios from "axios";

axios.post("http://localhost:5000/api/auth/register", {
    name: "Admin",
    email: "admin@test.com",
    password: "123456",
    role: "superAdmin"
})
.then(res => console.log(res.data))
.catch(err => console.log(err.response.data));