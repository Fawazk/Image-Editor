import axios from 'axios';



let BASE_URL = 'http://127.0.0.1:8000/'

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

// const data = new FormData();
// data.append('courseimage', blobimage);
// , "Authorization": `Bearer  ${access_token}`

export const AddeditImageSubmit = (formdata) => {
    console.log(formdata,'formdata at axios.js')
    return new Promise(async (resolve, reject) => {
        await axios.post(BASE_URL + 'api/posts/', formdata,{ headers: { 'Content-Type': 'multipart/form-data'} }
        ).then((data) => {
            console.log(data.data, 'data')
            resolve(data.data)
        })
    })
}



export const GeteditImageSubmit = () => {
    return new Promise(async (resolve, reject) => {
        await axios.get(BASE_URL + 'api/posts/',
        ).then((data) => {
            console.log(data.data, 'data')
            resolve(data.data)
        })
    })
}
