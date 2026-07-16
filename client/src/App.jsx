import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Services from './components/Services'


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
    </div>
  )
}

export default App