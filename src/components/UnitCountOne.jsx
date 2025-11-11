import React, { useEffect } from 'react'
import { Icon } from '@iconify/react';
import downArrow from "../otherImages/ArrowDown.svg"
import riseArrow from "../otherImages/ArrowRise.svg"
import thirdcard from "../otherImages/vector.svg"
import reverseIcon from "../otherImages/reverseIcon.png"
import { useDispatch, useSelector } from "react-redux";
import { dashboardData,transactionData } from "../Redux/Reducers/dashboardSlice";

const UnitCountOne = () => {
const dispatch = useDispatch();

  const { data,transactionTotalData, isLoading, isError, errorMessage } = useSelector((state) => state.dashboard);
    
    useEffect(() => {
    dispatch(dashboardData());
  }, [dispatch]);

      useEffect(() => {
    dispatch(transactionData());
  }, [dispatch]);

  if (isLoading) return <h6>Loading...</h6>;
  if (isError) return <p>Error: {errorMessage}</p>;

const transactionPayments =
  Array.isArray(transactionTotalData?.transactionTotal)
    ? transactionTotalData.transactionTotal
    : [];

    const totalPayment = transactionPayments[0]?.totalPayment ?? 0;
    const totalApplePayments = transactionPayments[0]?.totalApplePayments ?? 0;
    const totalAndroidPayments = transactionPayments[0]?.totalAndroidPayments ?? 0;
    const totalPaidUsers = transactionPayments[0]?.totalPaidUsers ?? 0;
    const totalFreeUsers = transactionPayments[0]?.totalFreeUsers ?? 0;

    return (
        <>
        <h2 className='fs-2 mb-20   '>Overview</h2>
        <div className="row row-cols-lg-3 row-cols-sm-2 row-cols-1 gy-4">
            <div className="col">
                
                <div className="card shadow-none h-100 card-1">
                    <div className="card-body p-20">
                        <div className="d-flex flex-wrap align-items-center justify-content-between gap-3">
                            <div>
                                <p className="fs-4 fw-bold blackColor mb-1 ">Total Users</p>
                                
                            </div>
                        </div>
                        {data && (
                        <h6 className="mb-0 fs-1 blackColor">{data[0].users}</h6>
                        )}
                        <div className="d-flex gap-0">
                        </div>
                    </div>
                </div>
            </div>
            <div className="col">
                <div className="card shadow-none h-100 card-1">
                    <div className="card-body p-20">
                        <div className="d-flex flex-wrap align-items-center justify-content-between gap-3">
                            <div>
                                <p className="fs-4 fw-bold blackColor mb-1 ">Total Messages</p>
                                
                            </div>
                        </div>
                        {data && (
                        <h6 className="mb-0 fs-1 blackColor">{data[0].messages}</h6>
                        )}
                        <div className="d-flex gap-0">
                        </div>
                    </div>
                </div>
            </div>
            <div className="col">
                <div className="card shadow-none h-100 card-1">
                    <div className="card-body p-20">
                        <div className="d-flex flex-wrap align-items-center justify-content-between gap-3">
                            <div>
                                <p className="fs-4 fw-bold blackColor mb-1 ">Messages Sent</p>
                                
                            </div>
                        </div>
                        {data && (
                        <h6 className="mb-0 fs-1 blackColor">{data[0].messagesSended}</h6>
                        )}
                        <div className="d-flex gap-0">
                        </div>
                    </div>
                </div>
            </div>
            <div className="col">
                <div className="card shadow-none h-100 card-1">
                    <div className="card-body p-20">
                        <div className="d-flex flex-wrap align-items-center justify-content-between gap-3">
                            <div>
                                <p className="fs-4 fw-bold blackColor mb-1 ">Pending Messages</p>
                                
                            </div>
                        </div>
                        {data && (
                        <h6 className="mb-0 fs-1 blackColor">{data[0].messagesPending}</h6>
                        )}
                        <div className="d-flex gap-0">
                        </div>
                    </div>
                </div>
            </div>
            <div className="col">
                <div className="card shadow-none h-100 card-1">
                    <div className="card-body p-20">
                        <div className="d-flex flex-wrap align-items-center justify-content-between gap-3">
                            <div>
                                <p className="fs-4 fw-bold blackColor mb-1 ">Invited Users</p>
                                
                            </div>
                        </div>
                        {data && (
                        <h6 className="mb-0 fs-1 blackColor">{data[0].userInvited}</h6>
                        )}
                        <div className="d-flex gap-0">
                        </div>
                    </div>
                </div>
            </div>
            <div className="col">
                <div className="card shadow-none h-100 card-1">
                    <div className="card-body p-20">
                        <div className="d-flex flex-wrap align-items-center justify-content-between gap-3">
                            <div>
                                <p className="fs-4 fw-bold blackColor mb-1 ">Total Payments</p>
                                
                            </div>
                        </div>
                        
                        <h6 className="mb-0 fs-1 blackColor">{totalPayment}</h6>
                        
                        <div className="d-flex gap-0">
                        </div>
                    </div>
                </div>
            </div>
             <div className="col">
                <div className="card shadow-none h-100 card-1">
                    <div className="card-body p-20">
                        <div className="d-flex flex-wrap align-items-center justify-content-between gap-3">
                            <div>
                                <p className="fs-4 fw-bold blackColor mb-1 ">Total Apple Payments</p>
                                
                            </div>
                        </div>
                        
                        <h6 className="mb-0 fs-1 blackColor">{totalApplePayments}</h6>
                        
                        <div className="d-flex gap-0">
                        </div>
                    </div>
                </div>
            </div>
             <div className="col">
                <div className="card shadow-none h-100 card-1">
                    <div className="card-body p-20">
                        <div className="d-flex flex-wrap align-items-center justify-content-between gap-3">
                            <div>
                                <p className="fs-4 fw-bold blackColor mb-1 ">Total Android Payments</p>
                                
                            </div>
                        </div>
                        
                        <h6 className="mb-0 fs-1 blackColor">{totalAndroidPayments}</h6>
                        
                        <div className="d-flex gap-0">
                        </div>
                    </div>
                </div>
            </div>
             <div className="col">
                <div className="card shadow-none h-100 card-1">
                    <div className="card-body p-20">
                        <div className="d-flex flex-wrap align-items-center justify-content-between gap-3">
                            <div>
                                <p className="fs-4 fw-bold blackColor mb-1 ">Total Paid Users</p>
                                
                            </div>
                        </div>
                        <h6 className="mb-0 fs-1 blackColor">{totalPaidUsers}</h6>
                        <div className="d-flex gap-0">
                        </div>
                    </div>
                </div>
            </div>
             <div className="col">
                <div className="card shadow-none h-100 card-1">
                    <div className="card-body p-20">
                        <div className="d-flex flex-wrap align-items-center justify-content-between gap-3">
                            <div>
                                <p className="fs-4 fw-bold blackColor mb-1 ">Total Free Users</p>
                                
                            </div>
                        </div>
                        <h6 className="mb-0 fs-1 blackColor">{totalFreeUsers}</h6>
                        <div className="d-flex gap-0">
                        </div>
                    </div>
                </div>
            </div>

           
        </div>
        </>
    )
}

export default UnitCountOne