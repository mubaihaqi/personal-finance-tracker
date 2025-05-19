import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import CalendarAnimation from "./animations/CalendarAnimation";

export default function Calendar({
  transactions = [],
  currentMonth,
  currentYear,
}) {
  const events = transactions.map((trx) => ({
    title:
      (trx.type === "income" ? "Pemasukan: " : "Pengeluaran: ") + trx.amount,
    date: trx.date,
    color: trx.type === "income" ? "#22c55e" : "#ef4444",
  }));

  // Buat tanggal awal sesuai bulan/tahun dari Chart
  const initialDate =
    currentMonth !== undefined && currentYear !== undefined
      ? `${currentYear}-${String(currentMonth + 1).padStart(2, "0")}-01`
      : undefined;

  return (
    <div className="p-6 pt-4 rounded-xl">
      <h2 className="text-2xl ps-5 font-bold mb-6 text-teal-500 flex items-center gap-2">
        <CalendarAnimation />
        Financial Calendar
      </h2>

      <FullCalendar
        key={initialDate}
        plugins={[dayGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        initialDate={initialDate}
        events={events}
        dateClick={(info) => {
          alert("Tanggal: " + info.dateStr);
        }}
        height="auto"
        eventContent={renderEventContent}
        headerToolbar={false}
        dayMaxEventRows={2}
      />
      <style>{`
.fc th[role="presentation"],
.fc td[role="presentation"],
.fc table,
.fc thead,
.fc tbody,
.fc .fc-scrollgrid,
.fc .fc-daygrid-day,
.fc .fc-col-header-cell {
  border-color: transparent !important;
}

.fc .fc-scrollgrid-sync-inner {
  border: none !important;
}

  /* Header hari styling */
  .fc .fc-col-header-cell {
    background-color: #0F172A;
    color: #14b8a6;
    font-weight: 600;
    height: 3rem;
    vertical-align: middle;
    font-size: 1.125rem;
  }

  .fc .fc-col-header-cell-cushion {
    padding: 0.75rem 0;
    display: block;
  }

  /* Toolbar */
  .fc .fc-toolbar {
    background-color: #64748b; /* slate-500 */
    padding: 1rem;
    border-radius: 0.5rem;
  }

  .fc .fc-toolbar-title {
    color: #14b8a6 !important; /* teal-500 */
    font-size: 1.25rem;
    font-weight: 700;
  }

  .fc .fc-button {
    background: #14b8a6;
    border: none;
    color: #14b8a6;
    border-radius: 6px;
    padding: 0.4em 1em;
    margin: 0 2px;
  }

  .fc .fc-button:hover {
    background: #14b8a6;
  }

  /* Event style */
  .fc .fc-daygrid-event {
    border-radius: 8px;
    padding: 2px 6px;
    font-size: 0.95em;
    font-weight: 500;
    opacity: 0.95;
  }

  .fc .fc-daygrid-event-dot {
    display: none;
  }

.fc-popover {
  background-color: transparent !important;
  box-shadow: none !important;
  border: none !important;
}

.fc-popover .fc-popover-body {
  background-color: rgba(0, 0, 0, 0.8) !important;
  border-radius: 0.5rem;
  backdrop-filter: blur(10px);
}

.fc-popover .fc-popover-header {
  background-color: transparent !important;
  border: none !important;
  color: #fff; /* teal-500 */
  font-weight: 600;
}

.fc .fc-daygrid-event-harness {
  margin-bottom: 3px;
}

.fc .fc-day-today {
  background-color: #0f766e !important;
  color: white !important;
  border-radius: 0.5rem;
  transition: background-color 0.3s ease;
}

.fc .fc-scrollgrid,
.fc .fc-scrollgrid td,
.fc .fc-scrollgrid th,
.fc .fc-daygrid-day {
  border: 1px solid #0f766e !important; /* teal-600 */
}

.fc .fc-daygrid-day-frame {
  border: 1px solid #0f766e !important;
  border-radius: 0.25rem;
}

.fc .fc-scrollgrid {
  border-radius: 0.75rem;
  overflow: hidden;
}

.fc .fc-daygrid-day-frame {
  border-radius: 0.5rem;
}

`}</style>
    </div>
  );
}

function renderEventContent(eventInfo) {
  const [label, nominal] = eventInfo.event.title.split(": ");
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        background:
          eventInfo.event.backgroundColor ||
          eventInfo.event.extendedProps.color,
        borderRadius: "6px",
        padding: "2px 6px",
        fontSize: "0.75rem",
        fontWeight: 500,
        color: "#020617",
        width: "100%",
        gap: "0.25rem",
      }}
    >
      <span>{label}</span>
      <span style={{ fontWeight: 600 }}>{nominal}</span>
    </div>
  );
}
