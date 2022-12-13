// helper functions used in Application.js

// getAppointmentsForDay function takes in state object and currently selected day, returns appointment data for that day
export function getAppointmentsForDay(state, day) {
  const filteredDay = state.days.filter((date) => date.name === day);
  const appointmentsArray = filteredDay[0] ? filteredDay[0].appointments : [];
  const appointments = appointmentsArray.map((id) => state.appointments[id]);

  return appointments;


}

// getInterviewsForDay function takes in state object and currently selected day, returns interview data for that day
export function getInterviewersForDay(state, day) {
  const filteredDay = state.days.filter((date) => date.name === day);
  const interviewersArray = filteredDay[0] ? filteredDay[0].interviewers : [];
  const interviewers = interviewersArray.map((id) => state.interviewers[id]);

  return interviewers;


}

// getInterview function takes in state object and appointment, returns current interviewer set for appointment if there is one
export function getInterview(state, appointment) {
  if (!appointment) {
    return null;
  }

  const id = appointment.interviewer;
  const interview = {
      student: appointment.student,
      interviewer: {...state.interviewers[id]}
    }

  return interview;
}