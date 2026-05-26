import Hero from './components/Hero'
import SalgadosSection from './components/SalgadosSection'
import BrigadeiroSection from './components/BrigadeiroSection'
import KitFestaSection from './components/KitFestaSection'
import Localizacao from './components/Localizacao'
import Footer from './components/Footer'
import WhatsAppButton from './components/WhatsAppButton'

function App() {
  return (
    <>
      <header>
        <Hero />
      </header>
      <main>
        <SalgadosSection />
        <BrigadeiroSection />
        <KitFestaSection />
        <Localizacao />
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  )
}

export default App
