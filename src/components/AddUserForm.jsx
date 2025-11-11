import { Icon } from '@iconify/react/dist/iconify.js';
import React, { useState } from 'react';
import Swal from 'sweetalert2';
import { useDispatch } from 'react-redux';
import { addUser } from '../Redux/Reducers/usersSlice';
import { useNavigate } from 'react-router-dom';

const AddUserForm = () => {
  const dispatch = useDispatch();
    const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    mobile: '',
    password: '',
    referralCode: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await dispatch(addUser(formData)).unwrap();

      Swal.fire({
        icon: 'success',
        title: 'User Added Successfully!',
        showConfirmButton: false,
        timer: 2000,
      });

      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        mobile: '',
        password: '',
        referralCode: '',
      });
      setTimeout(() => navigate('/users'), 2000);
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: error || 'Something went wrong while adding the user!',
      });
      console.error('Submit error:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="container mt-4 mainForm">
      <div className="row">
        <div className="col-md-6 mb-3">
          <label className="form-label">First Name *</label>
          <input
            type="text"
            className="form-control"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            required
          />
        </div>
        <div className="col-md-6 mb-3">
          <label className="form-label">Last Name *</label>
          <input
            type="text"
            className="form-control"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            required
          />
        </div>
      </div>

      <div className="mb-3">
        <label className="form-label">Email *</label>
        <input
          type="email"
          className="form-control"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
        />
      </div>

      <div className="mb-3">
        <label className="form-label">Mobile *</label>
        <input
          type="text"
          className="form-control"
          name="mobile"
          value={formData.mobile}
          onChange={handleChange}
          required
        />
      </div>

      <div className="mb-3 position-relative">
        <label className="form-label">Password *</label>
        <div className="input-group">
          <input
            type={showPassword ? 'text' : 'password'}
            className="form-control"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
          <button
            type="button"
            className="btn btn-outline-secondary eyeBtn"
            onClick={() => setShowPassword(!showPassword)}
            tabIndex={-1}
          >
            {showPassword ? (
              <Icon icon="bi:eye-slash-fill" width="22" height="22" />
            ) : (
              <Icon icon="bi:eye-fill" width="22" height="22" />
            )}
          </button>
        </div>
      </div>

      <div className="mb-3">
        <label className="form-label">Referral Code</label>
        <input
          type="text"
          className="form-control"
          name="referralCode"
          value={formData.referralCode}
          onChange={handleChange}
        />
      </div>

      <button type="submit" className="btn btn-primary">
        Add User
      </button>
    </form>
  );
};

export default AddUserForm;
