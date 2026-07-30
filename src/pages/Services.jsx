import * as React from "react"
import { ProjectCard } from "../components/ProjectCard"
import List from "../components/List"

const projects = [
  {
    title: "E-Commerce Dashboard",
    description:
      "Platform analitik penjualan modern dengan fitur real-time tracking dan manajemen stok otomatis.",
    imgSrc: "/images/projects/ecommerce-dashboard.png",
    link: "#"
  },
  {
    title: "Aplikasi Mobile",
    description:
      "Aplikasi Kesehatan Mental: platform interaktif untuk melacak suasana hati.",
    imgSrc: "/images/projects/mental-health-app.png",
    link: "#"
  },
  {
    title: "Website Perusahaan",
    description:
      "Website Arsitektur Modern: portofolio online untuk biro arsitek.",
    imgSrc: "/images/projects/architecture-website.png",
    link: "#"
  },
  {
    title: "Aplikasi Web",
    description:
      "Manajer Keuangan Pribadi: alat web untuk mencatat pengeluaran.",
    imgSrc: "/images/projects/finance-app.png",
    link: "#"
  }
]

const Services = () => {
  return (
    <section id="Service" className="relative w-full overflow-hidden bg-slate-50/50 py-20 sm:py-28">
      <div 
        className="pointer-events-none absolute inset-0 opacity-[0.03] [mask-image:radial-gradient(ellipse_at_center,white_20%,transparent_75%)]"
        style={{
          backgroundImage: `radial-gradient(#000 1px, transparent 1px)`,
          backgroundSize: `24px 24px`
        }}
      />
      <div className="pointer-events-none absolute -top-20 left-1/4 h-96 w-96 rounded-full bg-[#259141]/10 blur-[120px]" />
      <div className="pointer-events-none absolute bottom-10 -right-20 h-96 w-96 rounded-full bg-emerald-300/20 blur-[140px]" />
      <div className="pointer-events-none absolute top-1/2 left-0 -translate-y-1/2 h-72 w-72 rounded-full bg-green-200/20 blur-[100px]" />

      <svg
        className="pointer-events-none absolute right-10 top-12 h-64 w-64 text-gray-200/50"
        fill="none"
        viewBox="0 0 200 200"
      >
        <circle cx="100" cy="100" r="80" stroke="currentColor" strokeWidth="1" strokeDasharray="4 4" />
        <circle cx="100" cy="100" r="50" stroke="currentColor" strokeWidth="1" />
      </svg>

      <div className="relative mx-auto max-w-7xl px-6 sm:px-8">
        <div className="mb-16 max-w-2xl sm:mb-20" data-aos="fade-out">
          <h2 className="font-serif text-4xl font-bold leading-tight text-gray-900 sm:text-5xl">
            Services
          </h2>
          <p className="mt-4 text-lg text-gray-600">
            Dari konsultasi awal sampai produk jadi, berikut cara kami membantu bisnis Anda tumbuh secara digital.
          </p>
        </div>
        <div className="flex flex-col gap-12 lg:flex-row lg:items-start lg:gap-16">
          <div className="lg:w-1/3">
            <div className="space-y-6 lg:sticky lg:top-28">
              <div className="space-y-4">
                <List/>
              </div>

              <div className="pl-6 pt-2" data-aos="fade-out">
                <a
                  href="#Contact"
                  className="inline-flex items-center gap-2 text-sm font-semibold text-[#259141] transition-all duration-300 hover:translate-x-1 hover:text-[#1e7534]"
                >
                  Diskusikan proyek Anda
                  <svg
                    className="h-4 w-4"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </a>
              </div>
            </div>
          </div>

          {/* Right Column: Project Cards Grid */}
          <div className="grid flex-1 grid-cols-1 gap-6 sm:grid-cols-2 lg:gap-8">
            {projects.map((project, index) => (
              <ProjectCard key={project.title} {...project} data-aos="fade-left" data-aos-delay={index * 300}/>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
};

export default Services;