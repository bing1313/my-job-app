import { createSlice } from "@reduxjs/toolkit";
import Job from "../components/Jobs/Job";

const savedJobsInitialState = {
  savedJobs: [],
};

const savedJobsSlice = createSlice({
  name: "savedJobs",
  initialState: savedJobsInitialState,
  reducers: {
    saveToList(state, action) {
      const newJob = action.payload;
      const existingItem = state.savedJobs.find(
        (item) => item.id === newJob.id
      );

      if (!existingItem) {
        state.savedJobs.push({
          id: newJob.id,
          title: newJob.name,
          location: newJob.location,
          company: newJob.company,
        });
      }
    },
  },
});

export const sendSavedJobsData = () => {
  return async (dispatch) => {
    const sendRequest = async () => {
      const response = await fetch("/api/tom" , {
        method: "POST",
        body: JSON.stringify({name: "sam", age: 35}),
        headers: {
          'Content-Type': 'application/json'
          // 'Content-Type': 'application/x-www-form-urlencoded',
        },
      });

      if (!response.ok) {
        throw new Error("Sending Data failed");
      }
    };

    try {
      await sendRequest();
    } catch (error) {
      console.log("error in sending Request Method");
    }
  };
};

export const savedJobActions = savedJobsSlice.actions;
export default savedJobsSlice;
