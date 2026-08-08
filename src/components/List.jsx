"use client";

import { motion } from "framer-motion";

const timelineData = [
  {
    title: "Konsultasi Pengembangan Web",
    content:
      "Merancang arsitektur dan roadmap teknis yang sesuai kebutuhan bisnis Anda",
  },
  {
    title: "Desain UI/UX",
    content:
      "Antarmuka yang enak dipakai, dibangun dari riset pengguna nyata",
  },
];

export default function List() {
  return (
    <section className="bg-slate-50">
      <div className="container mx-auto px-4">

        <div className="relative mx-auto max-w-3xl">
          {/* Subtle vertical line */}
          <div className="absolute left-3.5 top-3 h-[calc(100%-2rem)] w-0.5 bg-slate-300" />

          {timelineData.map((entry, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false }}
              transition={{ duration: 0.5, delay: index * 0.15 }}
              className="relative mb-12 pl-12"
            >
              {/* Timeline dot */}
              <div className="absolute left-2 top-5 h-3 w-3 rounded-full bg-[#259141] ring-2" />

              {/* Content */}
              <h4 className="text-lg font-normal text-slate-900">
                {entry.title}
              </h4>
              <div className="rounded-xl border bg-white text-slate-700 shadow-sm hover:shadow-md transition">
                <div className="px-5 py-4">
                    <p className="leading-relaxed text-slate-600">
                    {entry.content}
                    </p>
                </div>
                </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}