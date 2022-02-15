import Job from "./Job";
import Button from "../layout/Button";
import classes from "./SavedJobItem.module.css";

const SavedJobItem = (props) => {
  return (
    <div className={classes.container}>
      <Job {...props} jobStyle={classes.jobStyle}></Job>
      <div className={classes.btnDiv}>
        <Button btnText="Unsave" />
        <Button btnText="Apply" />
      </div>
    </div>
  );
};

export default SavedJobItem;
