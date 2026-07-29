import { NavLink, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Logo from '../assets/logo.png';
import LoginBtn from './LoginBtn'

const Navbar = () => {
    // const getLinkClass = ({ isActive }) =>
    //   `relative py-2 text-sm font-medium transition-colors duration-300 group ${
    //     isActive ? "text-[#259141] font-semibold" : "text-gray-500 hover:text-[#259141]"
    //   }`;

    const [activeSection, setActiveSection] = useState('Home')

    useEffect(()=>{
        const handleScroll = () => {
            const sections = ['Home', 'AboutUs', 'Service', 'Contact']
            const scrollPosition = window.scrollY + 200

            for(const sectionId of sections){
                const element = document.getElementById(sectionId)
                if(element){
                    const top = element.offsetTop
                    const height = element.offsetHeight
                    
                    if(scrollPosition >= top && scrollPosition < top+height){
                        setActiveSection(sectionId)
                        break
                    }
                }
            }
        }

        window.addEventListener('scroll', handleScroll)
        // handleScroll()
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    const navItems = [
        {id: 'Home', Label: 'Home'},
        {id: 'AboutUs', Label: 'About Us'},
        {id: 'Service', Label: 'Services'},
        {id: 'Contact', Label: 'Contact'}
    ]

    return (
        <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md transition-all duration-300">
            <div className="container mx-auto px-4 lg:px-8">
                <div className="flex items-center py-4 gap-4 h-20 justify-between w-full">
                    <div className="flex items-center gap-8">
                        <Link to="/">
                            <img src={Logo} alt="Logo" className="h-16 w-auto object-contain" />
                        </Link>

                        <nav className="hidden lg:flex items-center gap-8 text-sm uppercase tracking-widest">
                            {navItems.map((item) => {
                                const isActive = activeSection === item.id
                                return (
                                    <a key={item.id} href={`#${item.id}`} className={`relative py-2 text-sm font-medium transition-colors duration-300 group ${isActive ? "text-[#259141] font-semibold" : "text-gray-700 hover:text-[#259141] group-hover:-translate-y-1"}`}>
                                        <span className="inline-block transition-transform duration-300 group-hover:-translate-y-1">
                                            {item.Label}
                                        </span>
                                        <span
                                            className={`absolute bottom-0 left-0 h-[2px] bg-[#259141] rounded-full transition-all duration-300 ${
                                            isActive
                                                ? "w-full" 
                                                : "w-0 group-hover:w-full" 
                                            }`}
                                        />
                                    </a>
                                )
                            })}
                            
                        </nav>
                    </div>
                    <LoginBtn/>
                </div>
            </div>
        </header>
    )
}

export default Navbar