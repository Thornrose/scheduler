import React from "react"

import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";
import Form from "./Form";
import Status from "./Status";
import Confirm from "./Confirm";
import Error from "./Error";

import useVisualMode from "hooks/useVisualMode";

import "components/Appointment/styles.scss";

// mode settings
const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
const EDIT = "EDIT";
const SAVING = "SAVING";
const CONFIRM = "CONFIRM";
const DELETING = "DELETING";
const ERROR_SAVE = "ERROR_SAVE";
const ERROR_DELETE = "ERROR_DELETE";

// component used in components/Application.js
export default function Appointment(props) {
  const {mode, transition, back } = useVisualMode(props.interview ? SHOW : EMPTY);

  // Save and Remove functions for create and edit modes
  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer
    };

    transition(SAVING);
    props.bookInterview(props.id, interview)
      .then(() => {
        transition(SHOW);
      })
      .catch(() => {
        transition(ERROR_SAVE, true);
      })
  }

  function remove() {
    transition(DELETING, true);
    props.cancelInterview(props.id)
      .then(() => {
        transition(EMPTY);
      })
      .catch(() => {
        transition(ERROR_DELETE, true);
      })
  }

  // Appointment component
  return (
    <article className="appointment" data-testid="appointment">
      <Header time={props.time} />
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {mode === SHOW && <Show
        student={props.interview.student}
        interviewer={props.interview.interviewer}
        onEdit={() => transition(EDIT)}
        onDelete={() => transition(CONFIRM)}
        />
      }
      {mode === CREATE && <Form 
        interviewers={props.interviewers}
        onSave={save}
        onCancel={back}
        />
      }
      {mode === EDIT && <Form
        student={props.interview.student}
        interviewer={props.interview.interviewer.id}
        interviewers={props.interviewers}
        onSave={save}
        onCancel={back}
        />
      }
      {mode === CONFIRM && <Confirm 
        message="Are you sure?"
        onCancel={back}
        onConfirm={remove}
        />  
      }
      {mode === SAVING && <Status message="Saving"/>}
      {mode === DELETING && <Status message="Deleting" />}
      {mode === ERROR_SAVE && <Error message="Something went wrong!" onClose={back} />}
      {mode === ERROR_DELETE && <Error message="Something went wrong!" onClose={back} />}

    </article>
  )
}