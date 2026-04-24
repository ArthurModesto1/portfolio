import { FiGithub, FiLinkedin } from 'react-icons/fi'
import { FaWhatsapp } from 'react-icons/fa'
import { MdOutlineEmail } from 'react-icons/md'

const SOCIAL = [
  {
    label: 'GitHub',
    href: 'https://github.com/ArthurModesto1',
    icon: <FiGithub size={18} />,
  },
  {
    label: 'LinkedIn',
    href: 'https://linkedin.com/in/arthurmodesto',
    icon: <FiLinkedin size={18} />,
  },
  {
    label: 'WhatsApp',
    href: 'https://wa.me/5531986257475',
    icon: <FaWhatsapp size={18} />,
  },
  {
    label: 'Gmail',
    href: 'mailto:arthurmodestocouto@gmail.com',
    icon: <MdOutlineEmail size={18} />,
  },
]

export default function Footer() {
  return (
    <footer className="w-full py-8 mt-10 border-t border-surface-200 text-center text-sm text-surface-500">
      <div className="flex justify-center gap-5 mb-4">
        {SOCIAL.map(({ label, href, icon }) => (
          <a
            key={label}
            href={href}
            target="_blank"
            rel="noreferrer"
            aria-label={label}
            className="text-surface-400 hover:text-primary-500 transition-colors duration-200"
          >
            {icon}
          </a>
        ))}
      </div>
      <p>© {new Date().getFullYear()} Arthur Modesto. Todos os direitos reservados.</p>
    </footer>
  )
}