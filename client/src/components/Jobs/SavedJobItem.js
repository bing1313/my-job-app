import Job from "./Job";
import Button from "../layout/Button";
import classes from "./SavedJobItem.module.css";
import { Link } from "react-router-dom";

const SavedJobItem = (props) => {
  return (
    <div className={classes.container}>
      <Link to={`${props.id}`}>
      <Job {...props} jobStyle={classes.jobStyle}></Job>
      <div className={classes.btnDiv}>
        <Button btnText="Unsave" />
        <Button btnText="Apply" />
      </div>
      </Link>
    </div>
  );
};

export default SavedJobItem;
