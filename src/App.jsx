// src/App.js
import { useState } from "react";
import Calendar from "./components/Calendar/Calendar";
import { useLocalStorage } from "./hooks/useLocalStorage.js";
import EventForm from "./components/Calendar/EventForm";
function App() {
  const [events, setEvents] = useLocalStorage("calendarEvents", []);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [isFormOpen, setIsFormOpen] = useState(false);

  const handleAddEvent = (date) => {
    setSelectedEvent({
      id: Date.now(),
      title: "",
      description: "",
      date: date.toISOString(),
      endDate: new Date(date.setHours(date.getHours() + 1)).toISOString(),
      recurrence: "none",
      color: "#3b82f6",
    });
    setIsFormOpen(true);
  };

  const handleEditEvent = (event) => {
    setSelectedEvent({ ...event });
    setIsFormOpen(true);
  };

  const handleDeleteEvent = (id) => {
    setEvents(events.filter((event) => event.id !== id));
  };

  const handleSaveEvent = (event) => {
    if (events.some((e) => e.id === event.id)) {
      setEvents(events.map((e) => (e.id === event.id ? event : e)));
    } else {
      setEvents([...events, event]);
    }
    setIsFormOpen(false);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="max-w-6xl mx-auto bg-white rounded-lg shadow-md overflow-hidden">
        <Calendar
          events={events}
          onAddEvent={handleAddEvent}
          onEditEvent={handleEditEvent}
          onDeleteEvent={handleDeleteEvent}
        />

        {isFormOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <EventForm
              event={selectedEvent}
              onSave={handleSaveEvent}
              onCancel={() => setIsFormOpen(false)}
              existingEvents={events}
            />
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
