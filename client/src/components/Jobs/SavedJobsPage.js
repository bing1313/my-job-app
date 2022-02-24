import { useSelector } from "react-redux";
import SavedJobItem from "./SavedJobItem";

const SavedJobsPage = () => {
  const savedJobs = useSelector((state) => state.savedJobs.savedJobs);
  //console.log("in savedJObspage" + savedJobs[0].company);
  const redirectToJobsHandler = () => {};

  return (
    <div style={{marginTop: '75px'}}>
      {savedJobs.map((savedJob) => (
        <div>
          <SavedJobItem
            title={savedJob.title}
            company={savedJob.company}
            key={savedJob.id}
            id={savedJob.id}
            location={savedJob.location}
            showJob={redirectToJobsHandler}
          />
          <hr></hr>
        </div>
      ))}
    </div>
  );
};

export default SavedJobsPage;
