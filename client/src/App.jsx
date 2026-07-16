import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Services from './components/Services'
import FeaturedMenu from './components/FeaturedMenu'
import RoomsSection from './components/RoomsSection'
import BanquetSection from './components/BanquetSection'
import ContactSection from './components/ContactSection'
import Footer from './components/Footer'



// function App() {
//   return (
//     <div className="min-h-screen bg-slate-950">
//       <Navbar />

//       <section
//         id="home"
//         className="flex min-h-screen items-center justify-center"
//       >
//         <h1 className="text-5xl font-bold text-white">
//           Welcome to HotelOS
//         </h1>
//       </section>
//     </div>
//   )
// }

function App() {
  return (
    <div>
      <Navbar />
      <Hero />
      <Services/>
      <FeaturedMenu/>
      <RoomsSection/>
      <BanquetSection/>
      <ContactSection/>
      <Footer/>
    </div>
  )
}

export default App