import axios from 'axios';



let BASE_URL = 'http://127.0.0.1:8000/'


export const AddeditImageSubmit = (formdata) => {
    return new Promise(async (resolve, reject) => {
        await axios.post(BASE_URL + 'api/posts/', formdata,{ headers: { 'Content-Type': 'multipart/form-data'} }
        ).then((data) => {
            resolve(data.data)
        })
    })
}



export const GeteditImageSubmit = () => {
    return new Promise(async (resolve, reject) => {
        await axios.get(BASE_URL + 'api/posts/',
        ).then((data) => {
            resolve(data.data)
        })
    })
}
