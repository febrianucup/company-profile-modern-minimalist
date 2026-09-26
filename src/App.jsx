import { useEffect } from "react";
import { BrowserRouter, Navigate, Route, Routes, useLocation } from "react-router-dom";

import MainLayout from "./Layouts/MainLayout";
import RequireAuth from "./components/RequireAuth";
import { StorageErrorReporter } from "./components/StorageErrorReporter";
import { ToastProvider } from "./components/ui/Toast";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";
import AdminLayout from "./pages/admin/AdminLayout";
import Overview from "./pages/admin/Overview";
import ProjectsAdmin from "./pages/admin/ProjectsAdmin";
import ServicesAdmin from "./pages/admin/ServicesAdmin";
import TeamAdmin from "./pages/admin/TeamAdmin";
import MessagesAdmin from "./pages/admin/MessagesAdmin";
import SettingsAdmin from "./pages/admin/SettingsAdmin";

/** Resets scroll on route change and handles "/#section" links. */
function ScrollManager() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) {
      const id = hash.slice(1);
      const scrollToSection = () => document.getElementById(id)?.scrollIntoView({ block: "start" });
      requestAnimationFrame(scrollToSection);
      const timer = setTimeout(scrollToSection, 150);
      return () => clearTimeout(timer);
    }
    window.scrollTo({ top: 0, behavior: "instant" });
    return undefined;
  }, [pathname, hash]);

  return null;
}

function App() {
  return (
    <ToastProvider>
      <StorageErrorReporter />
      <BrowserRouter>
        <ScrollManager />
        <Routes>
          <Route path="/" element={<MainLayout />} />
          <Route path="/login" element={<Login />} />

          <Route element={<RequireAuth />}>
            <Route path="/admin" element={<AdminLayout />}>
              <Route index element={<Overview />} />
              <Route path="projects" element={<ProjectsAdmin />} />
              <Route path="services" element={<ServicesAdmin />} />
              <Route path="team" element={<TeamAdmin />} />
              <Route path="messages" element={<MessagesAdmin />} />
              <Route path="settings" element={<SettingsAdmin />} />
            </Route>
          </Route>

          <Route path="/404" element={<NotFound />} />
          <Route path="*" element={<Navigate to="/404" replace />} />
        </Routes>
      </BrowserRouter>
    </ToastProvider>
  );
}

export default App;
