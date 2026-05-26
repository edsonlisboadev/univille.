import { useRef } from 'react'
import { useReveal } from '../../hooks/useReveal'
import styles from './SalgadosSection.module.css'

const WHATSAPP_BASE = 'https://wa.me/5547999999999?text='

interface Salgado {
  emoji: string
  nome: string
  descricao: string
  preco: string
  minimo: string
}

const salgados: Salgado[] = [
  {
    emoji: '🥐',
    nome: 'Mini Croissant',
    descricao: 'Recheados com queijo e presunto, massa folhada artesanal, dourados na medida certa.',
    preco: 'R$ 4,50',
    minimo: 'mín. 20 un.',
  },
  {
    emoji: '🫓',
    nome: 'Enroladinho de Salsicha',
    descricao: 'Massa caseira fofinha envolvendo salsicha temperada. Clássico que nunca decepciona.',
    preco: 'R$ 3,00',
    minimo: 'mín. 30 un.',
  },
  {
    emoji: '🧆',
    nome: 'Coxinha de Frango',
    descricao: 'Frango desfiado com catupiry, empanamento crocante dourado no forno.',
    preco: 'R$ 5,50',
    minimo: 'mín. 20 un.',
  },
  {
    emoji: '🥙',
    nome: 'Tortinha de Frango',
    descricao: 'Massa amanteigada crocante, recheio cremoso de frango com requeijão e ervas.',
    preco: 'R$ 6,00',
    minimo: 'mín. 15 un.',
  },
  {
    emoji: '🫔',
    nome: 'Pão de Queijo Recheado',
    descricao: 'Tradicional mineiro com recheio de mussarela derretida. Assado, sem fritar.',
    preco: 'R$ 4,00',
    minimo: 'mín. 25 un.',
  },
  {
    emoji: '🥨',
    nome: 'Palito de Queijo',
    descricao: 'Palitos crocantes de massa folhada com parmesão, perfeitos para festas e eventos.',
    preco: 'R$ 2,50',
    minimo: 'mín. 40 un.',
  },
]

function SalgadoCard({ salgado, delay }: { salgado: Salgado; delay: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const visible = useReveal(ref as React.RefObject<HTMLElement>)
  const msg = encodeURIComponent(`Olá! Quero pedir ${salgado.nome}. Pode me passar mais informações?`)

  return (
    <div
      ref={ref}
      className={`${styles.card} reveal ${visible ? 'visible' : ''}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      <div className={styles.cardEmoji}>{salgado.emoji}</div>
      <div className={styles.cardBody}>
        <h3 className={styles.cardName}>{salgado.nome}</h3>
        <p className={styles.cardDesc}>{salgado.descricao}</p>
        <div className={styles.cardFooter}>
          <div className={styles.priceBlock}>
            <span className={styles.price}>{salgado.preco}</span>
            <span className={styles.minimo}>{salgado.minimo}</span>
          </div>
          <a
            href={`${WHATSAPP_BASE}${msg}`}
            target="_blank"
            rel="noreferrer"
            className={styles.cardBtn}
          >
            Pedir
          </a>
        </div>
      </div>
    </div>
  )
}

export default function SalgadosSection() {
  const titleRef = useRef<HTMLDivElement>(null)
  const titleVisible = useReveal(titleRef as React.RefObject<HTMLElement>)

  return (
    <section id="salgados" className={`section-pad ${styles.section}`}>
      <div className="container">
        <div
          ref={titleRef}
          className={`${styles.header} reveal ${titleVisible ? 'visible' : ''}`}
        >
          <span className={styles.label}>Salgados Assados</span>
          <h2 className={styles.title}>
            Crocantes por fora,<br />cremosos por dentro
          </h2>
          <p className={styles.sub}>
            Todos assados — nunca fritos — com ingredientes frescos e sem conservantes.
          </p>
        </div>

        <div className={styles.grid}>
          {salgados.map((s, i) => (
            <SalgadoCard key={s.nome} salgado={s} delay={i * 80} />
          ))}
        </div>
      </div>
    </section>
  )
}
