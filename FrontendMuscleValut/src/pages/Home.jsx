import Layout from '../components/layout/Layout'
import Hero from '../components/sections/Hero'
import About from '../components/sections/About'
import Features from '../components/sections/Features'
import Plans from '../components/sections/Plans'
import Trainers from '../components/sections/Trainers'
import Testimonials from '../components/sections/Testimonials'
import Gallery from '../components/sections/Gallery'
import Contact from '../components/sections/Contact'

const Home = () => {
  return (
    <Layout>
      <Hero />
      <About />
      <Features />
      <Plans />
      <Trainers />
      <Testimonials />
      <Gallery />
      <Contact />
    </Layout>
  )
}

export default Home
