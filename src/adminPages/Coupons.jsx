import React from "react";
import MasterLayout from "../otherImages/MasterLayout";
import CouponDataTable from "../components/CouponDataTable";
import DefaultTopBar from "../components/DefaultTopBar";

const Coupons = () => {
  return (
    <>

      {/* MasterLayout */}
      <MasterLayout>

        <DefaultTopBar
            title="Coupon Code"
            desc="View, create and manage coupons efficiently."
            btnText="Add Coupon"
            btnLink="/add-coupon" 
        />

        {/* TableDataLayer */}
        <CouponDataTable />

      </MasterLayout>

    </>
  );
};

export default Coupons; 
