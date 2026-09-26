import { ContactCard } from "../components/ContactCard";
import { Container, SectionHeading } from "../components/ui/Section";

function Contact() {
  return (
    <section id="Contact" className="border-t border-slate-200 py-20 sm:py-24">
      <Container>
        <SectionHeading
          eyebrow="Kontak"
          title="Contact Us"
          description="Punya project atau pertanyaan? Kirim pesan lewat form, atau hubungi kami lewat kanal di samping."
        />
        <div className="mt-12">
          <ContactCard />
        </div>
      </Container>
    </section>
  );
}

export default Contact;
