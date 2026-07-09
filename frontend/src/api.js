const BASE_URL = import.meta.env.VITE_API_URL + '/api';

async function request(path, options = {}) {
    const response = await fetch(`${BASE_URL}${path}`, {
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        ...options,
    })

    if(!response.ok) {
        const body = await response.json().catch(() => null);
        throw new Error(body?.message ?? `Requst failed: ${response.status}`);
    }

    return response.status === 204 ? null : response.json();
}

export const getStaff = () => request('/staff');

export const createStaff = (data) => request('/staff', { method: 'POST', body: JSON.stringify(data) });

export const getShifts = () => request('/shifts');

export const createShift = (data) => request('/shifts', { method: 'POST', body: JSON.stringify(data) });

export const assignShift = (shiftId, staffId) =>
  request(`/shifts/${shiftId}/assign`, {
    method: 'PATCH',
    body: JSON.stringify({ staff_id: staffId }),
  });