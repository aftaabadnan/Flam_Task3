// src/utils/calendarUtils.js
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isSameMonth, isSameDay, addMonths, subMonths } from 'date-fns';

export function getDaysInMonth(month) {
  const monthStart = startOfMonth(month);
  const monthEnd = endOfMonth(month);
  return eachDayOfInterval({ start: monthStart, end: monthEnd });
}

export function isDayInMonth(day, month) {
  return isSameMonth(day, month);
}

export function isToday(day) {
  return isSameDay(day, new Date());
}