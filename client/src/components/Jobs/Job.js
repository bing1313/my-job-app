import classes from "./Job.module.css";
import { useContext, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { savedJobActions } from "../../store/savedJobs";
import AuthContext from "../../store/auth-context";



const Job = (props) => {
  const dispatch = useDispatch();
  const authCtx = useContext(AuthContext);
  const savedJobsList = useSelector((state) => state.savedJobs.savedJobs);

  const { title, company, location, id, showJob } = props;

  const addToSavedJobsHandler = () => {
    console.log("saved jobs handler user id " + authCtx.userUid);
    console.log("saved jobs in handler " + savedJobsList.length);

    dispatch(
      savedJobActions.saveToList({
        id: id,
        title: title,
        location: location,
        company: company,
      })
    );
  };



  // const info = {
  //   job: {
  //     id: id,
  //     title: title,
  //     location: location,
  //     company: company
  //   },
  //   userId: authCtx.userUid
  // }
  // dispatch(addToSavedJobs())

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
