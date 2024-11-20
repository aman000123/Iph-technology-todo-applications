

import { configureStore } from "@reduxjs/toolkit";

import { reducer } from "./taskSlice";

const store = configureStore({

    reducer: reducer

})

export default store