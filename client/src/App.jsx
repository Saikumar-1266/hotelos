import { BrowserRouter, Routes, Route } from 'react-router-dom'

import Navbar from './components/Navbar'
import Footer from './components/Footer'

import Home from './pages/Home'
import Menu from './pages/Menu'
import Rooms from './pages/Rooms'
import Banquet from './pages/Banquet'

function App() {
  return (
    <BrowserRouter>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/menu" element={<Menu />} />
        <Route path="/rooms" element={<Rooms />} />
        <Route path="/banquet" element={<Banquet />} />
      </Routes>

      <Footer />
    </BrowserRouter>
  )
}

export default App