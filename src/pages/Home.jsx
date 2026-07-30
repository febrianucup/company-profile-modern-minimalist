import { Link } from "react-router-dom"
import peoplePict from "../assets/peoplePict.png"
import peoplePict2 from "../assets/peoplePict2.png"

function Home() {
    const companyName = "B0MBER SOFTGEN"  
    return (
        <header className="w-full bg-white">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20 lg:py-24 text-center">
            <div className="flex flex-col items-center justify-center gap-4 max-w-5xl mx-auto" data-aos="fade-out">
                <p className="text-xs sm:text-sm md:text-base font-semibold tracking-tight text-gray-500 max-w-xl">
                #1 Software House to Develop All Your Digital Needs
                </p>
                <h1 className="text-4xl sm:text-6xl lg:text-[80px] font-mono font-semibold tracking-wider leading-tight sm:leading-snug lg:leading-[1.1]">
                Welcome to <br />{" "}
                <span className="font-bold text-[#259141]">{companyName}</span>
                </h1>
                <p className="text-sm sm:text-base md:text-lg text-gray-600 max-w-3xl mx-auto px-2 leading-relaxed">
                Bomber Software House adalah mitra pengembangan perangkat lunak yang berfokus pada efisiensi, performa, dan desain modern. Kami membantu bisnis dan startup mentransformasi ide menjadi aplikasi web serta sistem enterprise yang andal, aman, dan siap tumbuh bersamamu.
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center mt-6 sm:mt-8 gap-3 sm:gap-4 w-full sm:w-auto px-4">
                <Link to="/#about" className="w-full sm:w-auto text-center px-6 py-3.5 sm:py-4 bg-[#259141] text-white font-semibold rounded-md shadow hover:bg-[#1F7338] transition" data-aos="slide-right" data-aos-delay="200">
                    Learn What Bomber Does
                </Link>
                <Link to="/" className="w-full sm:w-auto text-center px-6 py-3.5 sm:py-4 bg-white text-[#2DB34F] border-2 border-[#2DB34F] font-semibold rounded-md shadow hover:bg-[#2DB34F]/10 hover:text-[#1F7338] transition" data-aos="slide-left" data-aos-delay="200">
                    Explore our products
                </Link>
                </div>
            </div>
            </div>
            <div className="relative bg-gradient-to-b from-white via-[#259141] to-[#259141] pt-16 pb-16">
                <div className="container mx-auto px-4 flex justify-center relative z-10">
                    <img 
                        src={peoplePict}
                        alt="Hero Illustration" 
                        className="w-full max-w-sm object-contain drop-shadow-xl" data-aos="fade-in"
                    />
                </div>
                <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none">
                    <svg 
                        className="relative block w-full h-16 md:h-76 text-white" 
                        viewBox="0 0 1440 310" 
                        preserveAspectRatio="none"
                    >
                        <path 
                        fill="currentColor" 
                        d="M0,240 C480,40 960,40 1440,240 L1440,320 L0,320 Z"
                        />
                    </svg>
                </div>
            </div>
        </header>
    )
}

export default Home