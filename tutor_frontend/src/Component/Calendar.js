import React, { useState } from 'react';

const Calendar = ({ selectedDate, onDateChange }) => {
  const [date, setDate] = useState(selectedDate);

  const handleDateChange = (e) => {
    const newDate = e.target.value;
    setDate(newDate);
    onDateChange(newDate);
  };

  return (
    <input
      type="date"
      value={date}
      onChange={handleDateChange}
    />
  );
};

export default Calendar;
