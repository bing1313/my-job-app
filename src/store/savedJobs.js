import { createSlice } from '@reduxjs/toolkit';
import Job from '../components/Jobs/Job';

const savedJobsInitialState = {
    savedJobs: []
}

const savedJobsSlice = createSlice({
    name: 'savedJobs',
    initialState: savedJobsInitialState,
    reducers: {
        saveToList(state, action) {
            const newJob = action.payload;
            const existingItem = state.savedJobs.find(item => 
                item.id === newJob.id
            )

            if (!existingItem) {
                state.savedJobs.push({
                    id: newJob.id,
                    title: newJob.name, 
                    location: newJob.location,
                    company: newJob.company
                })
                
            }
        }
    }
})


export const sendSavedJobsData = (newSavedJobsData) => {
    return async (dispatch) => {
        const sendRequest = async () => {
            const response = await fetch ('https://job-app-cf530-default-rtdb.firebaseio.com/users.json')
        }
    };
}

export const savedJobActions = savedJobsSlice.actions;
export default savedJobsSlice;