import React from "react";

const UserDetailModal = ({ showModal, userDataByID, onClose , inactiveUserDataByID, verficationStepUpdateAt }) => {
  if (!userDataByID) return null; 

    let isOneDayPassed = false;

    if (verficationStepUpdateAt) {
      const verificationDate = new Date(verficationStepUpdateAt);
      const currentDate = new Date();
      const timeDifference = currentDate - verificationDate;
      console.log("timeDifference",timeDifference);

      const oneDayInMs = 48 * 60 * 60 * 1000;
      if (timeDifference >= oneDayInMs) {
        isOneDayPassed = true;
      }
    }
    var verificationDateModal = verficationStepUpdateAt
  ? new Date(verficationStepUpdateAt).toLocaleString("en-US", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    })
  : "N/A";


  return (
    <div
      className={`modal fade ${showModal ? "show" : ""}`}
      id="userDetailModal"
      tabIndex="-1"
      aria-labelledby="userDetailModalLabel"
      aria-hidden="true"
      style={{ display: showModal ? "block" : "none" }}
    >
      <div className="modal-dialog modal-lg userDetailModal">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="userDetailModalLabel">
              User Details
            </h5>
            <button
              type="button"
              className="btn-close"
              onClick={onClose}
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body row">
            <div className="col-md-6">
                <p><strong>Name:</strong> {userDataByID.firstName} {userDataByID.lastName}</p>
            </div>
            <div className="col-md-6">
                <p><strong>Email:</strong> {userDataByID.primaryEmail ? userDataByID.primaryEmail : "N/A"}</p>
            </div>
            <div className="col-md-6">
                <p><strong>Phone Number:</strong> {userDataByID.primaryMobile ? userDataByID.primaryMobile : "N/A"}</p>
            </div>
             <div className="col-md-6">
                <p><strong>Birth Date:</strong> {userDataByID.birthDate ? new Date(userDataByID.birthDate).toLocaleDateString() : "N/A"}</p>
            </div>
            <div className="col-md-6">
                <p><strong>Referral Code:</strong> {userDataByID.referralCode ? userDataByID.referralCode : "N/A"}</p>
            </div>
            <div className="col-md-6">
                <p><strong>Address:</strong> {userDataByID.address ? userDataByID.address : "N/A"}</p>
            </div>
            <div className="col-md-6">
                <p><strong>User Mobile No. 1:</strong> {userDataByID.mobile1 ? userDataByID.countryCode + userDataByID.mobile1 : "N/A"}</p>
            </div>
            <div className="col-md-6">
                <p><strong>User Mobile No. 2:</strong> {userDataByID.mobile2 ? userDataByID.countryCode + userDataByID.mobile2 : "N/A"} </p>
            </div>
            <div className="col-md-6">
                <p><strong>Emergency Contact 1:</strong> {userDataByID.emergencyNumber1 ? userDataByID.countryCode + userDataByID.emergencyNumber1 : "N/A"}</p>
            </div>
            <div className="col-md-6">
                <p><strong>Emergency Contact 2:</strong> {userDataByID.emergencyNumber2 ? userDataByID.countryCode + userDataByID.emergencyNumber2 : "N/A"} </p>
            </div> 
            <div className="col-md-6">
                <p><strong>User Email 1:</strong> {userDataByID.email1 ? userDataByID.email1 : "N/A"}</p>
            </div>
            <div className="col-md-6">
                <p><strong>User Email 2:</strong> {userDataByID.email2 ? userDataByID.email2 : "N/A"} </p>
            </div>
            {
            inactiveUserDataByID ?
            <div className="col-md-6">
                <p><strong>Last Verification Step Date:</strong> {verificationDateModal?? "none"} </p>
            </div> : ""
            } 
            {
            inactiveUserDataByID ?
            <div className="col-md-6">
                <p><strong>Verification Step:</strong> {inactiveUserDataByID.verificationStep == 0 ? "No Verification Required" : inactiveUserDataByID.verificationStep == 1 ? "User is validating Captcha": inactiveUserDataByID.verificationStep == 2 ? "User is validating Phone Number " : "N/A"} </p>
            </div> : ""
            } 
            {
            inactiveUserDataByID && inactiveUserDataByID.verificationStep == 2 && isOneDayPassed ? 
            <div className="col-md-12 text-center mt-3">
                <h4><strong>Status:</strong> User Maybe Dead</h4>
            </div>:""
            }
          </div>
                  
        </div>
      </div>
    </div>
  );
};

export default UserDetailModal;
