import Navbar from "../components/Navbar"
import { Footer } from "../components/Footer"
import Home from "../pages/Home"
import AboutUs from "../pages/About"
import Service from "../pages/Services"
import Contact from "../pages/Contact"

const MainLayout = () => {
    return(
        <div className="min-h-screen flex flex-col bg-white">
            <Navbar/>
            <main className="flex-grow">
                <section id="Home">
                    <Home/>
                </section>
                <section id="AboutUs">
                    <AboutUs/>
                </section>
                <section id="Service">
                    <Service/>
                </section>
                <section id="Contact">
                    <Contact/>
                </section>
            </main>
            <Footer/>
        </div>
    )
}

export default MainLayout