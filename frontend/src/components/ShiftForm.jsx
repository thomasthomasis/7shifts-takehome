import { useState } from 'react';
import { createShift } from '../api';

const ROLES = ['server', 'cook', 'manager'];

function ShiftForm({ onShiftAdded }) {
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
        start_time: startTime,
        end_time: endTime,
        role,
      });
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
    <form onSubmit={handleSubmit} className='flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-end'>
      <label className='flex flex-col text-sm text-gray-700'>
        Start Time
        <input
          type="datetime-local"
          value={startTime}
          onChange={(e) => setStartTime(e.target.value)}
          required
          className='mt-1 rounded border border-gray-300 px-3 py-2 focus:border-slate-500 focus:outline-none'
        />
      </label>

      <label className='flex flex-col text-sm text-gray-700'>
        End Time
        <input
          type="datetime-local"
          value={endTime}
          onChange={(e) => setEndTime(e.target.value)}
          required
          className='mt-1 rounded border border-gray-300 px-3 py-2 focus:border-slate-500 focus:outline-none'
        />
      </label>

      <label className='flex flex-col text-sm text-gray-700'>
        Role
        <select value={role} onChange={(e) => setRole(e.target.value)} className='mt-1 rounded border border-gray-300 px-3 py-2 focus:border-slate-500 focus:outline-none'>
          {ROLES.map((r) => (
            <option key={r} value={r}>{r}</option>
          ))}
        </select>
      </label>

      {error && <p role="alert" className='text-sm text-red-600 sm:basis-full'>{error}</p>}

      <button type="submit" disabled={submitting} className='rounded bg-slate-800 px-4 py-2 text-white hover:bg-slate-700 disabled:opacity-50'>
        {submitting ? 'Creating...' : 'Create Shift'}
      </button>
    </form>
  );
}

export default ShiftForm;