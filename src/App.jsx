import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import MainLayout from './Layouts/MainLayout'
import Aos from 'aos'
import 'aos/dist/aos.css'
import { useEffect } from 'react'

function App() {
  useEffect(()=>{
    Aos.init({
      duration: 1000,
      once: false,
      easing: 'ease-in-out',
    })
  }, [])
  return (
    <div className="bg-white min-h-screen text-black overflow-hidden w-full">
      <BrowserRouter>
        <Routes>
            <Route path="/" element={<MainLayout/>}>
              <Route index element={<Home/>}/>
            </Route>
        </Routes>
    </BrowserRouter>
    </div>
  )
}

export default App