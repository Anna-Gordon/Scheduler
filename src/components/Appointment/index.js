import React from 'react';
import "components/Appointment/styles.scss";
import Header from "components/Appointment/Header";
import Show from "components/Appointment/Show";
import Empty from "components/Appointment/Empty";
import Form from "components/Appointment/Form";
import Status from "components/Appointment/Status";
import Confirm from "components/Appointment/Confirm";
import useVisualMode from "../../hooks/useVisualMode";



const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
const SAVING = "SAVING";
const DELETING = "DELETING";
const CONFIRM = "CONFIRM";
const EDIT = "EDIT";

export default function Appointment(props) {
  console.log("PROPS", props.interview)
  const { time, interview, interviewers } = props;
  
  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );
//-------save---------
  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer: interviewer
    };
    transition(SAVING)
    props.bookInterview(props.id, interview)
    .then(() => {
      transition(SHOW);
    })
  }
//-------cancel-------------
  function cancel() {
    transition(DELETING)
    props.cancelInterview(props.id, interview)
    .then(() => {
      transition(EMPTY);
    })
  }

  return(
    <article className="appointment">
      <Header time={time} />
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)}/>} 
      {mode === SHOW && (
        <Show
          student={interview.student}
          interviewer={interview.interviewer.name}
          onDelete={() => transition(CONFIRM)}
          onEdit={() => {transition(EDIT)}}
        />
      )}
      {mode === DELETING && <Status message={props.messageOnDelete}/>}
      {mode === SAVING && <Status message={props.messageOnSave}/>}
      {mode === EDIT && <Form interviewers={interviewers} value={props.name} onCancel={() => back()} onSave={(name, interviewerId)=> save(name, interviewerId)}/>}
      {mode === CREATE && <Form interviewers={interviewers} onCancel={() => back()} onSave={(name, interviewerId)=> save(name, interviewerId)}/>}
      {mode === CONFIRM && <Confirm onConfirm={() => cancel()} onCancel={() => back()} message={props.messageOnConfirm}/>}
    </article>
  );
}

