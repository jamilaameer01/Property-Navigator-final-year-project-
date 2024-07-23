import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useSelector } from "react-redux";
import Home from "./pages/Home";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import About from "./pages/About";
import Header from "./components/Header";
import Footer from "./components/Footer";
import PrivateRoute from "./components/PrivateRoute";
import AdminRoute from "./components/AdminRoute";
import AdminDashboard from "./pages/AdminDashboard";
import Favourite from "./pages/Favourite";
import CreateListing from "./pages/CreateListing";
import UpdateListing from "./pages/UpdateListing";
import Listing from "./pages/Listing";
import Search from "./pages/Search";
import DashUsers from "./components/DashUsers";
import TermsAndConditions from "./pages/TermsAndConditions";
import Services from "./pages/Services";

export default function App() {
  const { currentUser } = useSelector((state) => state.user);
  console.log(currentUser?.role);
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        {/* User Routes */}
        <Route
          path="/favourite"
          element={
            <PrivateRoute>
              <Favourite />
            </PrivateRoute>
          }
        ></Route>

        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/" element={<Home />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/about" element={<About />} />
        <Route path="/search" element={<Search />} />
        <Route path="/listing/:listingId" element={<Listing />} />
        <Route path="/termsandconditions" element={<TermsAndConditions />} />
        <Route path="/services" element={<Services />} />

        {/* Admin Routes */}
        <Route
          path="/admin"
          element={
            <AdminRoute>
              <AdminDashboard />
            </AdminRoute>
          }
        />
        <Route
          path="/create-listing"
          element={
            <AdminRoute>
              <CreateListing />
            </AdminRoute>
          }
        />
        <Route
          path="/update-listing/:listingId"
          element={
            <AdminRoute>
              <UpdateListing />
            </AdminRoute>
          }
        />
        <Route
          path="/users"
          element={
            <AdminRoute>
              <DashUsers />
            </AdminRoute>
          }
        />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}
