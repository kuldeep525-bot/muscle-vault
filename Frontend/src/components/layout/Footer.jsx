import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <footer className="bg-[#070707] border-t border-white/5">

      {/* MAIN FOOTER */}
      <div className="container-custom py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">

          {/* LOGO + ABOUT */}
          <div className="lg:col-span-2">
            <span className="font-bebas text-3xl tracking-widest text-white">
              MUSCLE <span className="text-orange-500">VAULT</span>
            </span>

            <p className="mt-4 text-gray-500 text-sm leading-relaxed max-w-sm">
              Punjab ka #1 fitness destination. State-of-the-art equipment,
              elite trainers aur ek community jo tumhe push kare limits ke paar.
            </p>

            {/* SOCIAL LINKS */}
            <div className="flex items-center gap-4 mt-6">

              {/* Instagram */}
              <a
                href="#"
                className="
                  w-9 h-9 rounded border border-white/10
                  flex items-center justify-center
                  text-gray-500 hover:text-orange-500
                  hover:border-orange-500
                  transition-all duration-300
                "
              >
                <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </a>

              {/* Facebook */}
              <a
                href="#"
                className="
                  w-9 h-9 rounded border border-white/10
                  flex items-center justify-center
                  text-gray-500 hover:text-orange-500
                  hover:border-orange-500
                  transition-all duration-300
                "
              >
                <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </a>

              {/* YouTube */}
              <a
                href="#"
                className="
                  w-9 h-9 rounded border border-white/10
                  flex items-center justify-center
                  text-gray-500 hover:text-orange-500
                  hover:border-orange-500
                  transition-all duration-300
                "
              >
                <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.495 6.205a3.007 3.007 0 0 0-2.088-2.088c-1.87-.501-9.396-.501-9.396-.501s-7.507-.01-9.396.501A3.007 3.007 0 0 0 .527 6.205a31.247 31.247 0 0 0-.522 5.805 31.247 31.247 0 0 0 .522 5.783 3.007 3.007 0 0 0 2.088 2.088c1.868.502 9.396.502 9.396.502s7.506 0 9.396-.502a3.007 3.007 0 0 0 2.088-2.088 31.247 31.247 0 0 0 .5-5.783 31.247 31.247 0 0 0-.5-5.805zM9.609 15.601V8.408l6.264 3.602z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* QUICK LINKS */}
          <div>
            <h4
              className="
                font-bebas text-lg tracking-widest text-white
                mb-6 relative
                after:content-[''] after:absolute after:-bottom-2
                after:left-0 after:w-8 after:h-0.5 after:bg-orange-500
              "
            >
              Quick Links
            </h4>

            <ul className="flex flex-col gap-3">
              {[
                { name: 'Home', href: '/#home' },
                { name: 'About', href: '/#about' },
                { name: 'Plans', href: '/#plans' },
                { name: 'Trainers', href: '/#trainers' },
                { name: 'Gallery', href: '/#gallery' },
                { name: 'Contact', href: '/#contact' },
              ].map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="
                      text-sm text-gray-500 hover:text-orange-500
                      transition-colors duration-300
                      flex items-center gap-2 group
                    "
                  >
                    <span
                      className="
                        w-1 h-1 rounded-full bg-orange-500
                        group-hover:w-3 transition-all duration-300
                      "
                    />

                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* CONTACT INFO */}
          <div>
            <h4
              className="
                font-bebas text-lg tracking-widest text-white
                mb-6 relative
                after:content-[''] after:absolute after:-bottom-2
                after:left-0 after:w-8 after:h-0.5 after:bg-orange-500
              "
            >
              Contact
            </h4>

            <ul className="flex flex-col gap-4">

              {/* Location */}
              <li className="flex items-start gap-3">
                <svg className="text-orange-500 mt-0.5 shrink-0" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                  <circle cx="12" cy="10" r="3"/>
                </svg>

                <span className="text-sm text-gray-500">
                  Model Town, Ludhiana
                  <br />
                  Punjab, India
                </span>
              </li>

              {/* Phone */}
              <li className="flex items-center gap-3">
                <svg className="text-orange-500 shrink-0" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 13a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/>
                </svg>

                <a
                  href="tel:+919876543210"
                  className="text-sm text-gray-500 hover:text-orange-500 transition-colors duration-300"
                >
                  +91 98765 43210
                </a>
              </li>

              {/* Email */}
              <li className="flex items-center gap-3">
                <svg className="text-orange-500 shrink-0" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                  <polyline points="22,6 12,13 2,6"/>
                </svg>

                <a
                  href="mailto:info@musclevault.in"
                  className="text-sm text-gray-500 hover:text-orange-500 transition-colors duration-300"
                >
                  info@musclevault.in
                </a>
              </li>

              {/* Timing */}
              <li className="flex items-start gap-3">
                <svg className="text-orange-500 mt-0.5 shrink-0" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <circle cx="12" cy="12" r="10"/>
                  <polyline points="12 6 12 12 16 14"/>
                </svg>

                <span className="text-sm text-gray-500">
                  Mon–Sat: 6AM – 10PM
                </span>
              </li>

            </ul>
          </div>

        </div>
      </div>

      {/* BOTTOM BAR */}
      <div className="border-t border-white/5">
        <div className="container-custom py-5 flex flex-col sm:flex-row items-center justify-between gap-3">

          <p className="text-xs text-gray-600 tracking-wider">
            © 2025 Muscle Vault. All rights reserved.
          </p>

          <div className="flex items-center gap-5">
            <a
              href="#"
              className="text-xs text-gray-600 hover:text-orange-500 transition-colors duration-300 tracking-wider"
            >
              Privacy Policy
            </a>

            <a
              href="#"
              className="text-xs text-gray-600 hover:text-orange-500 transition-colors duration-300 tracking-wider"
            >
              Terms of Use
            </a>
          </div>

        </div>
      </div>

    </footer>
  )
}

export default Footer