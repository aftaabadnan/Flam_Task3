// src/components/TimePicker.jsx
import { useState, useEffect } from 'react';
import { format, setHours, setMinutes } from 'date-fns';

export default function TimePicker({ date, onChange }) {
  const [time, setTime] = useState(format(date, 'HH:mm'));

  useEffect(() => {
    const [hours, minutes] = time.split(':').map(Number);
    const newDate = setMinutes(setHours(date, hours), minutes);
    onChange(newDate);
  }, [time, date, onChange]);

  return (
    <input
      type="time"
      value={time}
      onChange={(e) => setTime(e.target.value)}
      className="w-full p-2 border rounded"
    />
  );
}