import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import StudentForm from './components/pages/student/StudentForm';
import StudentList from './components/pages/student/StudentList';
import Navbar from './components/shared/Navbar';

const App = () => {
  return (
    <Router>
      <Navbar />
      <div>
        <Routes>
          <Route path="/add-student" element={<StudentForm />} />
          <Route path="/students" element={<StudentList />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
