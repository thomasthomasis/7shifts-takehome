import { useEffect, useState } from 'react';
import { getStaff, getShifts } from './api';
import StaffList from './components/StaffList';
import StaffForm from './components/StaffForm';
import ShiftList from './components/ShiftList';
import ShiftForm from './components/ShiftForm';
import './App.css';

function App() {
  const [staff, setStaff] = useState([]);
  const [staffLoading, setStaffLoading] = useState(true);
  const [staffError, setStaffError] = useState(null);

  const [shifts, setShifts] = useState([]);
  const [shiftsLoading, setShiftsLoading] = useState(true);
  const [shiftsError, setShiftsError] = useState(null);

  const refreshStaff = () => {
    setStaffLoading(true);
    getStaff()
      .then(setStaff)
      .catch((err) => setStaffError(err.message))
      .finally(() => setStaffLoading(false));
  };

  const refreshShifts = () => {
    setShiftsLoading(true);
    getShifts()
      .then(setShifts)
      .catch((err) => setShiftsError(err.message))
      .finally(() => setShiftsLoading(false));
  };

  useEffect(() => {
    refreshStaff();
    refreshShifts();
  }, []);

  return (
    <main>
      <h1>Restaurant Staff Scheduling</h1>

      <section>
        <h2>Staff</h2>
        {staffError && <p role="alert">{staffError}</p>}
        {staffLoading ? <p>Loading...</p> : <StaffList staff={staff} />}
        <StaffForm onStaffAdded={refreshStaff} />
      </section>

      <section>
        <h2>Shifts</h2>
        {shiftsError && <p role="alert">{shiftsError}</p>}
        {shiftsLoading ? (
          <p>Loading...</p>
        ) : (
          <ShiftList shifts={shifts} staff={staff} onAssigned={refreshShifts} />
        )}
        <ShiftForm onShiftAdded={refreshShifts} />
      </section>
    </main>
  );
}

export default App;
