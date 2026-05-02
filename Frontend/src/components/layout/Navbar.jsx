// import { useState, useEffect } from 'react'
// import { Link, useLocation } from 'react-router-dom'
// import useAuth from '../../hooks/useAuth'

// const Navbar = () => {
//   const [isOpen, setIsOpen] = useState(false)      // Mobile menu
//   const [scrolled, setScrolled] = useState(false)   // Scroll detect
//   const { isLoggedIn, isAdmin, logout } = useAuth()
//   const location = useLocation()

//   // =============================================
//   // SCROLL — Jab user scroll kare toh
//   // navbar ka background change ho
//   // =============================================
//   useEffect(() => {
//     const handleScroll = () => {
//       setScrolled(window.scrollY > 50)
//     }
//     window.addEventListener('scroll', handleScroll)
//     return () => window.removeEventListener('scroll', handleScroll)
//   }, [])

//   // Mobile menu band karo jab route change ho
//   useEffect(() => {
//     setIsOpen(false)
//   }, [location])

//   const navLinks = [
//     { name: 'Home',        href: '/#home' },
//     { name: 'About',       href: '/#about' },
//     { name: 'Plans',       href: '/#plans' },
//     { name: 'Trainers',    href: '/#trainers' },
//     { name: 'Gallery',     href: '/#gallery' },
//     { name: 'Contact',     href: '/#contact' },
//   ]

//   return (
//     <nav className={`
//       fixed top-0 left-0 right-0 z-50
//       transition-all duration-300
//       ${scrolled
//         ? 'bg-[#0a0a0a]/95 backdrop-blur-md border-b border-white/5 py-3'
//         : 'bg-transparent py-5'
//       }
//     `}>
//       <div className="container-custom flex items-center justify-between">

//         {/* LOGO */}
//         <Link to="/" className="flex items-center gap-2">
//           <span className="font-bebas text-2xl tracking-widest text-white">
//             MUSCLE <span className="text-orange-500">VAULT</span>
//           </span>
//         </Link>

//         {/* DESKTOP LINKS */}
//         <div className="hidden lg:flex items-center gap-8">
//           {navLinks.map((link) => (
            
//               key={link.name}
//               href={link.href}
//               className="
//                 text-xs tracking-widest uppercase font-medium
//                 text-gray-400 hover:text-orange-500
//                 transition-colors duration-300
//                 relative group
//               "
//             >
//               {link.name}
//               {/* Underline animation */}
//               <span className="
//                 absolute -bottom-1 left-0 w-0 h-[1px]
//                 bg-orange-500 group-hover:w-full
//                 transition-all duration-300
//               "/>
//             </a>
//           ))}
//         </div>

//         {/* RIGHT SIDE BUTTONS */}
//         <div className="hidden lg:flex items-center gap-3">
//           {isLoggedIn ? (
//             <>
//               {isAdmin && (
//                 <Link
//                   to="/dashboard"
//                   className="
//                     text-xs tracking-widest uppercase font-medium
//                     text-orange-500 hover:text-white
//                     transition-colors duration-300
//                   "
//                 >
//                   Dashboard
//                 </Link>
//               )}
//               <button
//                 onClick={logout}
//                 className="
//                   text-xs tracking-widest uppercase font-medium px-5 py-2.5
//                   border border-white/20 text-gray-400
//                   hover:border-orange-500 hover:text-orange-500
//                   rounded transition-all duration-300
//                 "
//               >
//                 Logout
//               </button>
//             </>
//           ) : (
//             <>
//               <Link
//                 to="/login"
//                 className="
//                   text-xs tracking-widest uppercase font-medium
//                   text-gray-400 hover:text-white
//                   transition-colors duration-300
//                 "
//               >
//                 Login
//               </Link>
//               <Link
//                 to="/signup"
//                 className="
//                   text-xs tracking-widest uppercase font-medium
//                   px-5 py-2.5 bg-orange-500 hover:bg-orange-600
//                   text-white rounded transition-all duration-300
//                 "
//               >
//                 Join Now
//               </Link>
//             </>
//           )}
//         </div>

//         {/* MOBILE HAMBURGER */}
//         <button
//           onClick={() => setIsOpen(!isOpen)}
//           className="lg:hidden flex flex-col gap-1.5 p-2"
//         >
//           <span className={`
//             block w-6 h-0.5 bg-white
//             transition-all duration-300
//             ${isOpen ? 'rotate-45 translate-y-2' : ''}
//           `}/>
//           <span className={`
//             block w-6 h-0.5 bg-white
//             transition-all duration-300
//             ${isOpen ? 'opacity-0' : ''}
//           `}/>
//           <span className={`
//             block w-6 h-0.5 bg-white
//             transition-all duration-300
//             ${isOpen ? '-rotate-45 -translate-y-2' : ''}
//           `}/>
//         </button>

//       </div>

//       {/* MOBILE MENU */}
//       <div className={`
//         lg:hidden overflow-hidden
//         transition-all duration-300
//         ${isOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'}
//         bg-[#0d0d0d] border-t border-white/5
//       `}>
//         <div className="container-custom py-6 flex flex-col gap-4">
//           {navLinks.map((link) => (
            
//               key={link.name}
//               href={link.href}
//               className="
//                 text-sm tracking-widest uppercase
//                 text-gray-400 hover:text-orange-500
//                 transition-colors duration-300 py-2
//                 border-b border-white/5
//               "
//             >
//               {link.name}
//             </a>
//           ))}

//           <div className="flex flex-col gap-3 pt-2">
//             {isLoggedIn ? (
//               <>
//                 {isAdmin && (
//                   <Link
//                     to="/dashboard"
//                     className="
//                       text-sm tracking-widest uppercase text-center
//                       py-3 border border-orange-500 text-orange-500
//                       rounded transition-all duration-300
//                     "
//                   >
//                     Dashboard
//                   </Link>
//                 )}
//                 <button
//                   onClick={logout}
//                   className="
//                     text-sm tracking-widest uppercase
//                     py-3 border border-white/20 text-gray-400
//                     rounded transition-all duration-300
//                   "
//                 >
//                   Logout
//                 </button>
//               </>
//             ) : (
//               <>
//                 <Link
//                   to="/login"
//                   className="
//                     text-sm tracking-widest uppercase text-center
//                     py-3 border border-white/20 text-gray-400
//                     rounded transition-all duration-300
//                   "
//                 >
//                   Login
//                 </Link>
//                 <Link
//                   to="/signup"
//                   className="
//                     text-sm tracking-widest uppercase text-center
//                     py-3 bg-orange-500 text-white
//                     rounded transition-all duration-300
//                   "
//                 >
//                   Join Now
//                 </Link>
//               </>
//             )}
//           </div>
//         </div>
//       </div>

//     </nav>
//   )
// }

// export default Navbar

import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import useAuth from '../../hooks/useAuth'

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  const { isLoggedIn, isAdmin, logout } = useAuth()
  const location = useLocation()

  // Navbar background change on scroll
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }

    window.addEventListener('scroll', handleScroll)

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  // Close mobile menu on route change
  useEffect(() => {
    setIsOpen(false)
  }, [location])

  const navLinks = [
    { name: 'Home', href: '/#home' },
    { name: 'About', href: '/#about' },
    { name: 'Plans', href: '/#plans' },
    { name: 'Trainers', href: '/#trainers' },
    { name: 'Gallery', href: '/#gallery' },
    { name: 'Contact', href: '/#contact' },
  ]

  return (
    <nav
      className={`
        fixed top-0 left-0 right-0 z-50
        transition-all duration-300
        ${
          scrolled
            ? 'bg-[#0a0a0a]/95 backdrop-blur-md border-b border-white/5 py-3'
            : 'bg-transparent py-5'
        }
      `}
    >
      <div className="container-custom flex items-center justify-between">
        
        {/* LOGO */}
        <Link to="/" className="flex items-center gap-2">
          <span className="font-bebas text-2xl tracking-widest text-white">
            MUSCLE <span className="text-orange-500">VAULT</span>
          </span>
        </Link>

        {/* DESKTOP NAV LINKS */}
        <div className="hidden lg:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="
                text-xs tracking-widest uppercase font-medium
                text-gray-400 hover:text-orange-500
                transition-colors duration-300
                relative group
              "
            >
              {link.name}

              {/* Underline animation */}
              <span
                className="
                  absolute -bottom-1 left-0 w-0 h-[1px]
                  bg-orange-500 group-hover:w-full
                  transition-all duration-300
                "
              />
            </a>
          ))}
        </div>

        {/* RIGHT SIDE BUTTONS */}
        <div className="hidden lg:flex items-center gap-3">
          {isLoggedIn ? (
            <>
              {isAdmin && (
                <Link
                  to="/dashboard"
                  className="
                    text-xs tracking-widest uppercase font-medium
                    text-orange-500 hover:text-white
                    transition-colors duration-300
                  "
                >
                  Dashboard
                </Link>
              )}

              <button
                onClick={logout}
                className="
                  text-xs tracking-widest uppercase font-medium
                  px-5 py-2.5
                  border border-white/20
                  text-gray-400
                  hover:border-orange-500 hover:text-orange-500
                  rounded transition-all duration-300
                "
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="
                  text-xs tracking-widest uppercase font-medium
                  text-gray-400 hover:text-white
                  transition-colors duration-300
                "
              >
                Login
              </Link>

              <Link
                to="/signup"
                className="
                  text-xs tracking-widest uppercase font-medium
                  px-5 py-2.5
                  bg-orange-500 hover:bg-orange-600
                  text-white rounded
                  transition-all duration-300
                "
              >
                Join Now
              </Link>
            </>
          )}
        </div>

        {/* MOBILE MENU BUTTON */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="lg:hidden flex flex-col gap-1.5 p-2"
        >
          <span
            className={`
              block w-6 h-0.5 bg-white
              transition-all duration-300
              ${isOpen ? 'rotate-45 translate-y-2' : ''}
            `}
          />

          <span
            className={`
              block w-6 h-0.5 bg-white
              transition-all duration-300
              ${isOpen ? 'opacity-0' : ''}
            `}
          />

          <span
            className={`
              block w-6 h-0.5 bg-white
              transition-all duration-300
              ${isOpen ? '-rotate-45 -translate-y-2' : ''}
            `}
          />
        </button>
      </div>

      {/* MOBILE MENU */}
      <div
        className={`
          lg:hidden overflow-hidden
          transition-all duration-300
          ${isOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'}
          bg-[#0d0d0d]
          border-t border-white/5
        `}
      >
        <div className="container-custom py-6 flex flex-col gap-4">

          {/* MOBILE LINKS */}
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="
                text-sm tracking-widest uppercase
                text-gray-400 hover:text-orange-500
                transition-colors duration-300
                py-2 border-b border-white/5
              "
            >
              {link.name}
            </a>
          ))}

          {/* MOBILE BUTTONS */}
          <div className="flex flex-col gap-3 pt-2">
            {isLoggedIn ? (
              <>
                {isAdmin && (
                  <Link
                    to="/dashboard"
                    className="
                      text-sm tracking-widest uppercase text-center
                      py-3
                      border border-orange-500
                      text-orange-500
                      rounded
                      transition-all duration-300
                    "
                  >
                    Dashboard
                  </Link>
                )}

                <button
                  onClick={logout}
                  className="
                    text-sm tracking-widest uppercase
                    py-3
                    border border-white/20
                    text-gray-400
                    rounded
                    transition-all duration-300
                  "
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="
                    text-sm tracking-widest uppercase text-center
                    py-3
                    border border-white/20
                    text-gray-400
                    rounded
                    transition-all duration-300
                  "
                >
                  Login
                </Link>

                <Link
                  to="/signup"
                  className="
                    text-sm tracking-widest uppercase text-center
                    py-3
                    bg-orange-500
                    text-white
                    rounded
                    transition-all duration-300
                  "
                >
                  Join Now
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar