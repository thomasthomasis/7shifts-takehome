function StaffList({ staff }) {
  if (staff.length === 0) {
    return <p className="text-gray-500">No staff members yet.</p>;
  }

  return (
     <div className="mb-4 overflow-x-auto">
      <table className="w-full min-w-[280px] text-left text-sm">
        <thead>
          <tr className="border-b text-gray-600">
            <th className="py-2 pr-2">Name</th>
            <th className="py-2 pr-2">Role</th>
            <th className="py-2">Phone</th>
          </tr>
        </thead>
        <tbody>
          {staff.map((member) => (
            <tr key={member.id} className="border-b last:border-0">
              <td className="py-2 pr-2">{member.name}</td>
              <td className="py-2 pr-2 capitalize">{member.role}</td>
              <td className="py-2">{member.phone}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default StaffList;