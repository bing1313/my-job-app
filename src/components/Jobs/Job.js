import classes from './Job.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { savedJobActions } from '../../store/savedJobs';

const Job = (props) => {
  const dispatch = useDispatch();
  

  const { title, company, location, id, showJob } = props;
  
  const addToSavedJobsHandler = () => {
    dispatch(savedJobActions.saveToList({
      id: id,
      title: title,
      location: location,
      company: company
    }));
  }

  return (
    <div className={classes.jobBox}>

    
    <div  onClick={showJob.bind(this, id)}>
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
