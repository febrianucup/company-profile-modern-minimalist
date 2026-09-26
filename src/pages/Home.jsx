import peoplePict from "../assets/peoplePict.png";
import { Button } from "../components/ui/Button";
import { Eyebrow, Reveal } from "../components/ui/Reveal";
import { Container } from "../components/ui/Section";
import { useStore } from "../lib/store";

function Home() {
  const { settings } = useStore();

  return (
    <section id="Home" className="pt-28 pb-20 sm:pt-32 sm:pb-24">
      <Container>
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <Reveal>
            <Eyebrow>{settings.tagline}</Eyebrow>
            <h1 className="mt-4 font-heading text-4xl font-semibold leading-[1.08] tracking-tight text-slate-900 sm:text-5xl lg:text-6xl">
              {settings.headline}{" "}
              <span className="text-brand-600">{settings.companyName}</span>
            </h1>
            <p className="mt-6 max-w-xl text-base leading-relaxed text-slate-600">
              {settings.intro}
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button href="#AboutUs" size="lg">
                Kenali Kami
              </Button>
              <Button href="#Service" size="lg" variant="outline">
                Lihat Layanan
              </Button>
            </div>
          </Reveal>

          <Reveal delay={0.15}>
            <div className="rounded-3xl border border-brand-100 bg-brand-50 p-6 sm:p-10">
              <img
                src={peoplePict}
                alt={`Ilustrasi ${settings.companyName}`}
                className="mx-auto w-full max-w-sm object-contain"
              />
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}

export default Home;
