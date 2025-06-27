// src/components/Calendar/Day.jsx
import { format, isSameDay } from 'date-fns';
import Event from './Event';

export default function Day({ day, isCurrentMonth, isToday, events, onAddEvent, onEditEvent, onDeleteEvent }) {
  const dayNumber = format(day, 'd');
  const handleDayClick = () => {
    onAddEvent(day);
  };

  return (
    <div
      onClick={handleDayClick}
      className={`min-h-24 p-2 border border-gray-200 ${isCurrentMonth ? 'bg-white' : 'bg-gray-100'} ${
        isToday ? 'border-blue-500 border-2' : ''
      } cursor-pointer hover:bg-gray-50 transition-colors`}
    >
      <div className="text-right">
        <span className={`inline-block rounded-full w-6 h-6 text-center ${isToday ? 'bg-blue-500 text-white' : ''}`}>
          {dayNumber}
        </span>
      </div>
      <div className="mt-1 space-y-1 overflow-y-auto max-h-20">
        {events.map(event => (
          <Event
            key={event.id}
            event={event}
            onEdit={onEditEvent}
            onDelete={onDeleteEvent}
          />
        ))}
      </div>
    </div>
  );
}