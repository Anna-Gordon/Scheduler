import React, { useState, useEffect } from "react";
import axios from 'axios';

import "components/Application.scss";
import DayList from "components/DayList.js";
import Appointment from "components/Appointment";
import { getAppointmentsForDay, getInterview, getInterviewersForDay } from "../helpers/selectors";
import useApplicationData from "hooks/useApplicationData.js";


export default function Application(props) {
  const {
    state,
    setDay,
    bookInterview,
    cancelInterview
  } = useApplicationData();

  //-------------selectors------------
  const interviewers = getInterviewersForDay(state, state.day);
 
  const appointments = getAppointmentsForDay(state, state.day).map(
    appointment => {

  // const schedule = appointments.map((appointment) => {
    // const interview = getInterview(state, appointment.interview); 
    return (
      <Appointment
        key={appointment.id}
        // id={appointment.id}
        // time={appointment.time}
        // interview={interview}
        {...appointment}
        interview={getInterview(state, appointment.interview)}
        interviewers={interviewers}
        bookInterview={bookInterview}
        cancelInterview={cancelInterview}
        messageOnSave="Saving"
        messageOnDelete="Deleting"
        messageOnConfirm="Are you sure you would like to delete the appointment?"
        messageSAVE_ERROR="Could not save appointment."
        messageDELETE_ERROR="Could not delete appointment."
      />
    );
  }
);

  return (
    <main className="layout">
      <section className="sidebar">
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
        {appointments}
        <Appointment key="last" time="5pm" />
      </section>
    </main>
  );
}



