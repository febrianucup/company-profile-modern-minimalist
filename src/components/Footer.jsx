import { FaFacebook, FaInstagram, FaLinkedin, FaTwitter } from "react-icons/fa";
import Logo from "../assets/logo.png"

const defaultSections = [
  {
    title: "Product",
    links: [
      { name: "Overview", href: "#Service" },
      { name: "Pricing", href: "#Contact" },
      { name: "Portfolio", href: "#Service" },
      { name: "Features", href: "#Service" },
    ],
  },
  {
    title: "Company",
    links: [
      { name: "About", href: "#AboutUs" },
      { name: "Team", href: "#AboutUs" },
      { name: "Blog", href: "#" },
      { name: "Careers", href: "#Contact" },
    ],
  },
  {
    title: "Resources",
    links: [
      { name: "Support", href: "#Contact" },
      { name: "FAQs", href: "#Contact" },
      { name: "Contact", href: "#Contact" },
      { name: "Privacy", href: "#" },
    ],
  },
];

const defaultSocialLinks = [
  { icon: <FaInstagram className="h-5 w-5" />, href: "#", label: "Instagram" },
  { icon: <FaFacebook className="h-5 w-5" />, href: "#", label: "Facebook" },
  { icon: <FaTwitter className="h-5 w-5" />, href: "#", label: "Twitter" },
  { icon: <FaLinkedin className="h-5 w-5" />, href: "#", label: "LinkedIn" },
];

const defaultLegalLinks = [
  { name: "Terms and Conditions", href: "#" },
  { name: "Privacy Policy", href: "#" },
];

export const Footer = ({
  logo = {
    url: "https://www.B0mberSoftgen.com",
    src: Logo,
    alt: "logo",
    title: "B0MBER Softgen",
  },
  sections = defaultSections,
  description = "Solusi pengembangan perangkat lunak untuk bisnis digital dan tim modern.",
  socialLinks = defaultSocialLinks,
  copyright = "© 2026 B0MBER Softgen. All rights reserved.",
  legalLinks = defaultLegalLinks,
}) => {
  return (
    <footer className="py-16 md:py-24 bg-[#259141] text-white">
      <div className="container mx-auto px-4">
        <div className="flex w-full flex-col justify-between gap-10 lg:flex-row lg:items-start lg:text-left">
          <div className="flex w-full flex-col justify-between gap-6 lg:items-start">
            <div className="flex items-center gap-2 lg:justify-start">
              <a href={logo.url}>
                <img
                  src={logo.src}
                  alt={logo.alt}
                  title={logo.title}
                  className="h-8"
                />
              </a>
              <h2 className="text-xl font-semibold">{logo.title}</h2>
            </div>
            <p className="max-w-[70%] text-sm text-slate-200">
              {description}
            </p>
            <ul className="flex items-center space-x-6 text-slate-200">
              {socialLinks.map((social, idx) => (
                <li key={idx} className="font-medium hover:text-white transition-colors">
                  <a href={social.href} aria-label={social.label}>
                    {social.icon}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="grid w-full gap-6 md:grid-cols-3 lg:gap-20">
            {sections.map((section, sectionIdx) => (
              <div key={sectionIdx}>
                <h3 className="mb-4 font-bold">{section.title}</h3>
                <ul className="space-y-3 text-sm text-slate-200">
                  {section.links.map((link, linkIdx) => (
                    <li
                      key={linkIdx}
                      className="font-medium hover:text-white transition-colors"
                    >
                      <a href={link.href}>{link.name}</a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-8 flex flex-col justify-between gap-4 border-t border-white/20 pt-8 text-xs font-medium text-slate-200 md:flex-row md:items-center md:text-left">
          <p className="order-2 lg:order-1">{copyright}</p>
          <ul className="order-1 flex flex-col gap-2 md:order-2 md:flex-row md:gap-6">
            {legalLinks.map((link, idx) => (
              <li key={idx} className="hover:text-white transition-colors">
                <a href={link.href}>{link.name}</a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
};
