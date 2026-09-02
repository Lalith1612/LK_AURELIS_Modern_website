import { useState, useEffect } from 'react'

const NAV_LINKS = [
  { label: 'Aurelis', href: '#top' },
  { label: 'Design', href: '#design' },
  { label: 'Performance', href: '#performance' },
  { label: 'Engineering', href: '#engineering' },
  { label: 'Architecture', href: '#architecture' },
  { label: 'Interior', href: '#interior' },
  { label: 'Technology', href: '#technology' },
  { label: 'Safety', href: '#safety' },
  { label: 'Configure', href: '#personalize' }
]

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('top')

  useEffect(() => {
    const handleScroll = () => {
      const sections = NAV_LINKS.map(link => link.href.replace('#', ''))
      const scrollPos = window.scrollY + 200

      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i])
        if (el && el.offsetTop <= scrollPos) {
          setActiveSection(sections[i])
          break
        }
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <>
      <header className="navbar">
        <a className="navbar-brand" href="#top" aria-label="LK Aurelis Home">
          LK <i>AURELIS</i>
        </a>

        <nav className="navbar-menu" aria-label="Primary Navigation">
          {NAV_LINKS.map(link => {
            const id = link.href.replace('#', '')
            const isActive = activeSection === id
            return (
              <a
                key={link.label}
                href={link.href}
                className={`navbar-link ${isActive ? 'active' : ''}`}
              >
                {link.label}
              </a>
            )
          })}
        </nav>

        <button
          className="navbar-toggle"
          aria-label="Toggle Menu"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          <span />
          <span />
        </button>
      </header>

      <div className={`mobile-drawer ${mobileOpen ? 'open' : ''}`}>
        <nav>
          {NAV_LINKS.map(link => (
            <a
              key={link.label}
              href={link.href}
              onClick={() => setMobileOpen(false)}
            >
              {link.label}
            </a>
          ))}
        </nav>
      </div>
    </>
  )
}
