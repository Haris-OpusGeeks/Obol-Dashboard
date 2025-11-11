import MasterLayout from "../otherImages/MasterLayout";
import DefaultTopBar from "../components/DefaultTopBar";
import InactiveUserTable from "../components/InactiveUserTable";

const InactiveUsers = () => {
  return (
    <>

      {/* MasterLayout */}
      <MasterLayout>

        <DefaultTopBar
            title="Inactive Users"  
        />

        {/* TableDataLayer */}
        <InactiveUserTable />

      </MasterLayout>

    </>
  );
};

export default InactiveUsers; 
