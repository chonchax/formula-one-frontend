import { useState } from 'react'
import { IconMenu2, IconX } from '@tabler/icons-react'
import logo from '../assets/logo.png'
import { NavLink } from 'react-router-dom'

const Navbar = () => {
  const [hamburger, setHamburger] = useState(false)

  const navlinks = [
    { name: 'Drivers', link: '/drivers' },
    { name: 'Teams', link: '/teams' },
    { name: 'Races', link: '/races' }
  ]

  return (
    <>
      {/* Desktop Navbar */}
      <nav className="fixed top-0 left-0 w-full h-20 bg-black shadow-md z-50 flex justify-between items-center px-6 md:px-10">
        <div
          className="cursor-pointer flex items-center h-full"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        >
          <NavLink to="/">
            <img src={logo} alt="logo" className="h-14 w-auto" />
          </NavLink>
        </div>

        <ul className="hidden md:flex gap-8 font-semibold text-white text-lg">
          {navlinks.map((item) => (
            <li key={item.name} className="flex items-center h-full font-title">
              <NavLink
                to={item.link}
                className={({ isActive }) =>
                  isActive
                    ? 'text-primary border-b-2 border-border pb-1'
                    : 'hover:text-hover transition-colors pb-1'
                }
              >
                {item.name}
              </NavLink>
            </li>
          ))}
        </ul>

        {/* Mobile Hamburger */}
        <div
          className="md:hidden cursor-pointer flex items-center"
          onClick={() => setHamburger(!hamburger)}
        >
          {hamburger ? (
            <IconX width={32} height={32} className="text-white" />
          ) : (
            <IconMenu2 width={32} height={32} className="text-white" />
          )}
        </div>
      </nav>

      {/* Mobile Menu */}
      <div
        className={`fixed top-0 left-0 w-full h-screen bg-white-dark flex flex-col items-center justify-center gap-16 text-3xl z-40 transform transition-transform duration-300 ${
          hamburger ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <ul className="flex flex-col gap-12 text-black font-semibold items-center">
          {navlinks.map((item) => (
            <li className="font-title " key={item.name} onClick={() => setHamburger(false)}>
              <NavLink
                to={item.link}
                className={({ isActive }) =>
                  isActive ? 'text-primary' : 'hover:text-hover transition-colors'
                }
              >
                {item.name}
              </NavLink>
            </li>
          ))}
        </ul>
      </div>
    </>
  )
}

export default Navbar
