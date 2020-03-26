
export function getAppointmentsForDay(state, day) {

  const appointmentsForGivenDay = [];

  if (state.days.length > 0) {
    state.days.forEach(someDay => {
      if (someDay.name === day) {
        const appointments = someDay.appointments;
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
    const result = {...interview};
    if (interview !== null) {
      result.interviewer = state.interviewers[interview.interviewer];
    } else {
      return null;
    }
    return result;
  }
//-------- second version --------
  // function getInterview(state, interview) {
  //   if (interview != null) {
  //     return {...interview, interviewer: {...state.interviewers[interview.interviewer]}};
  //   } else {
  //     return null;
  //   }
  // }

  export function getInterviewersForDay(state, day) {

    const interviewersForGivenDay = [];
  
    if (state.days.length > 0) {
      state.days.forEach(days => {
        if (days.name === day) {
          const interviewers = days.interviewers;
          const allInterviewers = Object.keys(state.interviewers);
          interviewers.forEach(elem => {
            elem = elem.toString();
            if (allInterviewers.includes(elem)) {
              interviewersForGivenDay.push(state.interviewers[elem])   
            }
          })
        }     
      });
    }
    return interviewersForGivenDay;
  }