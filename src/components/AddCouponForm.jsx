import { Icon } from '@iconify/react/dist/iconify.js';
import React, { useState } from 'react';
import Swal from 'sweetalert2';
import { useDispatch } from 'react-redux';
import { addCoupon } from '../Redux/Reducers/couponSlice';
import { useNavigate } from 'react-router-dom';

const AddCouponForm = () => {
  const dispatch = useDispatch();
    const navigate = useNavigate();

  const [formData, setFormData] = useState({
    couponName: '',
    couponCode: '',
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
      const response = await dispatch(addCoupon(formData)).unwrap();

      Swal.fire({
        icon: 'success',
        title: 'Coupon Added Successfully!',
        showConfirmButton: false,
        timer: 2000,
      });

      setFormData({
        couponName: '',
        couponCode: '',
      });
      setTimeout(() => navigate('/coupons'), 2000);
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: error || 'Something went wrong while adding the coupon!',
      });
      console.error('Submit error:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="container mt-4 mainForm">
        <div className="col-md-12 mb-3">
          <label className="form-label">Coupon Name *</label>
          <input
            type="text"
            className="form-control"
            name="couponName"
            value={formData.couponName}
            onChange={handleChange}
            required
          />
        </div>
        <div className="col-md-12 mb-3">
          <label className="form-label">Coupon Code*</label>
          <input
            type="text"
            className="form-control"
            name="couponCode"
            value={formData.couponCode}
            onChange={handleChange}
            required
          />
        </div>

      <button type="submit" className="btn btn-primary">
        Add Coupon
      </button>
    </form>
  );
};

export default AddCouponForm;
