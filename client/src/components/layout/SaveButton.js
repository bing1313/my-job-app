import classes from './SaveButton.module.css';

const SaveButton = (props) => {
    return (
        <button  className={classes.button} onClick={props.addToSavedJobs}>Save</button>
    )
}

export default SaveButton;