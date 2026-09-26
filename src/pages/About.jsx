import { FaGithub } from "react-icons/fa6";

import Card from "../components/Card";
import TeamCard from "../components/TeamCard";
import { Button } from "../components/ui/Button";
import { Reveal } from "../components/ui/Reveal";
import { Container, SectionHeading } from "../components/ui/Section";
import { useStore } from "../lib/store";

const VISION_ICON = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth="1.5"
    stroke="currentColor"
    className="h-5 w-5"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z"
    />
    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
  </svg>
);

const MISSION_ICON = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth="1.5"
    stroke="currentColor"
    className="h-5 w-5"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M11.35 3.836c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75 2.25 2.25 0 0 0-.1-.664m-5.8 0A2.251 2.251 0 0 1 13.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m8.9-4.414c.376.023.75.05 1.124.08 1.131.094 1.976 1.057 1.976 2.192V16.5A2.25 2.25 0 0 1 18 18.75h-2.25m-7.5-10.5H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V18.75m-7.5-10.5h6.375c.621 0 1.125.504 1.125 1.125v9.375m-8.25-3 1.5 1.5 3-3.75"
    />
  </svg>
);

const CARDS = [
  {
    id: 1,
    title: "Vision",
    icon: VISION_ICON,
    description:
      "Menjadi partner teknologi yang membantu bisnis dan startup di Indonesia tumbuh lewat produk digital yang rapi, cepat, dan mudah dirawat.",
  },
  {
    id: 2,
    title: "Mission",
    icon: MISSION_ICON,
    description:
      "Membangun aplikasi web dan sistem enterprise yang andal, dengan proses kerja transparan dari desain sampai rilis.",
  },
];

const STATS = [
  { label: "Proyek Selesai", hint: "Telah dipercaya berbagai klien", value: "50+" },
  { label: "Kepuasan Klien", hint: "Layanan & performa terbaik", value: "99%" },
  { label: "Tahun Pengalaman", hint: "Pengalaman industri digital", value: "2+" },
];

function About() {
  const { settings, team } = useStore();

  return (
    <section id="AboutUs" className="border-t border-slate-200 py-20 sm:py-24">
      <Container>
        <SectionHeading
          eyebrow="Profil"
          title="About Us"
          description="Kami adalah tim profesional yang berdedikasi untuk memberikan solusi digital terbaik melalui teknologi modern dan desain yang intuitif."
        />

        <div className="mt-12 grid items-start gap-6 lg:grid-cols-12">
          <div className="grid gap-6 sm:grid-cols-2 lg:col-span-7">
            {CARDS.map((card, index) => (
              <Reveal key={card.id} delay={index * 0.1} className="flex">
                <Card icon={card.icon} title={card.title} description={card.description} />
              </Reveal>
            ))}
          </div>

          <Reveal delay={0.15} className="lg:col-span-5">
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-card">
              <h3 className="font-heading text-lg font-semibold tracking-tight text-slate-900">
                Pencapaian Kami
              </h3>
              <dl className="mt-2 divide-y divide-slate-100">
                {STATS.map((stat) => (
                  <div key={stat.label} className="flex items-center justify-between gap-4 py-4">
                    <div>
                      <dt className="text-sm font-medium text-slate-900">{stat.label}</dt>
                      <dd className="text-xs text-slate-500">{stat.hint}</dd>
                    </div>
                    <p className="font-heading text-2xl font-semibold text-brand-600">
                      {stat.value}
                    </p>
                  </div>
                ))}
              </dl>
              <Button
                href={settings.github}
                target="_blank"
                rel="noopener noreferrer"
                variant="outline"
                className="mt-2 w-full"
              >
                <FaGithub className="h-4 w-4" />
                Lihat GitHub Kami
              </Button>
            </div>
          </Reveal>
        </div>
      </Container>

      {team.length > 0 && (
        <div className="mt-20 border-t border-slate-200 pt-14">
          <Container>
            <SectionHeading
              eyebrow="Tim"
              title="Orang di balik B0MBER"
              description="Tim kecil yang menangani semuanya: riset, desain, pengembangan, sampai rilis."
            />
          </Container>

          <div className="mt-10 overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]">
            <div className="animate-marquee flex w-max">
              {[0, 1].map((copy) => (
                <div
                  key={copy}
                  aria-hidden={copy === 1}
                  className="flex gap-6 pr-6 sm:gap-8 sm:pr-8"
                >
                  {team.map((member) => (
                    <TeamCard
                      key={`${copy}-${member.id}`}
                      name={member.name}
                      role={member.role}
                      image={member.image}
                    />
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

export default About;
