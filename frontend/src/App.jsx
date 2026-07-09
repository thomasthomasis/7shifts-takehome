import { useEffect, useState } from 'react';
import { getStaff, getShifts } from './api';
import StaffList from './components/StaffList';
import StaffForm from './components/StaffForm';
import ShiftList from './components/ShiftList';
import ShiftForm from './components/ShiftForm';
import Header from './components/Header';
import Footer from './components/Footer';
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
    <div className='flex min-h-screen flex-col bg-gray-50'>
      <Header />
    <main className='mx-auto flex w-full max-w-7xl flex-1 flex-col gap-8 px-4 py-6 md:grid md:grid-cols-[minmax(0,1fr)_minmax(0,2fr)] md:gap-6 md:items-start'>
      <section className='rounded-lg bg-white p-4 shadow'>
        <h2 className='mb-4 text-xl font-semibold text-gray-800'>Staff</h2>
        {staffError && <p role="alert" className='mb-2 text-sm text-red-600'>{staffError}</p>}
        {staffLoading ? <p className='text-gray-500'>Loading...</p> : <StaffList staff={staff} />}
        <StaffForm onStaffAdded={refreshStaff} />
      </section>

      <section className="rounded-lg bg-white p-4 shadow">
        <h2 className="mb-4 text-xl font-semibold text-gray-800">Shifts</h2>
        {shiftsError && <p role="alert" className="mb-2 text-sm text-red-600">{shiftsError}</p>}
        {shiftsLoading ? (
          <p className="text-gray-500">Loading...</p>
        ) : (
          <ShiftList shifts={shifts} staff={staff} onAssigned={refreshShifts} />
        )}
        <ShiftForm onShiftAdded={refreshShifts} />
      </section>
    </main>
    </div>
  );
}

export default App;
