import { useState, useEffect } from 'react'
import { NavLink } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { FiSun, FiMoon } from 'react-icons/fi'

function useDarkMode() {
  const [dark, setDark] = useState(() =>
    localStorage.getItem('theme') === 'dark' ||
    (!localStorage.getItem('theme') && window.matchMedia('(prefers-color-scheme: dark)').matches)
  )

  useEffect(() => {
    const root = document.documentElement
    if (dark) {
      root.classList.add('dark')
      localStorage.setItem('theme', 'dark')
    } else {
      root.classList.remove('dark')
      localStorage.setItem('theme', 'light')
    }
  }, [dark])

  return [dark, setDark]
}

// Seletor de idioma: PT | EN | ES
function LangSelector() {
  const { i18n } = useTranslation()
  const langs = ['pt', 'en', 'es']

  return (
    <div className="flex items-center gap-1 text-sm">
      {langs.map((lang, idx) => (
        <span key={lang} className="flex items-center">
          <button
            onClick={() => i18n.changeLanguage(lang)}
            className={`uppercase font-medium px-1 transition-colors ${i18n.language === lang
              ? 'text-primary-500'
              : 'text-surface-400 hover:text-surface-700 dark:hover:text-surface-200'
              }`}
          >
            {lang}
          </button>
          {/* Separador entre opções */}
          {idx < langs.length - 1 && (
            <span className="text-surface-300 dark:text-surface-600">·</span>
          )}
        </span>
      ))}
    </div>
  )
}

export default function Navbar() {
  const { t } = useTranslation()
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [dark, setDark] = useDarkMode()

  // Adiciona sombra suave ao rolar a página
  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handler)
    return () => window.removeEventListener('scroll', handler)
  }, [])

  const links = [
    { to: '/', label: t('nav.home') },
    { to: '/sobre', label: t('nav.about') },
    { to: '/experiencia', label: t('nav.experience') },
    { to: '/projetos', label: t('nav.projects') },
    { to: '/contato', label: t('nav.contact') },
  ]

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-300
      bg-white/80 dark:bg-surface-900/80 backdrop-blur-md
      ${scrolled ? 'shadow-sm border-b border-surface-200 dark:border-surface-700' : ''}`}
    >
      <div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo / nome */}
        <NavLink to="/" className="font-display font-bold text-lg text-primary-600">
          &lt;Arthur Modesto /&gt;
        </NavLink>

        {/* Links desktop */}
        <div className="hidden md:flex items-center gap-6">
          {links.map(link => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) =>
                `text-sm font-medium transition-colors ${isActive
                  ? 'text-primary-500'
                  : 'text-surface-500 hover:text-surface-800 dark:text-surface-400 dark:hover:text-white'
                }`
              }
            >
              {link.label}
            </NavLink>
          ))}
          <button
            onClick={() => setDark(!dark)}
            aria-label="Alternar tema"
            className="p-2 rounded-lg text-surface-400 hover:text-surface-700 dark:hover:text-surface-200 hover:bg-surface-100 dark:hover:bg-surface-800 transition-colors"
          >
            {dark ? <FiSun size={16} /> : <FiMoon size={16} />}
          </button>
          <LangSelector />
        </div>

        { }
        <button
          className="md:hidden p-2 text-surface-500"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Abrir menu"
        >
          { }
          <div className="w-5 space-y-1">
            <span className={`block h-0.5 bg-current transition-all ${menuOpen ? 'rotate-45 translate-y-1.5' : ''}`} />
            <span className={`block h-0.5 bg-current transition-all ${menuOpen ? 'opacity-0' : ''}`} />
            <span className={`block h-0.5 bg-current transition-all ${menuOpen ? '-rotate-45 -translate-y-1.5' : ''}`} />
          </div>
        </button>
      </div>

      {/* Menu mobile */}
      {menuOpen && (
        <div className="md:hidden px-6 pb-4 flex flex-col gap-3 border-t border-surface-100 dark:border-surface-800">
          {links.map(link => (
            <NavLink
              key={link.to}
              to={link.to}
              onClick={() => setMenuOpen(false)}
              className="text-sm font-medium text-surface-600 dark:text-surface-300 py-1"
            >
              {link.label}
            </NavLink>
          ))}
          <button
            onClick={() => setDark(!dark)}
            aria-label="Alternar tema"
            className="p-2 rounded-lg text-surface-400 hover:text-surface-700 dark:hover:text-surface-200 hover:bg-surface-100 dark:hover:bg-surface-800 transition-colors"
          >
            {dark ? <FiSun size={16} /> : <FiMoon size={16} />}
          </button>
          <LangSelector />
        </div>
      )}
    </nav>
  )
}