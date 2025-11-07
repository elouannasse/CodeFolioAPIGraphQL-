import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import AdminDashboard from "./pages/AdminDashboard";
import DashboardHome from "./pages/DashboardHome";
import ProfilManagement from "./pages/admin/ProfilManagement";
import ProjetsManagement from "./pages/admin/ProjetsManagement";
import ExperiencesManagement from "./pages/admin/ExperiencesManagement";
import CompetencesManagement from "./pages/admin/CompetencesManagement";
import EducationsManagement from "./pages/admin/EducationsManagement";
import PortfolioView from "./pages/admin/PortfolioView";

function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />

          <Route
            path="/admin"
            element={
              <ProtectedRoute requireAdmin>
                <AdminDashboard />
              </ProtectedRoute>
            }
          >
            <Route path="dashboard" element={<DashboardHome />} />
            <Route path="profil" element={<ProfilManagement />} />
            <Route path="projets" element={<ProjetsManagement />} />
            <Route path="experiences" element={<ExperiencesManagement />} />
            <Route path="competences" element={<CompetencesManagement />} />
            <Route path="educations" element={<EducationsManagement />} />
            <Route path="portfolio" element={<PortfolioView />} />
          </Route>
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;
