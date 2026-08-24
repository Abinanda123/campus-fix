import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "@/components/Navbar";
import FeedPage from "@/pages/FeedPage";
import ReportPage from "@/pages/ReportPage";
import AdminLoginPage from "@/pages/AdminLoginPage";
import AdminDashboardPage from "@/pages/AdminDashboardPage";

export default function App() {
  return (
    <BrowserRouter>
      <div className="bg-background text-foreground min-h-screen">
        <Navbar />
        <main>
          <Routes>
            <Route path="/" element={<FeedPage />} />
            <Route path="/report" element={<ReportPage />} />
            <Route path="/admin/login" element={<AdminLoginPage />} />
            <Route path="/admin" element={<AdminDashboardPage />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}
