import React, { useEffect, useState } from "react";
import MUIDataTable from "mui-datatables";
import { Icon } from "@iconify/react";
import DefaultAvatar from "../otherImages/default.png";
import { useDispatch, useSelector } from "react-redux";
import { getInactiveUsers,getUserByID,markDead} from "../Redux/Reducers/usersSlice";
import Swal from "sweetalert2";
import { Button } from "bootstrap";
import UserDetailModal from "./UserDetailModal";

const InactiveUserTable = () => {
  const dispatch = useDispatch();

  const { inactiveData,userDataByID, isLoading, isError, errorMessage } =
    useSelector((state) => state.users);

    const [showModal, setShowModal] = useState(false);

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

  console.log("InactiveuserDataByID>>>>1234",userDataByID);

  const handleShowDetail = async (userId) => {
    try {
          await dispatch(getUserByID(userId)).unwrap();
          setShowModal(true);
            
        } catch (error) {
          Swal.fire({
            icon: "error",
            title: "Error",
            text: "Failed to get the user detail",
          });
        }
  };

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
            <div className="d-flex gap-2 justify-content-center align-items-center">
              <Icon
                onClick={() => handleShowDetail(rowData.id)}
                className="text-primary cursor-pointer"
                icon="ic:round-remove-red-eye"
                width="22"
                height="22"
              />
              <button
                onClick={() => handleDeleteUser(rowData.id)}
                className="whiteText cursor-pointer bg-danger px-8 py-4 rounded-3"
                width="22"
                height="22"
              >Mark Dead</button>
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

  const entryList = inactiveData.filter(i => i.id == userDataByID.id);
  const entry = entryList.length ==0? null: entryList[0];
  return (
    <div className="card basic-data-table">
      <div className="card-body">
        <MUIDataTable
          data={formattedData}
          columns={columns}
          options={options}
          className="overflow-hidden packageTable"
        />

        <UserDetailModal
        showModal={showModal}
        inactiveUserDataByID={userDataByID}
        userDataByID={userDataByID}
       verficationStepUpdateAt={entry?.stepUpdatedAt}

        onClose={() => {
          setShowModal(false);
          dispatch(getInactiveUsers());
        }
      } 
      />
      </div>
    </div>
  );
};

export default InactiveUserTable;
