import React, { useEffect, useState } from 'react';
import axios from 'axios';

const StudentList = () => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingStudent, setEditingStudent] = useState(null); // Track student being edited
  const [formData, setFormData] = useState({
    student_name: '',
    student_age: '',
    student_branch: '',
    student_rollno: '',
    student_address: '',
  });

  // Fetch students from API
  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = () => {
    axios.get('http://127.0.0.1:8000/api/get-students/')
      .then(response => {
        setStudents(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching students:', error);
        setLoading(false);
      });
  };

  // Handle edit click
  const handleEdit = (student) => {
    setEditingStudent(student.id);
    setFormData({
      student_name: student.student_name,
      student_age: student.student_age,
      student_branch: student.student_branch,
      student_rollno: student.student_rollno,
      student_address: student.student_address,
    });
  };

  // Handle delete click
  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this student?')) {
      axios.delete(`http://127.0.0.1:8000/api/delete-student/${id}/`)
        .then(() => {
          fetchStudents(); // Refresh list
        })
        .catch(error => console.error('Error deleting student:', error));
    }
  };

  // Handle form change during edit
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submission for editing
  const handleUpdate = (e) => {
    e.preventDefault();
    axios.put(`http://127.0.0.1:8000/api/update-student/${editingStudent}/`, formData)
      .then(() => {
        setEditingStudent(null);
        fetchStudents(); // Refresh list
      })
      .catch(error => console.error('Error updating student:', error));
  };

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Student Records</h2>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <table className="table table-bordered table-striped">
          <thead className="table-dark">
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Age</th>
              <th>Branch</th>
              <th>Roll Number</th>
              <th>Address</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {students.map((student) => (
              <tr key={student.id}>
                {editingStudent === student.id ? (
                  <>
                    <td>{student.id}</td>
                    <td><input type="text" name="student_name" value={formData.student_name} onChange={handleChange} /></td>
                    <td><input type="number" name="student_age" value={formData.student_age} onChange={handleChange} /></td>
                    <td><input type="text" name="student_branch" value={formData.student_branch} onChange={handleChange} /></td>
                    <td><input type="number" name="student_rollno" value={formData.student_rollno} onChange={handleChange} /></td>
                    <td><input type="text" name="student_address" value={formData.student_address} onChange={handleChange} /></td>
                    <td>
                      <button className="btn btn-success btn-sm me-2" onClick={handleUpdate}>Save</button>
                      <button className="btn btn-secondary btn-sm" onClick={() => setEditingStudent(null)}>Cancel</button>
                    </td>
                  </>
                ) : (
                  <>
                    <td>{student.id}</td>
                    <td>{student.student_name}</td>
                    <td>{student.student_age}</td>
                    <td>{student.student_branch}</td>
                    <td>{student.student_rollno}</td>
                    <td>{student.student_address}</td>
                    <td>
                      <button className="btn btn-warning btn-sm me-2" onClick={() => handleEdit(student)}>Edit</button>
                      <button className="btn btn-danger btn-sm" onClick={() => handleDelete(student.id)}>Delete</button>
                    </td>
                  </>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default StudentList;
