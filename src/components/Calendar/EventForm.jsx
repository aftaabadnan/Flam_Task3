// src/components/Calendar/EventForm.jsx
import { useState, useEffect } from 'react';
import { format, parseISO } from 'date-fns';
import TimePicker from '../TimePicker';
import RecurrenceOptions from '../RecurrenceOptions';
import { checkEventConflict } from '../../utils/eventUtils';

const colors = [
  { name: 'Blue', value: '#3b82f6' },
  { name: 'Red', value: '#ef4444' },
  { name: 'Green', value: '#10b981' },
  { name: 'Purple', value: '#8b5cf6' },
  { name: 'Yellow', value: '#f59e0b' },
];

export default function EventForm({ event, onSave, onCancel, existingEvents }) {
  const [formData, setFormData] = useState(event);
  const [errors, setErrors] = useState({});
  const [conflict, setConflict] = useState(null);

  useEffect(() => {
    setFormData(event);
  }, [event]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleDateChange = (date) => {
    setFormData(prev => ({ ...prev, date: date.toISOString() }));
  };

  const handleEndDateChange = (date) => {
    setFormData(prev => ({ ...prev, endDate: date.toISOString() }));
  };

  const handleRecurrenceChange = (recurrenceData) => {
    setFormData(prev => ({ ...prev, ...recurrenceData }));
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.title.trim()) newErrors.title = 'Title is required';
    if (new Date(formData.endDate) <= new Date(formData.date)) {
      newErrors.endDate = 'End time must be after start time';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    const conflictEvent = checkEventConflict(formData, existingEvents.filter(e => e.id !== formData.id));
    if (conflictEvent) {
      setConflict(conflictEvent);
      return;
    }

    onSave(formData);
  };

  return (
    <div className="bg-white rounded-lg shadow-xl w-full max-w-md">
      <div className="p-6">
        <h2 className="text-xl font-bold mb-4">
          {event.id ? 'Edit Event' : 'Add Event'}
        </h2>
        
        {conflict && (
          <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
            <p>This event conflicts with: {conflict.title}</p>
            <p>{format(parseISO(conflict.date), 'MMMM d, yyyy h:mm a')} - {format(parseISO(conflict.endDate), 'h:mm a')}</p>
            <button 
              onClick={() => setConflict(null)}
              className="mt-2 text-sm text-red-700 underline"
            >
              Continue anyway
            </button>
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Title</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="w-full p-2 border rounded"
            />
            {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title}</p>}
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              rows="3"
            />
          </div>

          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-gray-700 mb-2">Start Time</label>
              <TimePicker
                date={new Date(formData.date)}
                onChange={handleDateChange}
              />
            </div>
            <div>
              <label className="block text-gray-700 mb-2">End Time</label>
              <TimePicker
                date={new Date(formData.endDate)}
                onChange={handleEndDateChange}
              />
              {errors.endDate && <p className="text-red-500 text-sm mt-1">{errors.endDate}</p>}
            </div>
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Color</label>
            <div className="flex space-x-2">
              {colors.map(color => (
                <div
                  key={color.value}
                  onClick={() => setFormData(prev => ({ ...prev, color: color.value }))}
                  className={`w-8 h-8 rounded-full cursor-pointer ${formData.color === color.value ? 'ring-2 ring-offset-2 ring-gray-400' : ''}`}
                  style={{ backgroundColor: color.value }}
                  title={color.name}
                />
              ))}
            </div>
          </div>

          <div className="mb-6">
            <label className="block text-gray-700 mb-2">Recurrence</label>
            <RecurrenceOptions
              recurrence={formData.recurrence}
              recurrenceEnd={formData.recurrenceEnd}
              recurrenceDays={formData.recurrenceDays}
              onChange={handleRecurrenceChange}
            />
          </div>

          <div className="flex justify-end space-x-3">
            <button
              type="button"
              onClick={onCancel}
              className="px-4 py-2 border rounded-md hover:bg-gray-100"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}