// src/components/Calendar/CalendarHeader.jsx
import { format } from "date-fns";

const CalendarHeader = ({ currentMonth, onNext, onPrev }) => {
  return (
    <div className="flex items-center justify-between p-4 bg-blue-600 text-white rounded-t-lg">
      <button
        onClick={onPrev}
        className="p-2 rounded-full hover:bg-blue-700 transition-colors"
      >
        &lt;
      </button>
      <h2 className="text-xl font-bold">{format(currentMonth, "MMMM yyyy")}</h2>
      <button
        onClick={onNext}
        className="p-2 rounded-full hover:bg-blue-700 transition-colors"
      >
        &gt;
      </button>
    </div>
  );
};
export default CalendarHeader;
