import React, { useState, useEffect } from "react";
import axios from 'axios';

import "components/Application.scss";
import DayList from "components/DayList.js";
import Appointment from "components/Appointment";
import { getAppointmentsForDay, getInterview, getInterviewersForDay } from "../helpers/selectors";


export default function Application() {

  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: [],
    interviewers: {}
  });

  const setDay = day => setState({ ...state, day });
  // const setDays = days => setState(prev => ({...prev, days }));

  useEffect(() => {
    const daysData = axios.get(`http://localhost:8001/api/days`);
    const appointmentsData = axios.get(`http://localhost:8001/api/appointments`);
    const interviewsData = axios.get(`http://localhost:8001/api/interviewers`);
    Promise.all ([
      Promise.resolve(daysData), 
      Promise.resolve(appointmentsData),
      Promise.resolve(interviewsData)])
      .then((all) => {
        console.log(all[1].data)
        // var now = new Date().getTime();   
        // while(new Date().getTime() < now + 3000){ /* do nothing */ }
        setState(prev => ({...prev, days: all[0].data, appointments: all[1].data, interviewers: all[2].data}));
      })
  }, []);

  function bookInterview(id, interview) {
    console.log(id, interview);
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
    setState({...state, appointments });
    // axios.put(`/api/appointments/${id}`)
    //   .then(res => {
    //     console.log(res.status)
    //   })
  }
  
  const interviewers = getInterviewersForDay(state, state.day);
 
  const appointments = getAppointmentsForDay(state, state.day);

  const schedule = appointments.map((appointment) => {
    const interview = getInterview(state, appointment.interview); 
    return (
      <Appointment
        key={appointment.id}
        id={appointment.id}
        time={appointment.time}
        interview={interview}
        interviewers={interviewers}
        bookInterview={bookInterview}
      />
    );
  });

  return (
    <main className="layout">
      <section className="sidebar">
        {/* Replace this with the sidebar elements during the "Project Setup & Familiarity" activity. */}
        <img
          className="sidebar--centered"
          src="images/logo.png"
          alt="Interview Scheduler"
        />
        <hr className="sidebar__separator sidebar--centered" />
        <nav className="sidebar__menu">
          <DayList
            day={state.day}
            days={state.days}
            setDay={setDay}
          />
        </nav>
        <img
          className="sidebar__lhl sidebar--centered"
          src="images/lhl.png"
          alt="Lighthouse Labs"
        />
      </section>
      <section className="schedule">
        {schedule}
      </section>
    </main>
  );
}

/* /* {getAppointmentsForDay(state, state.day).map(appointment => {
  return <Appointment key={appointment.id} {...appointment}/>
})} */ 


