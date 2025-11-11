import React, { useState, useEffect } from "react";
import MUIDataTable from "mui-datatables";
import { Icon } from "@iconify/react";
import { useNavigate } from "react-router-dom";
import DefaultAvatar from "../otherImages/default.png";
import { useDispatch, useSelector } from "react-redux";
import { getUserData, updateUser } from "../Redux/Reducers/usersSlice";
import Swal from "sweetalert2";

const UserDataTable = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const usersState = useSelector((state) => state.users) || {};
  const { userData = [], isLoading, isError, errorMessage } = usersState;

  useEffect(() => {
    dispatch(getUserData());
  }, [dispatch]);

  if (isLoading) return <h6>Loading...</h6>;
  if (isError) return <p>Error: {errorMessage}</p>;

  const formattedData = userData.map((user, index) => ({
    id: user.id,
    userName: `${user.firstName || ""} ${user.lastName || ""}`.trim(),
    email: user.email || "N/A",
    phone: user.mobileNo || "N/A",
    active: user.active == true ? "Active" : "Inactive",
    referalCode: user.referalCode || "N/A",
    birthDate: user.birthDate
      ? new Date(user.birthDate).toLocaleDateString()
      : "N/A",
    defaultMessage: user.defaultMessage,
  }));
  

  const handleEditUser = (rowData) => {
    navigate("/edit-user", { state: { client: rowData } });
  };

  const handleDeleteUser = async (rowData) => {
    const confirmed = await Swal.fire({
      title: "Are you sure?",
      text: "Do you want to delete this user?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "Cancel",
    });

    if (confirmed.isConfirmed) {
      try {
        const birthTimestamp = rowData.birthDate
        ? new Date(rowData.birthDate).getTime()
        : 0;
        const updatedUser = {
          ...rowData,
          birthDate:birthTimestamp,
          active: 0,
          deleted: 1, // Mark as deleted
        };

        console.log("Final Delete Data>>>", updatedUser);
        console.log("BirthDAte>>>", rowData.birthDate);
        await dispatch(updateUser(updatedUser)).unwrap();

        Swal.fire({
          icon: "success",
          title: "User Deleted Successfully!",
          showConfirmButton: false,
          timer: 2000,
        });

        // Refresh the user data after deletion
        dispatch(getUserData());
      } catch (error) {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Failed to delete the user!",
        });
      }
    }
  };

  const columns = [
    {
      name: "userName",
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
      name: "email",
      label: "Email",
    },
    {
      name: "phone",
      label: "Phone",
    },
    {
      name: "birthDate",
      label: "Birth Date",
    },
    {
      name: "referalCode",
      label: "Referral Code",
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
                onClick={() => handleEditUser(rowData)}
                className="text-primary cursor-pointer"
                icon="line-md:edit"
                width="22"
                height="22"
              />
              <Icon
                onClick={() => handleDeleteUser(rowData)}
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

export default UserDataTable;
