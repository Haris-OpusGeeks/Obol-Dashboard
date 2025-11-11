import React, { useEffect } from "react";
import MUIDataTable from "mui-datatables";
import { useDispatch, useSelector } from "react-redux";
import { statisticsData } from "../Redux/Reducers/dashboardSlice";
import DefaultAvatar from "../otherImages/default.png";

const StatisticsDataTable = () => {
  const dispatch = useDispatch();

  const { statisticsTotalData, isLoading, isError, errorMessage } =
    useSelector((state) => state.dashboard);

  useEffect(() => {
    dispatch(statisticsData());
  }, [dispatch]);

  if (isLoading) return <h6>Loading...</h6>;
  if (isError) return <p>Error: {errorMessage}</p>;

  const formattedData = statisticsTotalData.map((item) => ({
    id: item.id || "N/A",
    userName: `${item.firstName || ""} ${item.lastName || ""}`.trim(),
    messagePending: item.messagePending ?? 0,
    messageSended: item.messageSended ?? 0,
    usersInvited: item.usersInvited ?? 0,
  }));

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
      name: "messagePending",
      label: "Pending Messages",
      options: {
        customBodyRender: (value) => (
          <span className="text-warning fw-semibold">{value}</span>
        ),
      },
    },
    {
      name: "messageSended",
      label: "Sent Messages",
      options: {
        customBodyRender: (value) => (
          <span className="text-success fw-semibold">{value}</span>
        ),
      },
    },
    {
      name: "usersInvited",
      label: "Users Invited",
      options: {
        customBodyRender: (value) => (
          <span className="text-primary fw-semibold">{value}</span>
        ),
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

export default StatisticsDataTable;
