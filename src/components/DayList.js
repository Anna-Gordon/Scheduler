import React from 'react';
// import axios from 'axios';

import "components/DayListItem";
import DayListItem from 'components/DayListItem';

export default function DayList(props) {
  const {day, days, setDay } = props;



  const allDays = days.map(singleDay => {
    return (
      <DayListItem 
        key={singleDay.id}
        // name={singleDay.name}
        // spots={singleDay.spots}
        {...singleDay}
        selected={singleDay.name === day}
        setDay={setDay}
      />
    );
  })
  
  return (
    <ul>
      {allDays}
    </ul>
  );
}