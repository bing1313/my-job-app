
import { useDispatch, useSelector } from "react-redux";
import { Container } from "react-bootstrap";
import classes from "./HomePage.module.css";

import AuthContext from "../store/auth-context";
import { sendSavedJobsData } from "../store/savedJobs-action";
import { fetchSavedJobs } from "../store/savedJobs-action";


const HomePage = () => {

  const savedJobsList = useSelector((state) => state.savedJobs.savedJobs);
  console.log("savedJobs" + savedJobsList.length);



  return (
    <section className={classes.heading}>
      <Container>
        <h1>This is the home page</h1>
      
        {JSON.stringify(savedJobsList)}
      </Container>
    </section>
  );
};

export default HomePage;
