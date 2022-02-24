import classes from './JobDetail.module.css';
import { useParams } from 'react-router-dom';

const JobDetail = () => {
    const params = useParams(); //key value pairs

  return (
    <section className={classes.jobDetailDiv}>
      <h1>Job Detail</h1>
      <p>{params.jobId}</p>
    </section>
  );
};

export default JobDetail;
