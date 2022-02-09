import { configureStore } from "@reduxjs/toolkit";

import savedJobsSlice from "./savedJobs";


const store = configureStore({
    reducer: { savedJobs: savedJobsSlice.reducer }
})


export default store;