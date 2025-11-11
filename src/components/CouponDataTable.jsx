import React, { useState, useEffect } from "react";
import MUIDataTable from "mui-datatables";
import { Icon } from "@iconify/react";
import { useNavigate } from "react-router-dom";
import DefaultAvatar from "../otherImages/default.png";
import { useDispatch, useSelector } from "react-redux";
import { getCouponData, deleteCoupon } from "../Redux/Reducers/couponSlice";
import Swal from "sweetalert2";

const CouponDataTable = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const couponsState = useSelector((state) => state.coupons) || {};
  const { couponData = [], isLoading, isError, errorMessage } = couponsState;

  useEffect(() => {
    dispatch(getCouponData());
  }, [dispatch]);

  if (isLoading) return <h6>Loading...</h6>;
  if (isError) return <p>Error: {errorMessage}</p>;

  const formattedData = couponData.map((coupon, index) => ({
    id: coupon.id,
    couponName: coupon.couponName || "N/A",
    couponCode: coupon.couponCode || "N/A",
    isConsumed: coupon.isConsumed == true ? "Yes" : "No",
    active: coupon.active == true ? "Active" : "Inactive",
    created: coupon.created
    ? new Date(coupon.created).toLocaleString("en-US", {
        year: "numeric",
        month: "short",
        day: "2-digit",
      })
    : "N/A",
  }));
  

  const handleEditCoupon = (rowData) => {
    navigate("/edit-coupon", { state: { coupon: rowData } });
  };

  const handleDeleteCoupon = async (couponId) => {
  const confirmed = await Swal.fire({
    title: "Are you sure?",
    text: "Do you want to delete this coupon?",
    icon: "warning",
    showCancelButton: true,
    confirmButtonText: "Yes, delete it!",
    cancelButtonText: "Cancel",
  });

  if (confirmed.isConfirmed) {
    try {
      await dispatch(deleteCoupon(couponId)).unwrap();

      Swal.fire({
        icon: "success",
        title: "Coupon Deleted Successfully!",
        timer: 1500,
        showConfirmButton: false,
      });

      // Refresh list
      dispatch(getCouponData());
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Failed to delete coupon!",
      });
    }
  }
};

  const columns = [
    {
      name: "couponName",
      label: "Name",
      options: {
        customBodyRender: (value, tableMeta) => {
          const { clientImage } = formattedData[tableMeta.rowIndex];
          return (
            <div className="d-flex align-items-center gap-2">
              <img
                src={clientImage || DefaultAvatar}
                alt="avatar"
                style={{
                  height: "35px",
                  width: "35px",
                  borderRadius: "50%",
                  objectFit: "cover",
                }}
              />
              <span>{value}</span>
            </div>
          );
        },
      },
    },
    {
      name: "couponCode",
      label: "Coupon Code",
    },
    {
      name: "isConsumed",
      label: "Is Consumed",
    },
    {
      name: "created",
      label: "Created At",
    },
    {
      name: "active",
      label: "Status",
      options: {
        customBodyRender: (value) => (
          <span
            className={`badge ${value === "Active" ? "bg-success" : "bg-danger"} whiteText`}
          >
            {value}
          </span>
        ),
      },
    },
    {
      name: "Manage",
      label: "Actions",
      options: {
        filter: false,
        sort: false,
        customBodyRenderLite: (dataIndex) => {
          const rowData = formattedData[dataIndex];
          return (
            <div className="d-flex gap-2 justify-content-center">
              <Icon
                onClick={() => handleEditCoupon(rowData)}
                className="text-primary cursor-pointer"
                icon="line-md:edit"
                width="22"
                height="22"
              />
              <Icon
                onClick={() => handleDeleteCoupon(rowData.id)}
                className="text-danger cursor-pointer"
                icon="material-symbols:delete-outline"
                width="22"
                height="22"
              />
            </div>
          );
        },
      },
    },
  ];

  const options = {
    selectableRows: "none",
    rowsPerPage: 10,
    responsive: "standard",
    elevation: 0,
    print: false,
    download: false,
    viewColumns: false,
    filter: false,
    search: true,
  };

  return (
    <div className="card basic-data-table">
      <div className="card-body">
        <MUIDataTable
          data={formattedData}
          columns={columns}
          options={options}
          className="overflow-hidden packageTable"
        />
      </div>
    </div>
  );
};

export default CouponDataTable;
