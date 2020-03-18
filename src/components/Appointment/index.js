import React from 'react';
import "components/Appointment/styles.scss";
import Header from "components/Appointment/Header";
import Show from "components/Appointment/Show";
import Empty from "components/Appointment/Empty";


export default function Appointment(props) {
  const { time, interview, interviewer } = props;
  console.log(interviewer) //undefined?

  return(
    <article className="appointment">
      <Header time={time} />
      {props.interview ? < Show student={interview.student} name={interview.interviewer.name}/> : <Empty />}
    </article>
  );
}
