import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePageOne from "./adminPages/HomePageOne";
import ErrorPage from "./adminPages/ErrorPage";
import SignInPage from "./adminPages/SignInPage";
import SignUpPage from "./adminPages/SignUpPage";
import AccessDeniedPage from "./adminPages/AccessDeniedPage";
import RouteScrollToTop from "./helper/RouteScrollToTop";
import ManageStatistics from "./adminPages/ManageStatistics";
import ManageClients from "./adminPages/Users";
import AddUserPage from "./adminPages/AddUserPage";
import AddPackagePage from "./adminPages/AddPackagePage";
import EditPackagePage from "./adminPages/EditPackagePage";
import EditUserPage from "./adminPages/EditUserPage";
import InactiveUsers from "./adminPages/InactiveUsers";
import CreateInvoicePage from "./adminPages/CreateInvoicePage";
import Transactions from "./adminPages/Transactions";
import ProtectedRoute from "./components/ProtectedRoute";
import Coupons from "./adminPages/Coupons";
import AddCouponPage from "./adminPages/AddCouponPage";
import EditCouponPage from "./adminPages/EditCouponPage";

function App() {
  return (
    <BrowserRouter>
      <RouteScrollToTop />
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<SignInPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/access-denied" element={<AccessDeniedPage />} />

        {/* Protected Routes */}
        <Route path="/dashboard" element={<ProtectedRoute element={<HomePageOne />} />} />
        <Route path="/users" element={<ProtectedRoute element={<ManageClients />} />} />
        <Route path="/statistics" element={<ProtectedRoute element={<ManageStatistics />} />} />
        <Route path="/add-user" element={<ProtectedRoute element={<AddUserPage />} />} />
        <Route path="/add-package" element={<ProtectedRoute element={<AddPackagePage />} />} />
        <Route path="/edit-package" element={<ProtectedRoute element={<EditPackagePage />} />} />
        <Route path="/edit-user" element={<ProtectedRoute element={<EditUserPage />} />} />
        <Route path="/inactive-users" element={<ProtectedRoute element={<InactiveUsers />} />} />
        <Route path="/create-invoice" element={<ProtectedRoute element={<CreateInvoicePage />} />} />
        <Route path="/transactions" element={<ProtectedRoute element={<Transactions />} />} />
        <Route path="/coupons" element={<ProtectedRoute element={<Coupons />} />} />
        <Route path="/add-coupon" element={<ProtectedRoute element={<AddCouponPage />} />} />
        <Route path="/edit-coupon" element={<ProtectedRoute element={<EditCouponPage />} />} />

        {/* Fallback */}
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
