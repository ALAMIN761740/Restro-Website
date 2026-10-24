
import React, { useEffect, useState } from 'react'
import { navLinks } from '../data/data'
import { MenuIcon, XIcon } from 'lucide-react'

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10)
    }

    window.addEventListener('scroll', handleScroll)

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  useEffect(() => {
    if (!mobileOpen) return

    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        setMobileOpen(false)
      }
    }

    window.addEventListener('keydown', handleKeyDown)

    return () => {
      document.body.style.overflow = previousOverflow
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [mobileOpen])

  return (
    <nav
      className={`fixed top-0 z-50 w-full transition-all duration-300 ${
        scrolled
          ? 'bg-white/80 backdrop-blur-md shadow-sm'
          : 'bg-transparent'
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 md:px-6">
        <a href="/" aria-label="Home">
          <img src="/assets/logo.svg" alt="Logo" />
        </a>

        {/* Desktop navigation */}
        <div className="hidden items-center gap-10 md:flex">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="transition-colors hover:text-orange-500"
            >
              {link.name}
            </a>
          ))}
        </div>

        <a
          href="#booking-process"
          className="hidden rounded-full bg-orange-500 px-6 py-3 text-white transition hover:bg-orange-600 md:block"
        >
          Book a table
        </a>

        {/* Mobile menu button */}
        <button
          type="button"
          aria-label="Open navigation menu"
          aria-expanded={mobileOpen}
          onClick={() => setMobileOpen(true)}
          className="rounded-md bg-zinc-800 p-2 text-white md:hidden"
        >
          <MenuIcon size={24} />
        </button>
      </div>

      {/* Mobile navigation drawer */}
      <div
        aria-hidden={!mobileOpen}
        className={`fixed inset-0 z-[60] bg-white/90 backdrop-blur-md transition-transform duration-300 md:hidden ${
          mobileOpen
            ? 'translate-x-0'
            : '-translate-x-full pointer-events-none'
        }`}
      >
        <button
          type="button"
          aria-label="Close navigation menu"
          onClick={() => setMobileOpen(false)}
          className="absolute right-5 top-5 rounded-md bg-zinc-800 p-2 text-white"
        >
          <XIcon size={24} />
        </button>

        <div className="flex h-full flex-col items-center justify-center gap-7 font-medium">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              tabIndex={mobileOpen ? 0 : -1}
              onClick={() => setMobileOpen(false)}
              className="text-2xl text-zinc-800 transition-colors hover:text-orange-500"
            >
              {link.name}
            </a>
          ))}

          <a
            href="#booking-process"
            tabIndex={mobileOpen ? 0 : -1}
            onClick={() => setMobileOpen(false)}
            className="rounded-full bg-orange-500 px-6 py-3 text-white transition hover:bg-orange-600"
          >
            Book a table
          </a>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
