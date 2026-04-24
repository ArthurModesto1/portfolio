import { useTranslation } from 'react-i18next'

export default function Experience() {
  const { t } = useTranslation()

  return (
    <section className="min-h-screen pt-24 px-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">
          {t('experience.title', 'Experiência')}
        </h1>

        <p className="text-surface-600 dark:text-surface-300">
          Aqui você poderá adicionar uma timeline com suas experiências profissionais.
        </p>
      </div>
    </section>
  )
}