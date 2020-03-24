
import React from "react";
import PropTypes from 'prop-types';

import "components/InterviewerList.scss";
import InterviewerListItem from "components/InterviewerListItem";

export default function InterviewerList(props) {
  const { interviewers, value, onChange } = props;
  // console.log("InterviewerList.js", interviewers)

  const allInterviewers = interviewers.map(singleInterviewer => {
    return (
      <InterviewerListItem 
        key={singleInterviewer.id}
        {...singleInterviewer}
        // name={singleInterviewer.name}
        // avatar={singleInterviewer.avatar}
        selected={singleInterviewer.id === value}
        setInterviewer={event => onChange(singleInterviewer.id)}
        
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

InterviewerList.propTypes = {
  value: PropTypes.number,
  onChange: PropTypes.func.isRequired
};

