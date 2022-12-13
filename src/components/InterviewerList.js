import React from "react";
import propTypes from 'prop-types';

import InterviewerListItem from "./InterviewerListItem";

import "components/InterviewerList.scss";

// component used in Appointment/Form.js
export default function InterviewerList(props) {

  const interviewers = props.interviewers.map((interviewer) => {
    return (
      <InterviewerListItem
        key={interviewer.id}
        name={interviewer.name}
        avatar={interviewer.avatar}
        selected={interviewer.id === props.value}
        setInterviewer={() => props.onChange(interviewer.id)}
      />
      );
  })

  return (
    <section className="interviewers">
      <h4 className="interviewers__header text--light">Interviewer</h4>
      <ul className="interviewers__list">{interviewers}</ul>
    </section>
  )
}

// Prop types validation
InterviewerList.propTypes = {
  interviewers: propTypes.array.isRequired,
  value: propTypes.number,
  onChange: propTypes.func.isRequired
};