import { useState } from 'react';
import { createStaff } from '../api';

const ROLES = ['server', 'cook', 'manager'];

function StaffForm({ onStaffAdded }) {
  const [name, setName] = useState('');
  const [role, setRole] = useState(ROLES[0]);
  const [phone, setPhone] = useState('');
  const [error, setError] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSubmitting(true);
    setError(null);

    try {
      await createStaff({ name, role, phone });
      setName('');
      setRole(ROLES[0]);
      setPhone('');
      onStaffAdded();
    } catch (err) {
      setError(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className='flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-end'>
      <label className='flex flex-1 flex-col text-sm text-gray-700'>
        Name
        <input value={name} onChange={(e) => setName(e.target.value)} required className='mt-1 rounded border border-gray-300 px-3 py-2 focus:border-slate-500 focus:outline-none' />
      </label>

      <label className='flex flex-col text-sm text-gray-700'>
        Role
        <select value={role} onChange={(e) => setRole(e.target.value)} className='mt-1 rounded border border-gray-300 px-3 py-2 focus:border-slate-500 focus:outline-none'>
          {ROLES.map((r) => (
            <option key={r} value={r}>{r}</option>
          ))}
        </select>
      </label>

      <label className='flex flex-1 flex-col text-sm text-gray-700'>
        Phone
        <input value={phone} onChange={(e) => setPhone(e.target.value)} required className='mt-1 rounded border border-gray-300 px-3 py-2 focus:border-slate-500 focus:outline-none' />
      </label>

      {error && <p role="alert" className='text-sm text-red-600 sm:basis-full'>{error}</p>}

      <button type="submit" disabled={submitting} className='rounded bg-slate-800 px-4 py-2 text-white hover:bg-slate-700 disabled:opacity-50'>
        {submitting ? 'Adding...' : 'Add Staff Member'}
      </button>
    </form>
  );
}

export default StaffForm;