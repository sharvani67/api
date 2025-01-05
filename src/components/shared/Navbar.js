import React from 'react'

const Navbar = () => {
  return (
    <div>
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <a className="navbar-brand" href="/">Student Management</a>
          <ul className="navbar-nav">
            <li className="nav-item">
              <a className="nav-link" href="/add-student">Add Student</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/students">View Students</a>
            </li>
          </ul>
        </nav>
    </div>
  )
}

export default Navbar