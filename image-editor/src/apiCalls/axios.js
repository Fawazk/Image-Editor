// import axios from 'axios';



// let BASE_URL = 'http://127.0.0.1:8000/'

// export const setAxiosAuthToken = (token) => {
//     if (typeof token !== "undefined" && token) {
//         const atoken = "Token " + token
//         console.log(atoken)
//         // Apply for every request
//         axios.defaults.headers.common["Authorization"] = atoken;
//     } else {
//         // Delete auth header
//         delete axios.defaults.headers.common["Authorization"];
//     }
// };


// export const registerSubmit = (formdata) => {
//     return new Promise(async (resolve, reject) => {
//         await axios.post(BASE_URL + 'register', formdata).then((data) => {
//             console.log(data.data, 'data')
//             resolve(data.data)
//         })
//     })
// }
