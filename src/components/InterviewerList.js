
import React from "react";

import "components/InterviewerList.scss";
import InterviewerListItem from "components/InterviewerListItem";

export default function InterviewerList(props) {
  const { interviewers, interviewer, setInterviewer } = props;
  console.log(interviewer)

  const allInterviewers = interviewers.map(singleInterviewer => {
    return (
      <InterviewerListItem 
        key={singleInterviewer.id}
        name={singleInterviewer.name}
        avatar={singleInterviewer.avatar}
        selected={singleInterviewer.id === props.value}
        setInterviewer={event => props.onChange(singleInterviewer.id)}
        
        />
    );
  })

  return(
      <section className="interviewers">
        <h4 className="interviewers__header text--light">Interviewer</h4>
        <ul className="interviewers__list">
          {allInterviewers}
        </ul>
      </section>

  );
}

// interviewers:array - an array of objects containing the information of each interviewer
// interviewer:number - the id of an interviewer
// setInterviewer:function - a function that accepts an interviewer id
