import { useContext, useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import AuthContext from "./store/auth-content";

import Layout from "./components/layout/Layout";
import AuthForm from "./components/AuthForm";
import HomePage from "./components/HomePage";
import ProfilePage from "./components/Profile/ProfilePage";
import JobList from "./components/Jobs/JobList";

function App() {
  const authCtx = useContext(AuthContext);


  return (
    <Layout>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/jobs" element={<JobList />} />
        {!authCtx.isLoggedIn && <Route path="/login" element={<AuthForm />} />}
        {authCtx.isLoggedIn && (
          <Route path="/profile" element={<ProfilePage />} />
        )}
        <Route path="*" element={<p>Page not found</p>} />
      </Routes>
    </Layout>
  );
}

export default App;
