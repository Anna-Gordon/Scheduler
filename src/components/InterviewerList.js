
import React from "react";

import "components/InterviewerList.scss";
import InterviewerListItem from "components/InterviewerListItem";

export default function InterviewerList(props) {
  const { interviewers } = props;
  console.log(interviewers)

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

