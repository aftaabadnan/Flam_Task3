// src/utils/eventUtils.js
import { parseISO, isSameDay, isWithinInterval, addDays, addWeeks, addMonths, isAfter, isBefore } from 'date-fns';

export function getEventsForDay(events, day) {
  const dayDate = new Date(day);
  return events.filter(event => {
    const eventDate = new Date(event.date);
    
    // Check if the event occurs on this specific day
    if (isSameDay(eventDate, dayDate)) return true;
    
    // Check for recurring events
    if (event.recurrence === 'daily') {
      if (!event.recurrenceEnd || isBefore(dayDate, new Date(event.recurrenceEnd))) {
        return isSameDay(eventDate, dayDate) || isAfter(dayDate, eventDate);
      }
    }
    
    if (event.recurrence === 'weekly') {
      const eventDayOfWeek = eventDate.getDay().toString();
      const currentDayOfWeek = dayDate.getDay().toString();
      
      if (event.recurrenceDays?.includes(currentDayOfWeek)) {
        if (!event.recurrenceEnd || isBefore(dayDate, new Date(event.recurrenceEnd))) {
          return isSameDay(eventDate, dayDate) || isAfter(dayDate, eventDate);
        }
      }
    }
    
    if (event.recurrence === 'monthly') {
      const eventDay = eventDate.getDate();
      const currentDay = dayDate.getDate();
      
      if (eventDay === currentDay) {
        if (!event.recurrenceEnd || isBefore(dayDate, new Date(event.recurrenceEnd))) {
          return isSameDay(eventDate, dayDate) || isAfter(dayDate, eventDate);
        }
      }
    }
    
    return false;
  });
}

export function checkEventConflict(newEvent, existingEvents) {
  const newStart = parseISO(newEvent.date);
  const newEnd = parseISO(newEvent.endDate);
  
  for (const event of existingEvents) {
    const eventStart = parseISO(event.date);
    const eventEnd = parseISO(event.endDate);
    
    if (
      (newStart >= eventStart && newStart < eventEnd) ||
      (newEnd > eventStart && newEnd <= eventEnd) ||
      (newStart <= eventStart && newEnd >= eventEnd)
    ) {
      return event;
    }
  }
  
  return null;
}