// src/components/RecurrenceOptions.jsx
import { useState } from 'react';

const recurrenceOptions = [
  { value: 'none', label: 'Does not repeat' },
  { value: 'daily', label: 'Daily' },
  { value: 'weekly', label: 'Weekly' },
  { value: 'monthly', label: 'Monthly' },
  { value: 'custom', label: 'Custom' },
];

const daysOfWeek = [
  { value: '0', label: 'Sun' },
  { value: '1', label: 'Mon' },
  { value: '2', label: 'Tue' },
  { value: '3', label: 'Wed' },
  { value: '4', label: 'Thu' },
  { value: '5', label: 'Fri' },
  { value: '6', label: 'Sat' },
];

export default function RecurrenceOptions({ recurrence, recurrenceEnd, recurrenceDays, onChange }) {
  const [customInterval, setCustomInterval] = useState(1);

  const handleRecurrenceChange = (e) => {
    const value = e.target.value;
    onChange({
      recurrence: value,
      recurrenceEnd: value === 'none' ? null : recurrenceEnd,
      recurrenceDays: value === 'weekly' ? recurrenceDays || ['1'] : recurrenceDays
    });
  };

  const handleEndDateChange = (e) => {
    onChange({
      recurrence,
      recurrenceEnd: e.target.value,
      recurrenceDays
    });
  };

  const handleDayToggle = (day) => {
    const newDays = recurrenceDays?.includes(day)
      ? recurrenceDays.filter(d => d !== day)
      : [...(recurrenceDays || []), day];
    
    onChange({
      recurrence,
      recurrenceEnd,
      recurrenceDays: newDays
    });
  };

  return (
    <div className="space-y-4">
      <select
        value={recurrence}
        onChange={handleRecurrenceChange}
        className="w-full p-2 border rounded"
      >
        {recurrenceOptions.map(option => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>

      {recurrence !== 'none' && (
        <div className="pl-4 border-l-2 border-gray-200">
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Ends</label>
            <div className="flex items-center">
              <input
                type="date"
                value={recurrenceEnd || ''}
                onChange={handleEndDateChange}
                className="p-2 border rounded"
              />
            </div>
          </div>

          {recurrence === 'weekly' && (
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Repeat on</label>
              <div className="flex space-x-2">
                {daysOfWeek.map(day => (
                  <button
                    key={day.value}
                    type="button"
                    onClick={() => handleDayToggle(day.value)}
                    className={`w-10 h-10 rounded-full ${recurrenceDays?.includes(day.value) ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
                  >
                    {day.label}
                  </button>
                ))}
              </div>
            </div>
          )}

          {recurrence === 'custom' && (
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Repeat every</label>
              <div className="flex items-center">
                <input
                  type="number"
                  min="1"
                  value={customInterval}
                  onChange={(e) => setCustomInterval(parseInt(e.target.value))}
                  className="w-16 p-2 border rounded"
                />
                <span className="ml-2">weeks</span>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}