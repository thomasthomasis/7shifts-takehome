import { useState } from 'react';
import { assignShift } from '../api';
import { formatDate, formatTime } from '../format';

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
    <tr className='border-b align-top last:border-0'>
      <td className='py-2 pr-2'>{formatDate(shift.day)}</td>
      <td className='py-2 pr-2'>{formatTime(shift.start_time)}</td>
      <td className='py-2 pr-2'>{formatTime(shift.end_time)}</td>
      <td className='py-2 pr-2 capitalize'>{shift.role}</td>
      <td className='py-2 pr-2'>{shift.staff ? shift.staff.name : 'Unassigned'}</td>
      <td className='py-2'>
        <div className='flex flex-col gap-2'>
            <select
              value={selectedStaffId}
              onChange={(e) => setSelectedStaffId(e.target.value)}
              className='w-28 rounded border border-gray-300 px-1 py-1 text-xs'
            >
            <option value="">Select...</option>
            {staff.map((member) => (
                <option key={member.id} value={member.id}>
                {member.name}
                </option>
            ))}
            </select>
            <button
              onClick={handleAssign}
              disabled={assigning || !selectedStaffId}
              className='rounded bg-slate-800 px-2 py-1 text-xs text-white hover:bg-slate-700 disabled:opacity-50'
            >
            Assign
            </button>
        </div>
        {error && <p role="alert">{error}</p>}
      </td>
    </tr>
  );
}

function ShiftList({ shifts, staff, onAssigned }) {
  if (shifts.length === 0) {
    return <p className='text-gray-500'>No shifts yet.</p>;
  }

  return (
    <div className='mb-4 overflow-x-auto'>
    <table className='w-full min-w-[520px] text-left text-sm'>
      <thead>
        <tr className='border-b text-gray-600'>
          <th className='py-2 pr-2'>Day</th>
          <th className='py-2 pr-2'>Start</th>
          <th className='py-2 pr-2'>End</th>
          <th className='py-2 pr-2'>Role</th>
          <th className='py-2 pr-2'>Assigned To</th>
          <th className='py-2'>Assign</th>
        </tr>
      </thead>
      <tbody>
        {shifts.map((shift) => (
          <ShiftRow key={shift.id} shift={shift} staff={staff} onAssigned={onAssigned} />
        ))}
      </tbody>
    </table>
    </div>
  );
}

export default ShiftList;