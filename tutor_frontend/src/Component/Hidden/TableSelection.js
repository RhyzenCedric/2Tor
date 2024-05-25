import React from 'react'
import { Link } from 'react-router-dom';

export default function TableSelection() {
  return (
    <div>
    <h2>Table Selection</h2>
    <div>
      <Link to="/UsersTable">
        <button>Users</button>
      </Link>
    </div>
    <div>
      <Link to="/EducatorsTable">
        <button>Educators</button>
      </Link>
    </div>
    <div>
      <Link to="/">
        <button>Return</button>
      </Link>
    </div>
  </div>
  )
}
