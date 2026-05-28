import Navbar from './Navbar'
import Footer from './Footer'

// =============================================
// LAYOUT — Wrapper component hai
// Har page ke upar Navbar
// Har page ke neeche Footer
// Beech mein page ka content
// =============================================

const Layout = ({ children }) => {
  return (
    <div className="min-h-screen bg-[#0a0a0a] flex flex-col">

      {/* TOP — Navbar */}
      <Navbar />

      {/* MIDDLE — Page ka content */}
      <main className="flex-1">
        {children}
      </main>

      {/* BOTTOM — Footer */}
      <Footer />

    </div>
  )
}

export default Layout
