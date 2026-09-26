import { useState } from "react";
import { Link, NavLink, Outlet, useNavigate } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import {
  ExternalLink,
  FolderKanban,
  Gauge,
  Inbox,
  ListChecks,
  LogOut,
  Menu,
  Settings,
  Users,
  X,
} from "lucide-react";

import Logo from "../../assets/logo.png";
import { Button } from "../../components/ui/Button";
import { useToast } from "../../components/ui/toastContext";
import { logout, useAuth } from "../../lib/auth";
import { useStore } from "../../lib/store";
import { cn } from "../../lib/utils";

function navItems(unreadCount) {
  return [
    { to: "/admin", label: "Ringkasan", icon: Gauge, end: true },
    { to: "/admin/projects", label: "Proyek", icon: FolderKanban },
    { to: "/admin/services", label: "Layanan", icon: ListChecks },
    { to: "/admin/team", label: "Tim", icon: Users },
    { to: "/admin/messages", label: "Pesan", icon: Inbox, badge: unreadCount },
    { to: "/admin/settings", label: "Pengaturan", icon: Settings },
  ];
}

function SidebarContent({ items, onNavigate }) {
  return (
    <nav className="flex flex-1 flex-col gap-1">
      {items.map((item) => (
        <NavLink
          key={item.to}
          to={item.to}
          end={item.end}
          onClick={onNavigate}
          className={({ isActive }) =>
            cn(
              "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
              isActive
                ? "bg-brand-50 text-brand-700"
                : "text-slate-600 hover:bg-slate-100 hover:text-slate-900",
            )
          }
        >
          <item.icon className="h-4 w-4 shrink-0" />
          <span className="flex-1">{item.label}</span>
          {item.badge > 0 && (
            <span className="rounded-full bg-brand-600 px-2 py-0.5 font-mono text-[10px] font-medium text-white">
              {item.badge}
            </span>
          )}
        </NavLink>
      ))}
    </nav>
  );
}

export function AdminLayout() {
  const { messages } = useStore();
  const session = useAuth();
  const toast = useToast();
  const navigate = useNavigate();
  const [drawerOpen, setDrawerOpen] = useState(false);

  const unreadCount = messages.filter((message) => !message.read).length;
  const items = navItems(unreadCount);

  const handleLogout = () => {
    logout();
    toast("Kamu sudah keluar dari dashboard.", "info");
    navigate("/", { replace: true });
  };

  const brand = (
    <Link to="/admin" className="flex items-center gap-2.5 px-1">
      <img src={Logo} alt="Logo B0MBER Softgen" className="h-9 w-auto object-contain" />
      <span className="font-heading text-base font-semibold tracking-tight text-slate-900">
        B0MBER Admin
      </span>
    </Link>
  );

  const account = (
    <div className="border-t border-slate-200 pt-4">
      <p className="px-1 text-sm font-semibold text-slate-900">{session?.name}</p>
      <p className="truncate px-1 text-xs text-slate-500">{session?.email}</p>
      <div className="mt-3 flex flex-col gap-2">
        <Button as={Link} to="/" variant="outline" size="sm">
          <ExternalLink className="h-4 w-4" />
          Lihat situs
        </Button>
        <Button variant="ghost" size="sm" onClick={handleLogout}>
          <LogOut className="h-4 w-4" />
          Keluar
        </Button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Desktop sidebar */}
      <aside className="fixed inset-y-0 left-0 z-40 hidden w-64 flex-col gap-6 border-r border-slate-200 bg-white p-5 lg:flex">
        {brand}
        <SidebarContent items={items} />
        {account}
      </aside>

      <div className="lg:pl-64">
        {/* Mobile topbar */}
        <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-slate-200 bg-white/90 px-4 backdrop-blur lg:hidden">
          {brand}
          <button
            type="button"
            onClick={() => setDrawerOpen((open) => !open)}
            aria-label={drawerOpen ? "Tutup menu" : "Buka menu"}
            className="rounded-lg p-2 text-slate-600 transition-colors hover:bg-slate-100"
          >
            {drawerOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </header>

        <AnimatePresence>
          {drawerOpen && (
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.18 }}
              className="sticky top-16 z-20 border-b border-slate-200 bg-white p-4 lg:hidden"
            >
              <SidebarContent items={items} onNavigate={() => setDrawerOpen(false)} />
              <div className="mt-4">{account}</div>
            </motion.div>
          )}
        </AnimatePresence>

        <main className="mx-auto w-full max-w-5xl px-5 py-8 sm:px-8 sm:py-10">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default AdminLayout;
