import { Link } from "react-router-dom"

const LoginBtn = () => {
    return (
        <>
        <Link to="/login" className="hidden sm:block border border-black text-black px-4 py-2 uppercase text-xs font-bold hover:bg-[#259141] hover:text-white transition">
            Login
        </Link>
        </>
    )
}

export default LoginBtn