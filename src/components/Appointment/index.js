import React from 'react';
import "components/Appointment/styles.scss";
import Header from "components/Appointment/Header";
import Show from "components/Appointment/Show";
import Empty from "components/Appointment/Empty";
import Form from "components/Appointment/Form";
import Status from "components/Appointment/Status";
import Confirm from "components/Appointment/Confirm";
import Error from "components/Appointment/Error";
import useVisualMode from "../../hooks/useVisualMode";

const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
const SAVING = "SAVING";
const DELETING = "DELETING";
const CONFIRM = "CONFIRM";
const EDIT = "EDIT";
const ERROR_SAVE = "ERROR_SAVE";
const ERROR_DELETE = "ERROR_DELETE";

export default function Appointment(props) {
  const { time, interview, interviewers } = props;
  
  const { mode, transition, back } = useVisualMode(
       interview ? SHOW : EMPTY
  );
  //-------save---------
  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer
    };
    transition(SAVING)
    props.bookInterview(props.id, interview)
      .then(() => {
        transition(SHOW)
      })
      .catch(error => {
        transition(ERROR_SAVE, true);
      })
  }
  //-------cancel--------
  function cancel() {
    transition(DELETING, true)
    props.cancelInterview(props.id)
      .then(() => {
        transition(EMPTY)
      })
      .catch(error => {
        transition(ERROR_DELETE, true);
      })
  }

  return(
    <article className="appointment" data-testid="appointment">
      <Header time={time} />
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)}/>} 
      {mode === SHOW && (
        <Show
          student={interview.student}
          interviewer={interview.interviewer ? interview.interviewer.name : null}
          onDelete={() => transition(CONFIRM)}
          onEdit={() => transition(EDIT)}
        />
      )}
      {mode === DELETING && <Status message={props.messageOnDelete}/>}
      {mode === ERROR_DELETE && <Error onClose={() => back()} message={props.messageDELETE_ERROR}/>}
      {mode === ERROR_SAVE && <Error onClose={() => back()} message={props.messageSAVE_ERROR}/>}
      {mode === SAVING && <Status message={props.messageOnSave}/>}
      {mode === EDIT && <Form interviewers={interviewers} name={interview.student} onCancel={() => back()} onSave={(name, interviewerId)=> save(name, interviewerId)}/>}
      {mode === CREATE && <Form interviewers={interviewers} onCancel={() => back()} onSave={(name, interviewerId)=> save(name, interviewerId)}/>}
      {mode === CONFIRM && <Confirm onConfirm={() => cancel()} onCancel={() => back()} message={props.messageOnConfirm}/>}
    </article>
  );
}
