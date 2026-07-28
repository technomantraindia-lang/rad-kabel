import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home.jsx";
import AboutUs from "./pages/AboutUs.jsx";
import TechnologyPage from "./pages/TechnologyPage.jsx";
import InfrastructurePage from "./pages/InfrastructurePage.jsx";
import ProductsPage from "./pages/ProductsPage.jsx";
import ProductDetailsPage from "./pages/ProductDetailsPage.jsx";
import ApplicationsPage from "./pages/ApplicationsPage.jsx";
import CertificationsPage from "./pages/CertificationsPage.jsx";
import DealerNetworkPage from "./pages/DealerNetworkPage.jsx";
import ElectricianProgramPage from "./pages/ElectricianProgramPage.jsx";
import ContactUsPage from "./pages/ContactUsPage.jsx";
import Header from "./components/Header.jsx";
import Footer from "./components/Footer.jsx";
import ScrollToTop from "./components/ScrollToTop.jsx";

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <div className="flex min-h-screen flex-col overflow-x-clip bg-black text-white">
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about-us" element={<AboutUs />} />
          <Route path="/technology" element={<TechnologyPage />} />
          <Route path="/infrastructure" element={<InfrastructurePage />} />
          <Route path="/applications" element={<ApplicationsPage />} />
          <Route path="/certifications" element={<CertificationsPage />} />
          <Route path="/dealer-network" element={<DealerNetworkPage />} />
          <Route path="/electrician-program" element={<ElectricianProgramPage />} />
          <Route path="/products" element={<ProductsPage />} />
          <Route path="/products/rad-zero" element={<ProductDetailsPage />} />
          <Route path="/products/rad-power" element={<ProductDetailsPage />} />
          <Route path="/products/rad-flex" element={<ProductDetailsPage />} />
          <Route path="/products/rad-tape-pro" element={<ProductDetailsPage />} />
          <Route path="/contact-us" element={<ContactUsPage />} />
        </Routes>
        <Footer />
      </div>
    </BrowserRouter>
  );
}
