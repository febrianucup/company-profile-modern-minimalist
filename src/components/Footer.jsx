import { FaFacebook, FaInstagram, FaLinkedin, FaTwitter } from "react-icons/fa";

import Logo from "../assets/logo.png";
import { useStore } from "../lib/store";

const LINK_GROUPS = [
  {
    title: "Produk",
    links: [
      { name: "Layanan", href: "#Service" },
      { name: "Portofolio", href: "#Service" },
      { name: "Konsultasi", href: "#Contact" },
    ],
  },
  {
    title: "Perusahaan",
    links: [
      { name: "Tentang kami", href: "#AboutUs" },
      { name: "Tim", href: "#AboutUs" },
      { name: "Karier", href: "#Contact" },
    ],
  },
  {
    title: "Bantuan",
    links: [
      { name: "Kontak", href: "#Contact" },
      { name: "Dukungan", href: "#Contact" },
      { name: "FAQ", href: "#Contact" },
    ],
  },
];

const SOCIAL_ICONS = {
  Instagram: FaInstagram,
  Facebook: FaFacebook,
  Twitter: FaTwitter,
  LinkedIn: FaLinkedin,
};

export function Footer() {
  const { settings } = useStore();
  const year = new Date().getFullYear();

  return (
    <footer className="bg-brand-700 text-white">
      <div className="mx-auto w-full max-w-7xl px-5 py-14 sm:px-8">
        <div className="grid gap-10 lg:grid-cols-[1.4fr_1fr_1fr_1fr] lg:gap-14">
          <div>
            <a href="/" className="flex items-center gap-2.5">
              <img src={Logo} alt={`Logo ${settings.companyName}`} className="h-9 w-auto object-contain" />
              <span className="font-heading text-base font-semibold tracking-tight">
                {settings.companyName}
              </span>
            </a>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-white/80">
              {settings.description}
            </p>
            <ul className="mt-6 flex items-center gap-3">
              {settings.socials.map((social) => {
                const Icon = SOCIAL_ICONS[social.label];
                return (
                  <li key={social.label}>
                    <a
                      href={social.href}
                      aria-label={social.label}
                      className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/10 text-white/90 transition-colors hover:bg-white/20 hover:text-white"
                    >
                      {Icon ? <Icon className="h-4 w-4" /> : social.label}
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>

          {LINK_GROUPS.map((group) => (
            <div key={group.title}>
              <h3 className="font-mono text-xs font-medium uppercase tracking-[0.2em] text-white/60">
                {group.title}
              </h3>
              <ul className="mt-4 space-y-2.5">
                {group.links.map((link) => (
                  <li key={link.name}>
                    <a
                      href={link.href}
                      className="text-sm text-white/85 transition-colors hover:text-white"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 flex flex-col gap-3 border-t border-white/15 pt-6 text-xs text-white/70 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {settings.companyName}. All rights reserved.
          </p>
          <p>
            Dibuat dengan React + Vite · {settings.address}
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
