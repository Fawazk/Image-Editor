import { configureStore } from "@reduxjs/toolkit"
import changeOptionReducer from "./ChangeOptions/changeOptionSlice"

export default configureStore({
    reducer:{
        changeOption:changeOptionReducer,
    }
})