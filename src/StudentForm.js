import React, { useState } from 'react';
import axios from 'axios';

const StudentForm = () => {
  const [formData, setFormData] = useState({
    student_name: '',
    student_age: '',
    student_branch: '',
    student_rollno: '',
    student_address: '',
  });

  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validateForm = () => {
    let formErrors = {};
    if (!formData.student_name.trim()) formErrors.student_name = 'Name is required';
    if (!formData.student_age || formData.student_age <= 0) formErrors.student_age = 'Valid age is required';
    if (!formData.student_branch.trim()) formErrors.student_branch = 'Branch is required';
    if (!formData.student_rollno || formData.student_rollno <= 0) formErrors.student_rollno = 'Valid roll number is required';
    if (!formData.student_address.trim()) formErrors.student_address = 'Address is required';
    return formErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formErrors = validateForm();
    if (Object.keys(formErrors).length === 0) {
      try {
        const response = await axios.post('http://127.0.0.1:8000/api/add-student/', formData, {
          headers: {
            'Content-Type': 'application/json',
          },
        });
        setMessage(response.data.message);
        setFormData({
          student_name: '',
          student_age: '',
          student_branch: '',
          student_rollno: '',
          student_address: '',
        });
      } catch (error) {
        setMessage('Failed to submit form. Please try again.');
      }
    } else {
      setErrors(formErrors);
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Student Form</h2>
      {message && <div className="alert alert-info">{message}</div>}
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Name</label>
          <input
            type="text"
            name="student_name"
            value={formData.student_name}
            onChange={handleChange}
            className={`form-control ${errors.student_name && 'is-invalid'}`}
          />
          {errors.student_name && <div className="invalid-feedback">{errors.student_name}</div>}
        </div>

        <div className="mb-3">
          <label className="form-label">Age</label>
          <input
            type="number"
            name="student_age"
            value={formData.student_age}
            onChange={handleChange}
            className={`form-control ${errors.student_age && 'is-invalid'}`}
          />
          {errors.student_age && <div className="invalid-feedback">{errors.student_age}</div>}
        </div>

        <div className="mb-3">
          <label className="form-label">Branch</label>
          <input
            type="text"
            name="student_branch"
            value={formData.student_branch}
            onChange={handleChange}
            className={`form-control ${errors.student_branch && 'is-invalid'}`}
          />
          {errors.student_branch && <div className="invalid-feedback">{errors.student_branch}</div>}
        </div>

        <div className="mb-3">
          <label className="form-label">Roll Number</label>
          <input
            type="number"
            name="student_rollno"
            value={formData.student_rollno}
            onChange={handleChange}
            className={`form-control ${errors.student_rollno && 'is-invalid'}`}
          />
          {errors.student_rollno && <div className="invalid-feedback">{errors.student_rollno}</div>}
        </div>

        <div className="mb-3">
          <label className="form-label">Address</label>
          <input
            type="text"
            name="student_address"
            value={formData.student_address}
            onChange={handleChange}
            className={`form-control ${errors.student_address && 'is-invalid'}`}
          />
          {errors.student_address && <div className="invalid-feedback">{errors.student_address}</div>}
        </div>

        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
    </div>
  );
};

export default StudentForm;
