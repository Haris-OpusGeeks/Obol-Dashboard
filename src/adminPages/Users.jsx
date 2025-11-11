import React from "react";
import MasterLayout from "../otherImages/MasterLayout";
import UserDataTable from "../components/UserDataTable";
import DefaultTopBar from "../components/DefaultTopBar";

const ManageClients = () => {
  return (
    <>

      {/* MasterLayout */}
      <MasterLayout>

        <DefaultTopBar
            title="Users"
            desc="View, create and manage users accounts efficiently."
            btnText="Add User"
            btnLink="/add-user" 
        />

        {/* TableDataLayer */}
        <UserDataTable />

      </MasterLayout>

    </>
  );
};

export default ManageClients; 
