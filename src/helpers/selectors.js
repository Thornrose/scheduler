

export function getAppointmentsForDay(state, day) {
  const filteredDay = state.days.filter((date) => date.name === day);
  const appointmentsArray = filteredDay[0] ? filteredDay[0].appointments : [];
  const appointments = appointmentsArray.map((id) => state.appointments[id])

  return appointments;


}