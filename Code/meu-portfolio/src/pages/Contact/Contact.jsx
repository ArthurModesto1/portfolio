import { useState, useRef } from 'react'
import emailjs from 'emailjs-com'
import { useTranslation } from 'react-i18next'
import EMAILJS_CONFIG from '../../config/emailJsConfig'
import { FiSend, FiCheckCircle, FiAlertCircle } from 'react-icons/fi'

export default function Contact() {
  const { t } = useTranslation()
  const formRef = useRef()
  const [status, setStatus] = useState('idle')

  const handleSubmit = (e) => {
    e.preventDefault()
    setStatus('sending')
    const formData = new FormData(formRef.current)
    const nome     = formData.get('from_name')
    const email    = formData.get('reply_to')
    const mensagem = formData.get('message')
    const time     = new Date().toLocaleString()

    emailjs.send(EMAILJS_CONFIG.SERVICE_ID, EMAILJS_CONFIG.TEMPLATE_ID_FOR_ME,
      { name: nome, email, message: mensagem, time }, EMAILJS_CONFIG.PUBLIC_KEY)
      .catch(err => console.error(err))

    emailjs.send(EMAILJS_CONFIG.SERVICE_ID, EMAILJS_CONFIG.TEMPLATE_ID_FOR_SENDER,
      { name: nome, message: mensagem, time }, EMAILJS_CONFIG.PUBLIC_KEY)
      .then(() => { setStatus('success'); formRef.current.reset() })
      .catch(() => setStatus('error'))
  }

  const inputClass = `
    w-full px-4 py-3 rounded-lg border border-surface-200
    bg-white text-surface-800 placeholder-surface-400
    focus:outline-none focus:ring-2 focus:ring-primary-400 focus:border-transparent
    transition-all duration-200 text-sm
  `

  return (
    <section className="min-h-screen pt-24 pb-16 px-6">
      <div className="max-w-xl mx-auto">

        <h2 className="font-display text-4xl font-bold mb-2">{t('contact.title')}</h2>
        <p className="text-surface-500 mb-10">Vou responder o mais rápido possível.</p>

        {/* Feedback de status */}
        {status === 'success' && (
          <div className="flex items-center gap-2 mb-6 px-4 py-3 bg-green-50 border border-green-200 text-green-700 rounded-lg text-sm">
            <FiCheckCircle size={16} /> {t('contact.success')}
          </div>
        )}
        {status === 'error' && (
          <div className="flex items-center gap-2 mb-6 px-4 py-3 bg-red-50 border border-red-200 text-red-700 rounded-lg text-sm">
            <FiAlertCircle size={16} /> {t('contact.error')}
          </div>
        )}

        <form ref={formRef} onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-surface-600">{t('contact.name')}</label>
            <input
              type="text" name="from_name" placeholder="Seu nome completo"
              required className={inputClass}
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-surface-600">{t('contact.email')}</label>
            <input
              type="email" name="reply_to" placeholder="seu@email.com"
              required className={inputClass}
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-surface-600">{t('contact.message')}</label>
            <textarea
              name="message" rows={5}
              placeholder="Escreva sua mensagem..."
              required className={inputClass + ' resize-none'}
            />
          </div>

          <button
            type="submit"
            disabled={status === 'sending'}
            className="btn-primary flex items-center justify-center gap-2 mt-2 disabled:opacity-60 disabled:cursor-not-allowed"
          >
            <FiSend size={15} />
            {status === 'sending' ? 'Enviando...' : t('contact.send')}
          </button>
        </form>
      </div>
    </section>
  )
}