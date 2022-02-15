import Job from "./Job";
import { useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import { savedJobActions } from "../../store/savedJobs";
import AuthContext from "../../store/auth-context";

import Button from "../layout/Button";
import classes from './JobItem.module.css';

const JobItem = (props) => {
    const dispatch = useDispatch();
    const authCtx = useContext(AuthContext);
    const savedJobsList = useSelector((state) => state.savedJobs.savedJobs);
  
    const { title, company, location, id, showJob } = props;
  
    console.log("in job ,company," + company);

    const addToSavedJobsHandler = () => {
      console.log("saved jobs handler user id " + authCtx.userUid);
      console.log("saved jobs in handler " + savedJobsList.length);
      console.log("saved jobs title " + title);
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
        <div className={classes.jobBox}>
        <Job {...props} />
        <Button styles={classes.jobItemBtn} onClickHandler={addToSavedJobsHandler} btnText="save"/>
        </div>
    )
}


export default JobItem;