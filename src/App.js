import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import StudentForm from './StudentForm';
import StudentList from './StudentList';

const App = () => {
  return (
    <Router>
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

        <Routes>
          <Route path="/add-student" element={<StudentForm />} />
          <Route path="/students" element={<StudentList />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
