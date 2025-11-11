import React from "react";
import MasterLayout from "../otherImages/MasterLayout";
import TransactionsDataTable from "../components/TransactionsDataTable";
import DefaultTopBar from "../components/DefaultTopBar";

const Transactions = () => {
  return (
    <>
      {/* MasterLayout */}
      <MasterLayout> 

        <DefaultTopBar
            title="Transactions"
        />

        {/* TableDataLayer */}
        <TransactionsDataTable />

      </MasterLayout>

    </>
  );
};

export default Transactions; 
