
export function getAppointmentsForDay(state, day) {

  const appointmentsForGivenDay = [];

  if (state.days.length > 0) {
    state.days.forEach(days => {
      if (days.name === day) {
        const appointments = days.appointments;
        const allAppointments = Object.keys(state.appointments);
        appointments.forEach(elem => {
          elem = elem.toString();
          if (allAppointments.includes(elem)) {
            appointmentsForGivenDay.push(state.appointments[elem])   
          }
        })
      }     
    });
  }
    return appointmentsForGivenDay;
}

export function getInterview(state, interview) {
  console.log("STATE", state.appointments["3"], "INTERVIEW", interview)
  if (!interview) {
    return null;
  } else {
    return interview;
  }

}