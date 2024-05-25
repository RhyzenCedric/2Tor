import React from 'react';
import { Link } from 'react-router-dom';

export default function RoleSelection() {
  return (
    <div>
      <h2>Role Selection</h2>
      <div>
        <Link to="/loginUser">
          <button>User</button>
        </Link>
      </div>
      <div>
        <Link to="/loginEducator">
          <button>Educator</button>
        </Link>
      </div>
      <div>
        <Link to="/TableSelection">
          <button>Admin</button>
        </Link>
      </div>
    </div>
  );
}
