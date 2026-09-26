import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";

import Logo from "../assets/logo.png";
import { useStore } from "../lib/store";
import { AuthButton } from "./AuthButton";
import { cn } from "../lib/utils";

const NAV_ITEMS = [
  { id: "Home", label: "Home" },
  { id: "AboutUs", label: "About Us" },
  { id: "Service", label: "Services" },
  { id: "Contact", label: "Contact" },
];

export function Navbar() {
  const { settings } = useStore();
  const { pathname } = useLocation();
  const [activeSection, setActiveSection] = useState("Home");
  const [menuOpen, setMenuOpen] = useState(false);

  const onHomePage = pathname === "/";
  const linkFor = (id) => (onHomePage ? `#${id}` : `/#${id}`);

  // Scroll spy: highlight the section currently under the navbar.
  useEffect(() => {
    if (!onHomePage) return undefined;

    const handleScroll = () => {
      const probe = window.scrollY + 160;
      let current = NAV_ITEMS[0].id;
      for (const item of NAV_ITEMS) {
        const element = document.getElementById(item.id);
        if (element && probe >= element.offsetTop) current = item.id;
      }
      setActiveSection(current);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [onHomePage]);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-slate-200/80 bg-white/85 backdrop-blur">
      <div className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between gap-6 px-5 sm:px-8">
        <Link
          to="/"
          onClick={() => setMenuOpen(false)}
          className="flex items-center gap-2.5"
        >
          <img src={Logo} alt={`Logo ${settings.companyName}`} className="h-10 w-auto object-contain" />
          <span className="hidden font-heading text-base font-semibold tracking-tight text-slate-900 sm:block">
            {settings.companyName}
          </span>
        </Link>

        <nav className="hidden items-center gap-7 lg:flex">
          {NAV_ITEMS.map((item) => {
            const isActive = onHomePage && activeSection === item.id;
            return (
              <Link
                key={item.id}
                to={linkFor(item.id)}
                className={cn(
                  "relative py-1.5 text-sm font-medium transition-colors",
                  isActive ? "text-brand-700" : "text-slate-600 hover:text-slate-900",
                )}
              >
                {item.label}
                <span
                  className={cn(
                    "absolute inset-x-0 -bottom-0.5 h-0.5 rounded-full bg-brand-500 transition-transform duration-300",
                    isActive ? "scale-x-100" : "scale-x-0",
                  )}
                />
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-2">
          <div className="hidden lg:block">
            <AuthButton />
          </div>
          <button
            type="button"
            onClick={() => setMenuOpen((open) => !open)}
            aria-label={menuOpen ? "Tutup menu" : "Buka menu"}
            aria-expanded={menuOpen}
            className="rounded-lg p-2 text-slate-600 transition-colors hover:bg-slate-100 hover:text-slate-900 lg:hidden"
          >
            {menuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden border-b border-slate-200 bg-white lg:hidden"
          >
            <nav className="mx-auto flex w-full max-w-7xl flex-col gap-1 px-5 py-5 sm:px-8">
              {NAV_ITEMS.map((item) => (
                <Link
                  key={item.id}
                  to={linkFor(item.id)}
                  onClick={() => setMenuOpen(false)}
                  className={cn(
                    "rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                    onHomePage && activeSection === item.id
                      ? "bg-brand-50 text-brand-700"
                      : "text-slate-700 hover:bg-slate-100",
                  )}
                >
                  {item.label}
                </Link>
              ))}
              <div className="mt-3 border-t border-slate-200 pt-4">
                <AuthButton className="w-full" size="md" onNavigate={() => setMenuOpen(false)} />
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

export default Navbar;
