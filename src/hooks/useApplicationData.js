import { useState, useEffect } from "react";
import axios from "axios";

export default function useApplicationData() {

  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });

  
  useEffect(() => {
    Promise.all([
      axios.get("/api/days"),
      axios.get("/api/appointments"),
      axios.get("api/interviewers")
    ]).then((all) => {
      setState((prev) => ({
        ...prev,
        days: all[0].data,
        appointments: all[1].data,
        interviewers: all[2].data}))
      })
    }, []);
    
  const setDay = day => setState(prev => ({...prev, day}));

  

  function bookInterview(id, interview) {
    const appointment = {
      ...state.appointments[id],
      interview: {...interview}
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    }

    const filteredDay = state.days.filter((day) => day.appointments.includes(id));
    const dayIndex = filteredDay[0].id - 1;

    const day = {
      ...state.days[dayIndex],
      spots: state.days[dayIndex].spots - 1
    }

    const days = [...state.days]
    days.splice(dayIndex, 1, day);

    return axios.put(`/api/appointments/${id}`, {interview})
      .then(() => {
        setState({
          ...state,
          appointments,
          days
        });

      })
  };

  function cancelInterview(id) {
    const appointment = {
      ...state.appointments[id],
      interview: null
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    }

    const filteredDay = state.days.filter((day) => day.appointments.includes(id));
    const dayIndex = filteredDay[0].id - 1;

    const day = {
      ...state.days[dayIndex],
      spots: state.days[dayIndex].spots + 1
    }

    const days = [...state.days]
    days.splice(dayIndex, 1, day);

    return axios.delete(`/api/appointments/${id}`)
    .then(() => {
      setState({
        ...state,
        appointments,
        days
      });
    })
  }
  

  return { state, setDay, bookInterview, cancelInterview };
}