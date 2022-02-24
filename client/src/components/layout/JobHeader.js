const JobHeader = (props) => {

    return (
        <div>
            <h2>{props.title}</h2>
            <p>{props.company}</p>
            
            <p>This is where the job header will go</p>
        </div>
    )
}

export default JobHeader;