
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
  // console.log("STATE", state, "INTERVIEW", interview)
    const result = {...interview};
    if (interview !== null){

      result.interviewer = state.interviewers[interview.interviewer];
      // interview.interviewer:
    } else {
      return null;
    }
    return result;
  }

    // for (let key in state.appointments) {
    //   if (state.appointments[key].interview) {
    //     resultObj = state.appointments[key].interview;

    //       if (resultObj.interviewer !== null) {
    //         resultObj.interviewer = state.interviewers[resultObj.interviewer];

    //       } 
    //       // console.log(resultObj)
          
    //       // } 
    //       // console.log(state.appointments[key].interview.interviewer = state.interviewers[key])
    //     }
        
    //   }

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