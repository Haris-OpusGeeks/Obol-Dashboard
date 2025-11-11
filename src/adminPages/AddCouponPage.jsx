import React from "react";
import MasterLayout from "../otherImages/MasterLayout";
import AddCouponForm from "../components/AddCouponForm";
import DefaultTopBar from "../components/DefaultTopBar";

const AddCouponPage = () => {
  return (
    <>

      {/* MasterLayout */}
      <MasterLayout>

        <DefaultTopBar
            title="Add Coupon"
            desc="Create Coupon account efficiently."
        />

        {/* TableDataLayer */}
        <AddCouponForm />

      </MasterLayout>

    </>
  );
};

export default AddCouponPage; 
