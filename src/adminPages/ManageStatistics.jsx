import React from "react";
import MasterLayout from "../otherImages/MasterLayout";
import StatisticsDataTable from "../components/StatisticsDataTable";
import DefaultTopBar from "../components/DefaultTopBar";

const ManageStatistics = () => {
  return (
    <>
      {/* MasterLayout */}
      <MasterLayout> 

        <DefaultTopBar
            title="Statistics"
        />

        {/* TableDataLayer */}
        <StatisticsDataTable />

      </MasterLayout>

    </>
  );
};

export default ManageStatistics; 
