import classes from "./Job.module.css";
import { useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import { savedJobActions } from "../../store/savedJobs";
import AuthContext from "../../store/auth-context";
import SaveButton from "../layout/SaveButton";


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


  return (
    <div>
    <div className={classes.jobBox}>
      <div onClick={showJob.bind(this, id)}>
        <h3>{title}</h3>
        <p>{company}</p>
        {location.map((location) => (
          <p key={props.id + location.name}>{location.name}</p>
        ))}
      </div>
     <SaveButton addToSavedJobs={addToSavedJobsHandler}/>
    </div>
    <hr></hr>
    </div>
  );
};

export default Job;
