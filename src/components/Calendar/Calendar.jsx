// src/components/Calendar/Calendar.jsx
import { useState } from 'react';
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isSameMonth, isSameDay, addMonths, subMonths } from 'date-fns';
import CalendarHeader from './CalendarHeader.jsx';
import Day from './Day';
import { getEventsForDay } from '../../utils/eventUtils.js';

export default function Calendar({ events, onAddEvent, onEditEvent, onDeleteEvent }) {
  const [currentMonth, setCurrentMonth] = useState(new Date());

  const monthStart = startOfMonth(currentMonth);
  const monthEnd = endOfMonth(currentMonth);
  const daysInMonth = eachDayOfInterval({ start: monthStart, end: monthEnd });

  const nextMonth = () => setCurrentMonth(addMonths(currentMonth, 1));
  const prevMonth = () => setCurrentMonth(subMonths(currentMonth, 1));

  return (
    <div className="p-4">
      <CalendarHeader 
        currentMonth={currentMonth} 
        onNext={nextMonth} 
        onPrev={prevMonth} 
      />
      
      <div className="grid grid-cols-7 gap-1 mt-4">
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
          <div key={day} className="text-center font-semibold py-2">
            {day}
          </div>
        ))}
        
        {daysInMonth.map(day => {
          const dayEvents = getEventsForDay(events, day);
          return (
            <Day
              key={day.toString()}
              day={day}
              isCurrentMonth={isSameMonth(day, currentMonth)}
              isToday={isSameDay(day, new Date())}
              events={dayEvents}
              onAddEvent={onAddEvent}
              onEditEvent={onEditEvent}
              onDeleteEvent={onDeleteEvent}
            />
          );
        })}
      </div>
    </div>
  );
}