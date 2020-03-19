import React, { useState, useEffect } from "react";
import axios from 'axios';

import "components/Application.scss";
import DayList from "components/DayList.js";
import Appointment from "components/Appointment";
import getAppointmentsForDay from "helpers/selectors";


const appointments = [
  {
    id: 1,
    time: "12pm",
  },
  {
    id: 2,
    time: "1pm",
    interview: {
      student: "Lydia Miller-Jones",
      interviewer: {
        id: 1,
        name: "Sylvia Palmer",
        avatar: "https://i.imgur.com/LpaY82x.png",
      }
    }
  },
  {
    id: 3,
    time: "2pm",
    interview: {
      student: "student name 1",
      interviewer: {
        id: 2,
        name:"Tori Malcolm",
        avatar:"https://i.imgur.com/Nmx0Qxo.png",
      }
    }
  },
  {
    id: 4,
    time: "4pm",
    interview: {
      student: "student name 2",
      interviewer: {
        id: 5,
        name:"Sven Jones",
        avatar:"https://i.imgur.com/twYrpay.jpg",
      }
    }
  },
  {
    id: 5,
    time: "4pm",
    interviewer: {
      student: "Cohana Roy",
      interviewer: {
        id: 3,
        name: "Mildred Nazir",
        avatar:"https://i.imgur.com/T2WwVfS.png",
      }
    }
  }

];

export default function Application() {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: []
  });

  // console.log("STATE", state)

  const setDay = day => setState({ ...state, day });
  // const setDays = days => setState(prev => ({...prev, days }));

  useEffect(() => {

    const daysData = axios.get('http://localhost:8001/api/days');
    const appointmentsData = axios.get('http://localhost:8001/api/appointments');
    // const interviewsData = axios.get('http://localhost:8001/api/interviews');
    Promise.all ([
      Promise.resolve(daysData), 
      Promise.resolve(appointmentsData)])
      .then((all) => {
        console.log(all[0].data)
        setState(prev => ({...prev, days: all[0].data, appointments: all[1].data}));
      })
  }, []);


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
        {appointments.map(appointment => {
          return <Appointment key={appointment.id} {...appointment}/>
        })}
      </section>
    </main>
  );
}


