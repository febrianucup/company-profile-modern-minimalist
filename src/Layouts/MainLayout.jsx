import Navbar from "../components/Navbar";
import { Footer } from "../components/Footer";
import Home from "../pages/Home";
import AboutUs from "../pages/About";
import Service from "../pages/Services";
import Contact from "../pages/Contact";

const MainLayout = () => {
  return (
    <div className="flex min-h-screen flex-col bg-white">
      <a
        href="#Home"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-100 focus:rounded-lg focus:bg-white focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-brand-700 focus:shadow-soft"
      >
        Lompat ke konten
      </a>
      <Navbar />
      <main className="flex-1">
        <Home />
        <AboutUs />
        <Service />
        <Contact />
      </main>
      <Footer />
    </div>
  );
};

export default MainLayout;
