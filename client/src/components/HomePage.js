import { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import classes from "./HomePage.module.css";
import { useDispatch } from "react-redux";
import { sendSavedJobsData } from "../store/savedJobs";

const HomePage = () => {
  const [testState, setTestState] = useState("");
  const dispatch = useDispatch();

  useEffect(() => {
    const savedNewJobThunk = sendSavedJobsData();
    dispatch(savedNewJobThunk);

    // fetch("/api")
    //   .then(res => res.json()
    //   )
    //   .then((data) => {
    //     console.log(data.message);
    //     setTestState(data.message);
    //   });
  }, []);

  return (
    <section className={classes.heading}>
      <Container>
        <h1>This is the home page</h1>
        {testState}
      </Container>
    </section>
  );
};

export default HomePage;
