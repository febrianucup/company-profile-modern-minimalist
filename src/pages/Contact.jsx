import { ContactCard } from "../components/ContactCard"

function Contact() {
  return (
    <section className="container mx-auto px-4 lg:px-12 relative w-full border-t border-gray-200/80 py-20 bg-white">
      <div className="text-center" data-aos="fade-out">
        <h1 className="font-mono text-[40px] font-semibold">Contact Us</h1>
      </div>
      <ContactCard/>
    </section>
  )
}

export default Contact