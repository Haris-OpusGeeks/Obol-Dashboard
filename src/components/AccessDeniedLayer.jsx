import React from "react";
import { Link } from "react-router-dom";
import LogoImage from "../otherImages/logo-side.png"
import { Icon } from "@mui/material";

const AccessDeniedLayer = () => {
  return (
    <div className="custom-bg">
      <div className="container container--xl">
        <div className="d-flex align-items-center justify-content-between py-24">
          <Link to="/" className="">
            <img src={LogoImage} alt="" width="70px" height="70px" />
          </Link>
          <Link
            to="/"
            className="btn bg-primary text-white d-flex gap-10"
            style={{ width: "155px" }}
          >
            <Icon icon="akar-icons:plus" className="fs-4 mb-0" />
            Go Back
          </Link>
        </div>
        {/* <div class="py-res-120 text-center"> */}
        <div className="pt-48 pb-40 text-center">
          <div className="max-w-500-px mx-auto">
            <img src={LogoImage} alt="" />
          </div>
          <div className="max-w-700-px mx-auto mt-40">
            <h3 className="mb-24 max-w-1000-px">Access Denied</h3>
            <p className="text-neutral-500 max-w-700-px text-lg">
              You don't have authorization to get to this page. If it's not too
              much trouble, contact your site executive to demand access.
            </p>
            <div className="d-flex justify-content-center">
              <Link
                to="/"
                className="btn bg-primary text-white d-flex gap-10"
                style={{ width: "155px" }}
              >
                <Icon icon="akar-icons:plus" className="fs-4 mb-0" />
                Go Back
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccessDeniedLayer;
