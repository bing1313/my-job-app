import { useContext, useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import AuthContext from "./store/auth-context";

import Layout from "./components/layout/Layout";
import AuthForm from "./components/AuthForm";
import HomePage from "./components/HomePage";
import ProfilePage from "./components/Profile/ProfilePage";
import JobList from "./components/Jobs/JobList";
import SavedJobsPage from "./components/Jobs/SavedJobsPage";
import JobDetail from "./components/Jobs/JobDetail";
import { addToSavedJobs } from './store/savedJobs-action';
import { fetchSavedJobs } from './store/savedJobs-action';
let isInitial = true;

function App() {
  const authCtx = useContext(AuthContext);
  const dispatch = useDispatch();
  const savedJobsList = useSelector((state) => state.savedJobs.savedJobs);
  
  useEffect(() => {
    console.log("before get saved jobs thunk");
    console.log(authCtx.userUid);
    console.log(authCtx.token);

    if (authCtx.userUid){
      const fetchSavedJobsThunk = fetchSavedJobs(authCtx.userUid);
      dispatch(fetchSavedJobsThunk);
    }

  }, [dispatch]);

  useEffect(() => {
    if (isInitial) {
      isInitial = false;
      return;
    }
    //adding to database
    dispatch(addToSavedJobs({userId: authCtx.userUid, savedJobsList: savedJobsList}));
       
   }, [savedJobsList, dispatch]);

  return (
    <Layout>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/jobs" element={<JobList />} />
        {!authCtx.isLoggedIn && <Route path="/login" element={<AuthForm />} />}
        {authCtx.isLoggedIn && (
          <Route path="/profile" element={<ProfilePage />} />
        )}
        {authCtx.isLoggedIn && (
          <Route path="/savedJobs" element={<SavedJobsPage />} />
        )}
        <Route path="/savedJobs/:jobId" element={<JobDetail />} />
        <Route path="*" element={<p>Page not found</p>} />
      </Routes>
    </Layout>
  );
}

export default App;
