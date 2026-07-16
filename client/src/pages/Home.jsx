import Hero from '../components/Hero'
import Services from '../components/Services'
import FeaturedMenu from '../components/FeaturedMenu'
import RoomsSection from '../components/RoomsSection'
import BanquetSection from '../components/BanquetSection'
import ContactSection from '../components/ContactSection'

const Home = () => {
  return (
    <>
      <Hero />
      <Services />
      <FeaturedMenu />
      <RoomsSection />
      <BanquetSection />
      <ContactSection />
    </>
  )
}

export default Home