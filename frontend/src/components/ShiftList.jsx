import { useState } from 'react';
import { assignShift } from '../api';

function ShiftRow({ shift, staff, onAssigned }) {
  const [selectedStaffId, setSelectedStaffId] = useState('');
  const [assigning, setAssigning] = useState(false);
  const [error, setError] = useState(null);

  const handleAssign = async () => {
    if (!selectedStaffId) return;

    setAssigning(true);
    setError(null);

    try {
      await assignShift(shift.id, selectedStaffId);
      onAssigned();
    } catch (err) {
      setError(err.message);
    } finally {
      setAssigning(false);
    }
  };

  return (
    <tr>
      <td>{shift.day}</td>
      <td>{shift.start_time}</td>
      <td>{shift.end_time}</td>
      <td>{shift.role}</td>
      <td>{shift.staff ? shift.staff.name : 'Unassigned'}</td>
      <td>
        <select value={selectedStaffId} onChange={(e) => setSelectedStaffId(e.target.value)}>
          <option value="">Select staff...</option>
          {staff.map((member) => (
            <option key={member.id} value={member.id}>
              {member.name}
            </option>
          ))}
        </select>
        <button onClick={handleAssign} disabled={assigning || !selectedStaffId}>
          Assign
        </button>
        {error && <p role="alert">{error}</p>}
      </td>
    </tr>
  );
}

function ShiftList({ shifts, staff, onAssigned }) {
  if (shifts.length === 0) {
    return <p>No shifts yet.</p>;
  }

  return (
    <table>
      <thead>
        <tr>
          <th>Day</th>
          <th>Start</th>
          <th>End</th>
          <th>Role</th>
          <th>Assigned To</th>
          <th>Assign</th>
        </tr>
      </thead>
      <tbody>
        {shifts.map((shift) => (
          <ShiftRow key={shift.id} shift={shift} staff={staff} onAssigned={onAssigned} />
        ))}
      </tbody>
    </table>
  );
}

export default ShiftList;