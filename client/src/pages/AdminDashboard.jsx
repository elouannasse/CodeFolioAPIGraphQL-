import { useState } from "react";
import { Link, Outlet, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function AdminDashboard() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const handleLogout = async () => {
    await logout();
    navigate("/");
  };

  const isActive = (path) => {
    return (
      location.pathname === path || location.pathname.startsWith(path + "/")
    );
  };

  const menuItems = [
    { path: "/admin/dashboard", icon: "📊", label: "Tableau de bord" },
    { path: "/admin/profil", icon: "👤", label: "Mon Profil" },
    { path: "/admin/projets", icon: "💼", label: "Projets" },
    { path: "/admin/experiences", icon: "🏢", label: "Expériences" },
    { path: "/admin/competences", icon: "⚡", label: "Compétences" },
    { path: "/admin/educations", icon: "🎓", label: "Éducations" },
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar Bleue Admin */}
      <aside
        className={`${
          sidebarOpen ? "w-64" : "w-20"
        } bg-gradient-to-b from-blue-900 via-blue-800 to-blue-900 text-white transition-all duration-300 fixed h-full shadow-2xl z-10`}
      >
        {/* Header Sidebar */}
        <div className="p-6 border-b border-blue-700">
          <div className="flex items-center justify-between">
            {sidebarOpen && (
              <div>
                <h2 className="text-xl font-bold">🔷 Admin Panel</h2>
                <p className="text-blue-300 text-sm mt-1">{user?.email}</p>
              </div>
            )}
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="p-2 hover:bg-blue-700 rounded-lg transition-colors"
              title={sidebarOpen ? "Réduire" : "Agrandir"}
            >
              {sidebarOpen ? "◀" : "▶"}
            </button>
          </div>
        </div>

        {/* Menu Items */}
        <nav className="mt-6 px-3 space-y-1">
          {menuItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                isActive(item.path)
                  ? "bg-blue-600 shadow-lg scale-105"
                  : "hover:bg-blue-700 hover:scale-102"
              }`}
              title={item.label}
            >
              <span className="text-2xl">{item.icon}</span>
              {sidebarOpen && <span className="font-medium">{item.label}</span>}
            </Link>
          ))}
        </nav>

        {/* Bouton Portfolio - Couleur Marron */}
        <div className="absolute bottom-20 w-full px-3">
          <Link
            to="/admin/portfolio"
            className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200 ${
              isActive("/admin/portfolio")
                ? "bg-amber-700 shadow-lg scale-105"
                : "bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700"
            }`}
            title="Voir le portfolio visiteur"
          >
            <span className="text-2xl">👁️</span>
            {sidebarOpen && <span className="font-medium">Voir Portfolio</span>}
          </Link>
        </div>

        {/* Bouton Déconnexion */}
        <div className="absolute bottom-0 w-full p-3 border-t border-blue-700">
          <button
            onClick={handleLogout}
            className="w-full flex items-center space-x-3 px-4 py-3 rounded-lg bg-red-600 hover:bg-red-700 transition-colors"
            title="Déconnexion"
          >
            <span className="text-2xl">🚪</span>
            {sidebarOpen && <span className="font-medium">Déconnexion</span>}
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div
        className={`flex-1 ${
          sidebarOpen ? "ml-64" : "ml-20"
        } transition-all duration-300`}
      >
        {/* Top Bar */}
        <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-5">
          <div className="px-8 py-4">
            <div className="flex justify-between items-center">
              <div>
                <h1 className="text-2xl font-bold text-gray-800">
                  {menuItems.find((item) => isActive(item.path))?.label ||
                    "Dashboard"}
                </h1>
                <p className="text-gray-600 text-sm mt-1">
                  Bienvenue, {user?.email}
                </p>
              </div>
              <div className="flex items-center space-x-4">
                <div className="text-right">
                  <p className="text-sm font-semibold text-gray-700">Admin</p>
                  <p className="text-xs text-gray-500">
                    {new Date().toLocaleDateString("fr-FR")}
                  </p>
                </div>
                <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold">
                  {user?.email?.charAt(0).toUpperCase()}
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
