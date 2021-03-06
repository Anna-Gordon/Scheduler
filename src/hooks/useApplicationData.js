import { useState, useEffect } from 'react';
import axios from 'axios';

export default function useApplicationData() {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: [],
    interviewers: {}
  });
  
  const setDay = day => setState({ ...state, day });
  
  useEffect(() => {
    const daysData = axios.get(`http://localhost:8001/api/days`);
    const appointmentsData = axios.get(`http://localhost:8001/api/appointments`);
    const interviewsData = axios.get(`http://localhost:8001/api/interviewers`);
    Promise.all ([
      Promise.resolve(daysData), 
      Promise.resolve(appointmentsData),
      Promise.resolve(interviewsData)])
      .then((all) => {
        setState(prev => ({...prev, days: all[0].data, appointments: all[1].data, interviewers: all[2].data}));
      })
  }, []);

  useEffect(() => {
    axios.get(`http://localhost:8001/api/days`)
      .then(days => setState(state => ({ ...state, days: days.data })));
  }, [state.appointments]);
  
  //----------bookInterview-------
  function bookInterview(id, interview) {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    }; 
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };  
    return (
      axios.put(`http://localhost:8001/api/appointments/${id}`, { interview })
        .then((res) => {
          setState({...state, appointments })
        })
        .catch((error) => {
          return Promise.reject(error);
        })
      );
  };
      
  //----------cancelInterview--------- 
  function cancelInterview(id) {
    const appointment = {
      ...state.appointments[id],
      interview: null
    }; 
    const appointments = {
      ...state.appointments,
      [id]: appointment
    }; 
    return (
      axios.delete(`http://localhost:8001/api/appointments/${id}`)
        .then((res) => {
          setState({...state, appointments})
        })
        .catch((error) => {
          return Promise.reject(error);
        })
      )
  };

  return { state, setDay, bookInterview, cancelInterview };
}
