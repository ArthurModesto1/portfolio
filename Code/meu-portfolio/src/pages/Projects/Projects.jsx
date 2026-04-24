import { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { FiGithub, FiExternalLink, FiStar, FiGitBranch } from 'react-icons/fi'

const GITHUB_TOKEN = import.meta.env.VITE_GITHUB_TOKEN

// Mapa de cores por linguagem
const LANG_COLORS = {
  JavaScript: '#f7df1e',
  TypeScript: '#3178c6',
  Python:     '#3572A5',
  Java:       '#b07219',
  HTML:       '#e34c26',
  CSS:        '#563d7c',
  default:    '#6e7681',
}

export default function Projects() {
  const { t } = useTranslation()
  const [repos, setRepos]     = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError]     = useState(null)

  const GITHUB_USER = 'ArthurModesto1'

  useEffect(() => {
    async function fetchRepos() {
      try {
        const headers = GITHUB_TOKEN
          ? { Authorization: `Bearer ${GITHUB_TOKEN}` }
          : {}

        const res = await fetch(
          `https://api.github.com/users/${GITHUB_USER}/repos?sort=updated&per_page=50`,
          { headers }
        )
        if (!res.ok) throw new Error('Falha ao buscar repositórios')
        const data = await res.json()

        // Mostra apenas repos públicos, sem forks
        const filtered = data.filter(r => !r.fork && !r.private)
        setRepos(filtered.slice(0, 9))
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }
    fetchRepos()
  }, [])

  if (loading) return (
    <div className="min-h-screen pt-24 flex items-center justify-center">
      <div className="w-8 h-8 border-2 border-primary-500 border-t-transparent rounded-full animate-spin" />
    </div>
  )

  if (error) return (
    <div className="min-h-screen pt-24 flex items-center justify-center text-red-500">
      Erro: {error}
    </div>
  )

  return (
    <section className="min-h-screen pt-24 pb-16 px-6">
      <div className="max-w-5xl mx-auto">
        <h2 className="font-display text-4xl font-bold mb-2">Projetos</h2>
        <p className="text-surface-500 mb-12">Seleção dos meus trabalhos no GitHub</p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {repos.map(repo => (
            <article key={repo.id} className="card p-5 flex flex-col gap-3 group">

              {/* Ícone + nome */}
              <div className="flex items-start justify-between">
                <h3 className="font-display font-semibold text-sm truncate">
                  {repo.name}
                </h3>
                <div className="flex items-center gap-2 text-surface-400">
                  <a href={repo.html_url} target="_blank" rel="noreferrer"
                    className="hover:text-primary-500 transition-colors" aria-label="Repositório">
                    <FiGithub size={16} />
                  </a>
                  {repo.homepage && (
                    <a href={repo.homepage} target="_blank" rel="noreferrer"
                      className="hover:text-primary-500 transition-colors" aria-label="Demo">
                      <FiExternalLink size={16} />
                    </a>
                  )}
                </div>
              </div>

              {/* Descrição */}
              <p className="text-surface-500 text-sm flex-1 line-clamp-3">
                {repo.description || 'Sem descrição.'}
              </p>

              {/* Linguagem + stars + forks */}
              <div className="flex items-center gap-4 text-xs text-surface-400 pt-2 border-t border-surface-100 dark:border-surface-700">
                {repo.language && (
                  <span className="flex items-center gap-1">
                    <span
                      className="w-2.5 h-2.5 rounded-full"
                      style={{ background: LANG_COLORS[repo.language] || LANG_COLORS.default }}
                    />
                    {repo.language}
                  </span>
                )}
                <span className="flex items-center gap-1">
                  <FiStar size={12} /> {repo.stargazers_count}
                </span>
                <span className="flex items-center gap-1">
                  <FiGitBranch size={12} /> {repo.forks_count}
                </span>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}