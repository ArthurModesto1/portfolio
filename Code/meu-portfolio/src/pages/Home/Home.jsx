import { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'

function useTypewriter(words, speed = 80, pause = 2000) {
  const [text, setText]         = useState('')
  const [wordIdx, setWordIdx]   = useState(0)
  const [charIdx, setCharIdx]   = useState(0)
  const [deleting, setDeleting] = useState(false)

  useEffect(() => {
    const current = words[wordIdx]
    const delay = deleting ? speed / 2 : speed

    const timer = setTimeout(() => {
      if (!deleting && charIdx < current.length) {
        setText(current.slice(0, charIdx + 1))
        setCharIdx(c => c + 1)
      } else if (!deleting && charIdx === current.length) {
        setTimeout(() => setDeleting(true), pause)
      } else if (deleting && charIdx > 0) {
        setText(current.slice(0, charIdx - 1))
        setCharIdx(c => c - 1)
      } else {
        setDeleting(false)
        setWordIdx(i => (i + 1) % words.length)
      }
    }, delay)

    return () => clearTimeout(timer)
  }, [charIdx, deleting, wordIdx, words, speed, pause])

  return text
}

export default function Home() {
  const { t } = useTranslation()
  const roles = t('hero.roles', { returnObjects: true })
  const typedText = useTypewriter(roles)

  return (
    <section className="px-6 pb-24">

      {/* Primeira tela: terminal centralizado usando calc para descontar a navbar */}
      <div
        className="flex flex-col items-center justify-center"
        style={{ minHeight: 'calc(100vh - 64px)', paddingTop: '64px' }}
      >
        <div className="max-w-3xl w-full">

          {/* Terminal */}
          <div className="bg-surface-800 dark:bg-surface-900 rounded-xl overflow-hidden shadow-2xl shadow-surface-900/20 border border-surface-700">
            <div className="flex items-center gap-2 px-4 py-3 bg-surface-700/50 border-b border-surface-700">
              <span className="w-3 h-3 rounded-full bg-red-500/80" />
              <span className="w-3 h-3 rounded-full bg-yellow-500/80" />
              <span className="w-3 h-3 rounded-full bg-green-500/80" />
              <span className="ml-3 text-xs text-surface-400 font-mono">meu-portfolio.sh</span>
            </div>

            <div className="p-8 font-mono">
              <p className="text-surface-400 text-sm mb-1">
                <span className="text-green-400">~/dev</span>
                <span className="text-surface-500"> $ </span>
                whoami
              </p>

              <h1 className="text-2xl md:text-5xl font-display font-bold text-white mb-2 whitespace-nowrap">
                {t('hero.greeting')} <span className="text-primary-400">Arthur Modesto</span>
              </h1>

              <div className="flex items-center gap-1 text-xl md:text-2xl text-surface-300 min-h-[2rem] mb-8">
                <span>&gt;</span>
                <span className="text-primary-300">{typedText}</span>
                <span className="w-0.5 h-6 bg-primary-400 animate-blink ml-0.5" />
              </div>

              <div className="flex flex-wrap gap-3">
                <Link to="/projetos" className="btn-primary font-sans">{t('hero.cta')}</Link>
                <Link to="/contato"  className="btn-outline font-sans">{t('hero.ctaSub')}</Link>
              </div>
            </div>
          </div>

          {/* Scroll indicator */}
          <div className="flex justify-center mt-12">
            <a
              href="#highlights"
              className="flex flex-col items-center gap-2 text-surface-400 text-sm animate-bounce hover:text-primary-400 transition-colors"
            >
              <span>scroll</span>
              <span>↓</span>
            </a>
          </div>
        </div>
      </div>

      {/* Segunda tela: cards de navegação + tecnologias */}
      <div id="highlights" className="max-w-3xl mx-auto mt-4 pb-8">
        <p className="text-center text-surface-400 text-xs uppercase tracking-widest font-mono mb-10">
          Explore o portfólio
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {[
            { to: '/sobre',       emoji: '👤', title: 'Sobre Mim',    desc: 'Quem sou, o que faço e o que me motiva' },
            { to: '/experiencia', emoji: '💼', title: 'Experiências', desc: 'Trajetória acadêmica e profissional' },
            { to: '/projetos',    emoji: '🚀', title: 'Projetos',     desc: 'Trabalhos no GitHub e demos ao vivo' },
            { to: '/contato',     emoji: '✉️', title: 'Contato',      desc: 'Bora conversar sobre uma ideia?' },
          ].map(({ to, emoji, title, desc }) => (
            <Link
              key={to} to={to}
              className="group card p-5 flex items-start gap-4 hover:border-primary-300 hover:-translate-y-1 transition-all duration-200"
            >
              <span className="text-2xl">{emoji}</span>
              <div>
                <p className="font-display font-semibold text-surface-800 dark:text-surface-100 group-hover:text-primary-500 transition-colors">
                  {title}
                </p>
                <p className="text-surface-400 text-sm mt-0.5">{desc}</p>
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-12 text-center">
          <p className="text-surface-400 text-xs uppercase tracking-widest font-mono mb-5">
            Tecnologias que uso
          </p>
          <div className="flex flex-wrap justify-center gap-2">
            {['React', 'JavaScript', 'TypeScript', 'Node.js', 'Python', 'Git', 'TailwindCSS'].map(tech => (
              <span
                key={tech}
                className="px-4 py-1.5 rounded-full border border-surface-200 dark:border-surface-700 text-surface-500 dark:text-surface-400 text-sm font-mono hover:border-primary-400 hover:text-primary-500 transition-colors duration-200 cursor-default"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </div>

    </section>
  )
}