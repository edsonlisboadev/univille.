import { useRef, useState } from 'react'
import { useReveal } from '../../hooks/useReveal'
import { solicitarOrcamento, OrcamentoPayload } from '../../services/api'
import styles from './KitFestaSection.module.css'

const WHATSAPP_FALLBACK =
  'https://wa.me/5547992871152?text=Olá!%20Quero%20montar%20um%20kit%20festa.'

const kitItens = [
  { emoji: '🎂', texto: 'Bolo personalizado' },
  { emoji: '🍬', texto: 'Docinhos finos' },
  { emoji: '🥐', texto: 'Salgados sortidos' },
  { emoji: '🎁', texto: 'Lembrancinhas' },
  { emoji: '🍫', texto: 'Mesa de doces' },
  { emoji: '✨', texto: 'Decoração temática' },
]

type FormStatus = 'idle' | 'loading' | 'success' | 'error'

export default function KitFestaSection() {
  const titleRef = useRef<HTMLDivElement>(null)
  const formRef = useRef<HTMLDivElement>(null)
  const titleVisible = useReveal(titleRef as React.RefObject<HTMLElement>)
  const formVisible = useReveal(formRef as React.RefObject<HTMLElement>)

  const [status, setStatus] = useState<FormStatus>('idle')
  const [errorMsg, setErrorMsg] = useState('')
  const [form, setForm] = useState<OrcamentoPayload>({
    nome: '',
    telefone: '',
    dataEvento: '',
    observacoes: '',
  })

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!form.nome || !form.telefone || !form.dataEvento) return

    setStatus('loading')
    setErrorMsg('')

    try {
      await solicitarOrcamento(form)
      setStatus('success')
    } catch (err) {
      // API unavailable — graceful fallback to WhatsApp deep-link
      const msg = encodeURIComponent(
        `Olá! Meu nome é ${form.nome}. Quero um orçamento para o dia ${form.dataEvento}. ${form.observacoes ?? ''}`.trim(),
      )
      window.open(`https://wa.me/5547992871152?text=${msg}`, '_blank')
      setStatus('error')
      setErrorMsg('Não foi possível enviar pelo site. Abrindo WhatsApp…')
    }
  }

  return (
    <section id="kit-festa" className={`section-pad ${styles.section}`}>
      <div className="container">
        {/* Header */}
        <div
          ref={titleRef}
          className={`${styles.header} reveal ${titleVisible ? 'visible' : ''}`}
        >
          <span className={styles.label}>Kit Festa Completo</span>
          <h2 className={styles.title}>
            Seu evento dos sonhos,<br />do começo ao fim
          </h2>
          <p className={styles.sub}>
            Planejamos tudo junto com você. Peça um orçamento sem compromisso.
          </p>
        </div>

        <div className={styles.layout}>
          {/* What's included */}
          <div className={styles.includes}>
            <h3 className={styles.includesTitle}>O que pode incluir:</h3>
            <ul className={styles.includesList}>
              {kitItens.map((item) => (
                <li key={item.texto} className={styles.includesItem}>
                  <span className={styles.includesEmoji}>{item.emoji}</span>
                  {item.texto}
                </li>
              ))}
            </ul>
            <div className={styles.includesNote}>
              Atendemos festas infantis, casamentos, chás de bebê, confraternizações e eventos corporativos.
            </div>
          </div>

          {/* Quote form */}
          <div
            ref={formRef}
            className={`${styles.formWrap} reveal ${formVisible ? 'visible' : ''}`}
          >
            {status === 'success' ? (
              <div className={styles.successBox}>
                <span className={styles.successIcon}>🎉</span>
                <h3>Orçamento recebido!</h3>
                <p>Entraremos em contato em até 24 horas pelo seu WhatsApp.</p>
              </div>
            ) : (
              <>
                <h3 className={styles.formTitle}>Solicitar Orçamento</h3>
                <form onSubmit={handleSubmit} className={styles.form} noValidate>
                  <div className={styles.field}>
                    <label htmlFor="nome">Seu nome</label>
                    <input
                      id="nome"
                      name="nome"
                      type="text"
                      placeholder="Maria da Silva"
                      value={form.nome}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className={styles.field}>
                    <label htmlFor="telefone">WhatsApp</label>
                    <input
                      id="telefone"
                      name="telefone"
                      type="tel"
                      placeholder="(47) 9 9999-9999"
                      value={form.telefone}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className={styles.field}>
                    <label htmlFor="dataEvento">Data do evento</label>
                    <input
                      id="dataEvento"
                      name="dataEvento"
                      type="date"
                      value={form.dataEvento}
                      onChange={handleChange}
                      required
                      min={new Date().toISOString().split('T')[0]}
                    />
                  </div>

                  <div className={styles.field}>
                    <label htmlFor="observacoes">Detalhes do evento <span>(opcional)</span></label>
                    <textarea
                      id="observacoes"
                      name="observacoes"
                      rows={3}
                      placeholder="Tema, número de convidados, preferências…"
                      value={form.observacoes}
                      onChange={handleChange}
                    />
                  </div>

                  {errorMsg && (
                    <p className={styles.errorMsg}>{errorMsg}</p>
                  )}

                  <button
                    type="submit"
                    className={styles.submitBtn}
                    disabled={status === 'loading'}
                  >
                    {status === 'loading' ? 'Enviando…' : 'Enviar Pedido de Orçamento'}
                  </button>
                </form>

                <div className={styles.orLine}>
                  <span>ou</span>
                </div>

                <a
                  href={WHATSAPP_FALLBACK}
                  target="_blank"
                  rel="noreferrer"
                  className={styles.waLink}
                >
                  💬 Conversar direto no WhatsApp
                </a>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
