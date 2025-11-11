import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { useDispatch } from 'react-redux';
import { updateUser } from '../Redux/Reducers/usersSlice';
import dp1 from "../otherImages/dp-1.png";

const EditUserForm = () => {
  const { state } = useLocation();
  const clientData = state?.client;
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    
    id: '',
    firstName: '',
    lastName: '',
    email: '',
    mobileNo: '',
    birthDate: '',
    defaultMessage: '',
    active: 0,  // default 0 (no change)
    deleted: 0, // Always set deleted to 0
  });

  // Prefill form data
  useEffect(() => {
    if (clientData) {
      const nameParts = clientData.userName?.split(' ') || [];
      setFormData({
        id: clientData.id || '',
        firstName: nameParts[0] || '',
        lastName: nameParts[1] || '',
        email: clientData.email || '',
        mobileNo: clientData.phone || '',
        birthDate: clientData.birthDate != "N/A"
          ? new Date(clientData.birthDate).toISOString().split('T')[0]
          : '',
        defaultMessage: clientData.defaultMessage || '',
        active: clientData.active === "Active" || clientData.active === 1 ? 0 : 2, // 1 = Active, 2 = Inactive
        deleted: 0,  // always set deleted to 0 on update
      });
    }
  }, [clientData]);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle dropdown change for active status
  const handleSelectChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: Number(value),  // Convert value to number (0, 1, or 2)
    }));
  };

  // Submit updated data
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Convert birthDate to timestamp (milliseconds)
      const birthTimestamp = formData.birthDate
        ? new Date(formData.birthDate).getTime()
        : 0;

      const payload = {
        ...formData,
        id: formData.id,
        birthDate: birthTimestamp,
        active: 0,  // always set 'active' to 0
        deleted: 0,  // always set 'deleted' to 0
      };

      console.log("Final payload:", payload);
      await dispatch(updateUser(payload)).unwrap();

      Swal.fire({
        icon: 'success',
        title: 'User Updated Successfully!',
        showConfirmButton: false,
        timer: 2000,
      });

      setTimeout(() => navigate('/users'), 2000);  // Navigate after successful update
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: error || 'Something went wrong while updating the user!',
      });
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
        <label className="form-label">Mobile No *</label>
        <input
          type="text"
          className="form-control"
          name="mobileNo"
          value={formData.mobileNo}
          onChange={handleChange}
          required
        />
      </div>

      <div className="mb-3">
        <label className="form-label">Birth Date</label>
        <input
          type="date"
          className="form-control"
          name="birthDate"
          value={formData.birthDate}
          onChange={handleChange}
        />
      </div>

      <div className="mb-3">
        <label className="form-label">Default Message</label>
        <textarea
          className="form-control"
          name="defaultMessage"
          value={formData.defaultMessage}
          onChange={handleChange}
        />
      </div>

      {/* Active dropdown: 1 for Active, 2 for Inactive */}
      {/* <div className="mb-3">
        <label className="form-label">Active</label>
        <select
          className="form-select"
          name="active"
          value={formData.active}
          onChange={handleSelectChange}
        >
          <option value={0}>Yes</option>
          <option value={2}>No</option> 
        </select>
      </div> */}

      <button type="submit" className="btn btn-primary">
        Save Changes
      </button>
    </form>
  );
};

export default EditUserForm;
