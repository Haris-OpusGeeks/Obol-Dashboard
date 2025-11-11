import React from "react";
import MasterLayout from "../otherImages/MasterLayout";
import EditCouponForm from "../components/EditCouponForm";
import DefaultTopBar from "../components/DefaultTopBar";

const EditCouponPage = () => {
  return (
    <>

      {/* MasterLayout */}
      <MasterLayout>

        <DefaultTopBar
            title="Edit Coupon"
            desc="Edit, and manage coupons efficiently."
        />

        {/* TableDataLayer */}
        <EditCouponForm />

      </MasterLayout>

    </>
  );
};

export default EditCouponPage; 
