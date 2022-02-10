import classes from "./Job.module.css";
import { useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import { savedJobActions } from "../../store/savedJobs";
import AuthContext from "../../store/auth-content";

const Job = (props) => {

  const dispatch = useDispatch();
  const authCtx = useContext(AuthContext);

  const { title, company, location, id, showJob } = props;

  const addToSavedJobsHandler = () => {
    dispatch(
      savedJobActions.saveToList({
        id: id,
        title: title,
        location: location,
        company: company,
      })
    );

    fetch("/addSavedJobs", {
      method: "POST",
      body: JSON.stringify({
        userId: authCtx.userUid,
        id: id,
        title: title,
        location: location,
        company: company,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("updated data to database");
      });
  };

  return (
    <div className={classes.jobBox}>
      <div onClick={showJob.bind(this, id)}>
        <h3>{title}</h3>
        <p>{company}</p>
        {location.map((location) => (
          <p key={props.id + location.name}>{location.name}</p>
        ))}
      </div>
      <button onClick={addToSavedJobsHandler}>save</button>
    </div>
  );
};

export default Job;
