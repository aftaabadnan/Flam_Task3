// src/components/Calendar/Event.jsx
import { format } from 'date-fns';

export default function Event({ event, onEdit, onDelete }) {
  const handleClick = (e) => {
    e.stopPropagation();
    onEdit(event);
  };

  const handleDelete = (e) => {
    e.stopPropagation();
    if (window.confirm('Are you sure you want to delete this event?')) {
      onDelete(event.id);
    }
  };

  return (
    <div
      onClick={handleClick}
      className="text-xs p-1 rounded truncate"
      style={{ backgroundColor: `${event.color}20`, borderLeft: `3px solid ${event.color}` }}
    >
      <div className="font-medium truncate">{event.title}</div>
      <div className="text-gray-600">
        {format(new Date(event.date), 'h:mm a')} - {format(new Date(event.endDate), 'h:mm a')}
      </div>
      <button 
        onClick={handleDelete}
        className="text-red-500 hover:text-red-700 text-xs mt-1"
      >
        Delete
      </button>
    </div>
  );
}