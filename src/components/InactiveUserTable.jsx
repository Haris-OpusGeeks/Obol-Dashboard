import React, { useEffect } from "react";
import MUIDataTable from "mui-datatables";
import { Icon } from "@iconify/react";
import DefaultAvatar from "../otherImages/default.png";
import { useDispatch, useSelector } from "react-redux";
import { getInactiveUsers,markDead} from "../Redux/Reducers/usersSlice";
import Swal from "sweetalert2";

const InactiveUserTable = () => {
  const dispatch = useDispatch();

  const { inactiveData, isLoading, isError, errorMessage } =
    useSelector((state) => state.users);

  useEffect(() => {

    dispatch(getInactiveUsers());
    
  }, [dispatch]);

  if (isLoading) return <h6>Loading...</h6>;
  if (isError) return <p>Error: {errorMessage}</p>;

  const formattedData = inactiveData.map((item) => ({
    id: item.id || "N/A",
    userName: `${item.firstName || ""} ${item.lastName || ""}`.trim(),
    email: item.email ?? "N/A",
    mobileNo: item.mobileNo ?? "N/A",
    lastSeen: item.lastSeen
      ? new Date(item.lastSeen).toLocaleString()
      : "N/A",
  }));

const handleDeleteUser = async (userId) => {
  const confirmed = await Swal.fire({
    title: "Are you sure?",
    text: "Do you want to mark this user as dead?",
    icon: "warning",
    showCancelButton: true,
    confirmButtonText: "Yes, mark dead!",
  });

  if (confirmed.isConfirmed) {
    try {
      await dispatch(markDead(userId)).unwrap();

      Swal.fire({
        icon: "success",
        title: "User Marked Dead!",
        timer: 1500,
        showConfirmButton: false,
      });

      // Refresh list
      dispatch(getInactiveUsers());
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Failed to mark user dead!",
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
          const rowData = formattedData[tableMeta.rowIndex];
          return (
            <div className="d-flex align-items-center gap-2">
              <img
                src={DefaultAvatar}
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
      options: {
        customBodyRender: (value) => (
          <span className="text-dark">{value}</span>
        ),
      },
    },
    {
      name: "mobileNo",
      label: "Mobile No",
      options: {
        customBodyRender: (value) => (
          <span className="text-secondary">{value}</span>
        ),
      },
    },
    {
      name: "lastSeen",
      label: "Last Seen",
      options: {
        customBodyRender: (value) => (
          <span className="text-muted">{value}</span>
        ),
      },
    },
    {
      name: "action",
      label: "Action",
      options: {
        filter: false,
        sort: false,
        customBodyRenderLite: (dataIndex) => {
          const rowData = formattedData[dataIndex];
          return (
            <div className="d-flex gap-2 justify-content-center">
              <Icon
                onClick={() => handleDeleteUser(rowData.id)}
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

export default InactiveUserTable;
