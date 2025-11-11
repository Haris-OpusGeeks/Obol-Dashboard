import React from "react";
import MasterLayout from "../otherImages/MasterLayout";
import AddClientForm from "../components/AddUserForm";
import DefaultTopBar from "../components/DefaultTopBar";

const AddUserPage = () => {
  return (
    <>

      {/* MasterLayout */}
      <MasterLayout>

        <DefaultTopBar
            title="Add User"
            desc="Create User account efficiently."
        />

        {/* TableDataLayer */}
        <AddClientForm />

      </MasterLayout>

    </>
  );
};

export default AddUserPage; 
