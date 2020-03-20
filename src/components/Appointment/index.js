import React from 'react';
import "components/Appointment/styles.scss";
import Header from "components/Appointment/Header";
import Show from "components/Appointment/Show";
import Empty from "components/Appointment/Empty";
import Form from "components/Appointment/Form";
import useVisualMode from "../../hooks/useVisualMode";



const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";

export default function Appointment(props) {
  const { time, interview, interviewers } = props;
  console.log("PROPS APPOINTMENT", interview)
  
  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  function save(name, interviewer) {
    console.log(name, interviewer)
    const interview = {
      student: name,
      interviewer
    };
    props.bookInterview("1", interview)
    transition(SHOW)
  }

  return(
    <article className="appointment">
      <Header time={time} />
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)}/>} 
      {mode === SHOW && (
        <Show
          student={interview.student}
          interviewer={interview.interviewer.name}
        />
      )}
      {mode === CREATE && <Form interviewers={interviewers} onCancel={() => back()} onSave={(name, interviewerId)=> save(name, interviewerId)}/>}
    </article>
  );
}

