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
    <form onSubmit={handleSubmit}>
      <label>
        Name
        <input value={name} onChange={(e) => setName(e.target.value)} required />
      </label>

      <label>
        Role
        <select value={role} onChange={(e) => setRole(e.target.value)}>
          {ROLES.map((r) => (
            <option key={r} value={r}>{r}</option>
          ))}
        </select>
      </label>

      <label>
        Phone
        <input value={phone} onChange={(e) => setPhone(e.target.value)} required />
      </label>

      {error && <p role="alert">{error}</p>}

      <button type="submit" disabled={submitting}>
        {submitting ? 'Adding...' : 'Add Staff Member'}
      </button>
    </form>
  );
}

export default StaffForm;