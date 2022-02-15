import { savedJobActions } from "./savedJobs";
import { useSelector } from "react-redux";

export const sendSavedJobsData = () => {
  return async (dispatch) => {
    const sendRequest = async () => {
      const response = await fetch("/api/tom", {
        method: "POST",
        body: JSON.stringify({ name: "sam", age: 35 }),
        headers: {
          "Content-Type": "application/json",
          // 'Content-Type': 'application/x-www-form-urlencoded',
        },
      });

      if (!response.ok) {
        throw new Error("Sending Data failed");
      }
    };

    try {
      await sendRequest();
      console.log("data was added successfully");
    } catch (error) {
      console.log("error in sending Request Method");
    }
  };
};



export const addToSavedJobs = (info) => {
  console.log("add to saved jobs is called");
  return async (dispatch) => {
    const addJobData = async () => {
      const response = await fetch("/addSavedJobs", {
        method: "POST",
        body: JSON.stringify({
          userId: info.userId,
          savedJobs: info.savedJobsList,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Error adding saved job database");
      } else {
        const data = await response.json();
        return data;
      }
    };

    try {
      await addJobData();
    } catch (error) {}
  };
};

export const fetchSavedJobs = (userUid) => {
  return async (dispatch) => {
    const fetchData = async () => {
      console.log("fetch data is called");
      console.log("fetch data is called user ID " + userUid);

      const response = await fetch("/fetchSavedJobs/" + userUid, {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          // 'Content-Type': 'application/x-www-form-urlencoded',
        },
      });

      if (!response.ok) {
        throw new Error("Fetching saved cart data failed");
      }
      if (response.ok) {
        const data = await response.json();
        return data;
      }
    };

    fetchData().then((data) => {
      var list = [];
      // console.log("data " + JSON(data));
      // const entries =  Object.entries(data);
      // entries.forEach(element => {
      //   list.push(element[1]);
      // })
      const stringJson = JSON.stringify(data);
      console.log(stringJson);

      dispatch(savedJobActions.replaceList({ savedJobs: data }));
    });

    //   try {
    //     const savedJobsData = await fetchData();
    //     console.log("came back from server with saved jobs");
    //     console.log("retrieved Saved Jobs data " + savedJobsData.length);
    //     //dispatch(savedJobActions.replaceList({ savedJobsData }));
    //   } catch (error) {}
  };
};
