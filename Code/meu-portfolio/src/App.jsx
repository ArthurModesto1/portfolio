import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home       from './pages/Home/Home'
import About      from './pages/About/About'
import Experience from './pages/Experience/Experience'
import Projects   from './pages/Projects/Projects'
import Contact    from './pages/Contact/Contact'

export default function App() {
  return (
    <BrowserRouter>
      {}
      <Navbar />

      <main>
        <Routes>
          <Route path="/"           element={<Home />} />
          <Route path="/sobre"      element={<About />} />
          <Route path="/experiencia" element={<Experience />} />
          <Route path="/projetos"   element={<Projects />} />
          <Route path="/contato"    element={<Contact />} />
        </Routes>
      </main>

      <Footer />
    </BrowserRouter>
  )
}