import Navbar from './components/Navbar'
import Hero from './components/Hero'
import TrustMarquee from './components/TrustMarquee'
import Services from './components/Services'
import Process from './components/Process'
import Work from './components/Work'
import Skills from './components/Skills'
import Why from './components/Why'
import Contact from './components/Contact'

export default function App() {
  return (
    <div style={{ position: 'relative', width: '100%', overflow: 'hidden' }}>
      <Navbar />
      <Hero />
      <TrustMarquee />
      <Services />
      <Process />
      <Work />
      <Skills />
      <Why />
      <Contact />
    </div>
  )
}
