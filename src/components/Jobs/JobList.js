import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Row, Col, Container } from "react-bootstrap";
import Job from "./Job";
import classes from "./JobList.module.css";

const JobList = (props) => {
  const [jobs, setJobs] = useState([]);
  const [shownJob, setShownJob] = useState({}); //default could be the first job
  const savedJobs = useSelector((state) => state.savedJobs.savedJobs);
  
  useEffect(() => {
    fetch("https://www.themuse.com/api/public/jobs?page=1")
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      console.log('in fetch');
      console.log(data.results);
      const transformedJobs = data.results.map(job => {
        return {
          title: job.name,
          id: job.id,
          location: job.locations, //is an array?
          company: job.company.name,
          content: job.contents
        }
      })
      setJobs(transformedJobs);
      setShownJob(transformedJobs[0]);
    }).catch(error => {
      alert(error.message);
    });
  },[])

  const showJobHandler = (id) => {
    //find the id?
    console.log("this is the id input " + id);
    const result = jobs.filter(job => job.id === id );
    console.log("this is the id " + result[0].id);
    setShownJob(result[0]);
  }

  return (
    <div>
      <Container fluid>
        
      <Row className={classes.row}>
      <h1>This is saved jobs{savedJobs.length}</h1>
        <Col className={classes.jobs}>
          {jobs.map((job) => (
            <Job
              title={job.title}
              key={job.id}
              id={job.id}
              location={job.location}
              company={job.company}
              showJob={showJobHandler}
            />
          ))}
        </Col>
        <Col>        
          <div dangerouslySetInnerHTML={{ __html: shownJob.content }}></div>
        </Col>
      </Row>
      </Container>
    </div>
  );
};

export default JobList;
