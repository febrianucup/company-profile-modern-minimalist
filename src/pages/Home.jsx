import { Link } from "react-router-dom"
import peoplePict from "../assets/peoplePict.png"
import peoplePict2 from "../assets/peoplePict2.png"

function Home() {
    const companyName = "B0MBER SOFTGEN"  
    return (
        <header className="w-full bg-white">
            <div className="container mx-auto px-4 lg:px-8 py-16 text-center">
                <div className="flex flex-col item-center justify-center gap-4">
                    <p className="text-sm md:text-base font-semibold tracking-light text-gray-500">#1 Software House to Develop All Your Digital Needs</p>
                    <h1 className="text-[80px] font-mono font-semibold tracking-wider leading-22">Welcome to <br /> <span className="font-bold text-[#259141]">{companyName}</span></h1>
                    <p className="text-lg px-96">Bomber Software House adalah mitra pengembangan perangkat lunak yang berfokus pada efisiensi, performa, dan desain modern. Kami membantu bisnis dan startup mentransformasi ide menjadi aplikasi web serta sistem enterprise yang andal, aman, dan siap tumbuh bersamamu.</p>
                    <div className="flex items-center justify-center mt-8 gap-2">
                        <Link className="px-6 py-4 bg-[#259141] text-white font-semibold rounded-md shadow hover:bg-[#1F7338] transition">
                            Learn What Bomber Does
                        </Link>
                        <Link className="px-6 py-4 bg-white text-[#2DB34F] border-2 font-semibold rounded-md shadow hover:bg-[#2DB34F40] hover:text-black transition">
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
                        className="w-full max-w-sm object-contain drop-shadow-xl"
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