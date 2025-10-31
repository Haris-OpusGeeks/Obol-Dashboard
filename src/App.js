import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePageOne from "./adminPages/HomePageOne";
import ErrorPage from "./adminPages/ErrorPage";
import SignInPage from "./adminPages/SignInPage";
import SignUpPage from "./adminPages/SignUpPage";
import AccessDeniedPage from "./adminPages/AccessDeniedPage";
import RouteScrollToTop from "./helper/RouteScrollToTop";
import ManagePackages from "./adminPages/ManagePackages";
import ManageClients from "./adminPages/ManageClients";
import AddClientPage from "./adminPages/AddClientPage";
import AddPackagePage from "./adminPages/AddPackagePage";
import EditPackagePage from "./adminPages/EditPackagePage";
import EditClientPage from "./adminPages/EditClientPage";
import ManageInvoices from "./adminPages/ManageInvoices";
import CreateInvoicePage from "./adminPages/CreateInvoicePage";
import LoginHistoryPage from "./adminPages/LoginHistoryPage";
import ProtectedRoute from "./components/ProtectedRoute";

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
        <Route path="/manage-clients" element={<ProtectedRoute element={<ManageClients />} />} />
        <Route path="/manage-packages" element={<ProtectedRoute element={<ManagePackages />} />} />
        <Route path="/add-client" element={<ProtectedRoute element={<AddClientPage />} />} />
        <Route path="/add-package" element={<ProtectedRoute element={<AddPackagePage />} />} />
        <Route path="/edit-package" element={<ProtectedRoute element={<EditPackagePage />} />} />
        <Route path="/edit-client" element={<ProtectedRoute element={<EditClientPage />} />} />
        <Route path="/manage-invoice" element={<ProtectedRoute element={<ManageInvoices />} />} />
        <Route path="/create-invoice" element={<ProtectedRoute element={<CreateInvoicePage />} />} />
        <Route path="/login-history" element={<ProtectedRoute element={<LoginHistoryPage />} />} />

        {/* Fallback */}
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
