import { ArrowRight, FolderOpen } from "lucide-react";

import ProjectCard from "../components/ProjectCard";
import Timeline from "../components/Timeline";
import { Button } from "../components/ui/Button";
import { Reveal } from "../components/ui/Reveal";
import { Container, EmptyState, SectionHeading } from "../components/ui/Section";
import { useStore } from "../lib/store";

const Services = () => {
  const { projects, services } = useStore();

  return (
    <section id="Service" className="border-t border-slate-200 py-20 sm:py-24">
      <Container>
        <SectionHeading
          eyebrow="Layanan"
          title="Services"
          description="Dari konsultasi awal sampai produk jadi, berikut cara kami membantu bisnis Anda tumbuh secara digital."
        />

        <div className="mt-12 grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-4">
            <div className="space-y-8 lg:sticky lg:top-24">
              <Timeline items={services} />
              <Button href="#Contact" variant="outline" className="w-full sm:w-auto">
                Diskusikan proyek Anda
                <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <div className="lg:col-span-8">
            {projects.length > 0 ? (
              <div className="grid gap-6 sm:grid-cols-2">
                {projects.map((project, index) => (
                  <Reveal key={project.id} delay={(index % 2) * 0.1}>
                    <ProjectCard
                      title={project.title}
                      description={project.description}
                      image={project.image}
                      link={project.link}
                    />
                  </Reveal>
                ))}
              </div>
            ) : (
              <EmptyState
                icon={FolderOpen}
                title="Belum ada proyek"
                description="Tambahkan proyek dari dashboard admin untuk menampilkannya di sini."
              />
            )}
          </div>
        </div>
      </Container>
    </section>
  );
};

export default Services;
