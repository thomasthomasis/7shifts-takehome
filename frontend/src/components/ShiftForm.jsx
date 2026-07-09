import { useState } from 'react';
import { createShift } from '../api';

const ROLES = ['server', 'cook', 'manager'];

function ShiftForm({ onShiftAdded }) {
  const [day, setDay] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [role, setRole] = useState(ROLES[0]);
  const [error, setError] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSubmitting(true);
    setError(null);

    try {
      await createShift({
        day,
        start_time: startTime,
        end_time: endTime,
        role,
      });
      setDay('');
      setStartTime('');
      setEndTime('');
      setRole(ROLES[0]);
      onShiftAdded();
    } catch (err) {
      setError(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Day
        <input type="date" value={day} onChange={(e) => setDay(e.target.value)} required />
      </label>

      <label>
        Start Time
        <input
          type="datetime-local"
          value={startTime}
          onChange={(e) => setStartTime(e.target.value)}
          required
        />
      </label>

      <label>
        End Time
        <input
          type="datetime-local"
          value={endTime}
          onChange={(e) => setEndTime(e.target.value)}
          required
        />
      </label>

      <label>
        Role
        <select value={role} onChange={(e) => setRole(e.target.value)}>
          {ROLES.map((r) => (
            <option key={r} value={r}>{r}</option>
          ))}
        </select>
      </label>

      {error && <p role="alert">{error}</p>}

      <button type="submit" disabled={submitting}>
        {submitting ? 'Creating...' : 'Create Shift'}
      </button>
    </form>
  );
}

export default ShiftForm;