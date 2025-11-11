import React, { useEffect } from "react";
import MUIDataTable from "mui-datatables";
import { useDispatch, useSelector } from "react-redux";
import { transactionData } from "../Redux/Reducers/dashboardSlice";

const TransactionsDataTable = () => {
  const dispatch = useDispatch();

  const { transactionTotalData, isLoading, isError, errorMessage } = useSelector(
    (state) => state.dashboard
  );

  useEffect(() => {
    dispatch(transactionData());
  }, [dispatch]);

  if (isLoading) return <h6>Loading...</h6>;
  if (isError) return <p>Error: {errorMessage}</p>;

  // ✅ Format API data
  const formattedData =
    transactionTotalData?.transactions?.map((item) => ({
      id: item.id || "N/A",
      userName: `${item.firstName || ""} ${item.lastName || ""}`.trim(),
      email: item.email || "N/A",
      mobileNo: `${item.countryCode || ""} ${item.mobileNo || ""}`,
      platform: item.plateform || "N/A",
      transactionId: item.transactionId || "N/A",
      transactionType: item.transactionType || "N/A",
      totalAmount: item.totalAmount || "0",
      transactionDate: item.transactionDate
        ? new Date(Number(item.transactionDate)).toLocaleString()
        : "N/A",
    })) || [];

  // ✅ Define columns
  const columns = [
    {
      name: "userName",
      label: "Name",
      options: {
        customBodyRender: (value) => (
          <span className="fw-semibold text-dark">{value}</span>
        ),
      },
    },
    // {
    //   name: "email",
    //   label: "Email",
    //   options: {
    //     customBodyRender: (value) => (
    //       <span className="text-secondary">{value}</span>
    //     ),
    //   },
    // },
    {
      name: "mobileNo",
      label: "Mobile No",
      options: {
        customBodyRender: (value) => <span>{value}</span>,
      },
    },
    {
      name: "platform",
      label: "Platform",
      options: {
        customBodyRender: (value) => (
          <span>{value}</span>
        ),
      },
    },
    {
      name: "transactionId",
      label: "Transaction ID",
      options: {
        customBodyRender: (value) => (
          <span className="text-muted small">{value}</span>
        ),
      },
    },
    {
      name: "transactionType",
      label: "Type",
      options: {
        customBodyRender: (value) => {
          const colorClass =
            value === "Online"
              ? "bg-success text-white"
              : "bg-warning text-dark";
          return (
            <span
              className={`px-10 py-1 rounded-pill text-xs fw-bold ${colorClass}`}
            >
              {value}
            </span>
          );
        },
      },
    },
    {
      name: "totalAmount",
      label: "Amount",
      options: {
        customBodyRender: (value) => (
          <span className="fw-bold text-success">{value}</span>
        ),
      },
    },
    {
      name: "transactionDate",
      label: "Date",
      options: {
        customBodyRender: (value) => (
          <span className="text-muted">{value}</span>
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

export default TransactionsDataTable;
