function StaffList({ staff }) {
  if (staff.length === 0) {
    return <p>No staff members yet.</p>;
  }

  return (
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Role</th>
          <th>Phone</th>
        </tr>
      </thead>
      <tbody>
        {staff.map((member) => (
          <tr key={member.id}>
            <td>{member.name}</td>
            <td>{member.role}</td>
            <td>{member.phone}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default StaffList;