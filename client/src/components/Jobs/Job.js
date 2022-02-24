import classes from "./Job.module.css";

const Job = (props) => {
 
  return (
    <div className={props.jobStyle}>
      <div onClick={props.showJob.bind(this, props.id)}>
        <h3>{props.title}</h3>
        <p>{props.company}</p>
        {props.location.map((location) => (
          <p key={props.id + location.name}>{location.name}</p>
        ))}
      </div>
     
    </div>
    
    
  );
};

export default Job;
