import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { useDispatch } from 'react-redux';
import { updateCoupon } from '../Redux/Reducers/couponSlice';

const EditCouponForm = () => {
  const { state } = useLocation();
  const couponData = state?.coupon;
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    
    id: '',
    couponName: '',
    couponCode: '',
  });

  // Prefill form data
  useEffect(() => {
    if (couponData) {
      setFormData({
        id: couponData.id || '',
        couponName: couponData.couponName || '',
        couponCode: couponData.couponCode || '',
      });
    }
  }, [couponData]);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Submit updated data
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {

      const payload = {
        ...formData,
        id: formData.id,
      };

      console.log("Final payload:", payload);
      await dispatch(updateCoupon(payload)).unwrap();

      Swal.fire({
        icon: 'success',
        title: 'Coupon Updated Successfully!',
        showConfirmButton: false,
        timer: 2000,
      });

      setTimeout(() => navigate('/coupons'), 2000);  // Navigate after successful update
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: error || 'Something went wrong while updating the coupon!',
      });
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
          <label className="form-label">Coupon Code *</label>
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
        Save Changes
      </button>
    </form>
  );
};

export default EditCouponForm;
