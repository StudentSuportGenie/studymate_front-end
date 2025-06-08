import React, { useState } from 'react';
import StudentSidetab from '../../components/StudentSidetab';

function TimeScheduleAdded() {
  const [selectedDate, setSelectedDate] = useState('');
  const [schedule, setSchedule] = useState(Array(24).fill(false));

  const handleTimeChange = (index) => {
    const updatedSchedule = [...schedule];
    updatedSchedule[index] = !updatedSchedule[index];
    setSchedule(updatedSchedule);
  };

  return (
    <>
      <StudentSidetab />
      <div style={{ padding: '20px' }}>
        <h2>Select Date and Time Schedule (24 Hours)</h2>

        <label>
          Date:
          <input
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            style={{ marginLeft: '10px' }}
          />
        </label>

        <div style={{ marginTop: '20px' }}>
          <h3>Time Slots</h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '10px' }}>
            {Array.from({ length: 24 }).map((_, i) => (
              <label key={i} style={{ display: 'flex', alignItems: 'center' }}>
                <input
                  type="checkbox"
                  checked={schedule[i]}
                  onChange={() => handleTimeChange(i)}
                />
                <span style={{ marginLeft: '8px' }}>
                  {i.toString().padStart(2, '0')}:00 - {((i + 1) % 24).toString().padStart(2, '0')}:00
                </span>
              </label>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default TimeScheduleAdded;
