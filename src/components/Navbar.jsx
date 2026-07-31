import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Logo from '../assets/logo.png';
import LoginBtn from './LoginBtn';

const Navbar = () => {
    const [activeSection, setActiveSection] = useState('Home');
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            const sections = ['Home', 'AboutUs', 'Service', 'Contact'];
            const scrollPosition = window.scrollY + 200;

            for (const sectionId of sections) {
                const element = document.getElementById(sectionId);
                if (element) {
                    const top = element.offsetTop;
                    const height = element.offsetHeight;
                    
                    if (scrollPosition >= top && scrollPosition < top + height) {
                        setActiveSection(sectionId);
                        break;
                    }
                }
            }
        };

        window.addEventListener('scroll', handleScroll);
        handleScroll();
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        if (isMobileMenuOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
    }, [isMobileMenuOpen]);

    const navItems = [
        { id: 'Home', Label: 'Home' },
        { id: 'AboutUs', Label: 'About Us' },
        { id: 'Service', Label: 'Services' },
        { id: 'Contact', Label: 'Contact' }
    ];

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    return (
        <header className="fixed left-0 right-0 top-0 z-50 w-full bg-white/80 backdrop-blur-md transition-all duration-300 border-b border-gray-100">
            <div className="container mx-auto px-4 lg:px-8">
                <div className="flex items-center justify-between h-20 w-full">
                    <div className="flex items-center gap-8">
                        <Link to="/" onClick={() => setIsMobileMenuOpen(false)}>
                            <img src={Logo} alt="Logo" className="h-12 md:h-16 w-auto object-contain" />
                        </Link>
                        <nav className="hidden lg:flex items-center gap-8 text-sm uppercase tracking-widest">
                            {navItems.map((item) => {
                                const isActive = activeSection === item.id;
                                return (
                                    <a key={item.id} href={`#${item.id}`} className={`relative py-2 text-sm font-medium transition-colors duration-300 group ${isActive ? "text-[#259141] font-semibold" : "text-gray-700 hover:text-[#259141]"}`}>
                                        <span className="inline-block transition-transform duration-300 group-hover:-translate-y-0.5">
                                            {item.Label}
                                        </span>
                                        <span className={`absolute bottom-0 left-0 h-[2px] bg-[#259141] rounded-full transition-all duration-300 ${isActive ? "w-full" : "w-0 group-hover:w-full" }`}/>
                                    </a>
                                );
                            })}
                        </nav>
                    </div>
                    <div className="flex items-center gap-4">
                        <div className="hidden lg:block">
                            <LoginBtn />
                        </div>
                        <button onClick={toggleMobileMenu} className="lg:hidden p-2 text-gray-700 hover:text-[#259141] focus:outline-none" aria-label="Toggle Navigation">
                            <svg className="w-7 h-7 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                {isMobileMenuOpen ? (
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                ) : (
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"/>
                                )}
                            </svg>
                        </button>
                    </div>

                </div>
            </div>

            {/* Mobile Navigation Drawer / Menu Dropdown */}
            <div 
                className={`lg:hidden absolute top-full inset-x-0  bg-white/80 backdrop-blur-md border-b border-gray-200 shadow-xl transition-all duration-300 ease-in-out overflow-hidden ${
                    isMobileMenuOpen ? "max-h-[400px] opacity-100 py-6" : "max-h-0 opacity-0 py-0"
                }`}
            >
                <div className="container mx-auto px-6 flex flex-col gap-5">
                    {navItems.map((item) => {
                        const isActive = activeSection === item.id;
                        return (
                            <a key={item.id} href={`#${item.id}`} onClick={() => setIsMobileMenuOpen(false)} className={`text-base font-semibold tracking-wider transition-colors duration-200 ${
                                    isActive ? "text-[#259141] pl-2 border-l-4 border-[#259141]" : "text-gray-700 hover:text-[#259141]"}`} >
                                {item.Label}
                            </a>
                        );
                    })}

                    <div className="pt-4 border-t border-gray-100 flex justify-start">
                        <div onClick={() => setIsMobileMenuOpen(false)} className="w-full">
                            <LoginBtn />
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Navbar;