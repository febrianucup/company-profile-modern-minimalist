import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import MainLayout from './Layouts/MainLayout'

function App() {
  return (
    <div className="bg-white min-h-screen text-black">
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