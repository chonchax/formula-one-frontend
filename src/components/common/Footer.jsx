import { IconBrandGithub, IconBrandLinkedin } from '@tabler/icons-react'

const Footer = () => {
  return (
    <footer className="bg-black py-20 w-full mt-20">
      <div className="max-w-[1280px] mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6 md:gap-0 text-center md:text-left">
        <div className="text-white font-body">
          <h3 className="text-lg md:text-base">46 Avenue Edouard Millaud Craponne</h3>
        </div>

        <div className="text-white font-body flex flex-col md:flex-row items-center gap-2 md:gap-4">
          <h3 className="text-lg md:text-base">
            Made with ❤️ | Copyright © 2025 Chonchax | Tous droits réservés.
          </h3>
          <a href="/legal" className="text-white hover:text-primary transition-colors text-sm">
            Mentions légales
          </a>
        </div>

        <div className="flex gap-6 mt-4 md:mt-0">
          <a
            aria-label="linkedin"
            target="_blank"
            rel="noreferrer"
            href="https://www.linkedin.com/in/yann-le-saint"
            className="text-white hover:text-primary transition-transform transform hover:scale-110"
          >
            <IconBrandLinkedin size={30} />
          </a>
          <a
            aria-label="github"
            target="_blank"
            rel="noreferrer"
            href="https://github.com/chonchax"
            className="text-white hover:text-primary transition-transform transform hover:scale-110"
          >
            <IconBrandGithub size={30} />
          </a>
        </div>
      </div>
    </footer>
  )
}

export default Footer
