import { useRef } from 'react'
import { useReveal } from '../../hooks/useReveal'
import { useScrollParallax } from '../../hooks/useScrollParallax'
import styles from './BrigadeiroSection.module.css'

const WHATSAPP = 'https://wa.me/5547992871152?text=Olá!%20Quero%20encomendar%20brigadeiros%20gourmet!'

interface Brigadeiro {
  emoji: string
  nome: string
  descricao: string
  cor: string
}

const brigadeiros: Brigadeiro[] = [
  {
    emoji: '🍫',
    nome: 'Belga Tradicional',
    descricao: 'Chocolate belga 70% cacau, manteiga de garrafa, cobertura de granulado importado.',
    cor: '#3d1a0e',
  },
  {
    emoji: '🫐',
    nome: 'Mirtilo com Baunilha',
    descricao: 'Creme de baunilha bourbon com coulis de mirtilo fresco. Delicado e surpreendente.',
    cor: '#4a2060',
  },
  {
    emoji: '🍓',
    nome: 'Morango com Ninho',
    descricao: 'Leite ninho cremoso com pedaços de morango natural. Favorito entre as crianças.',
    cor: '#8b1a2e',
  },
  {
    emoji: '🥜',
    nome: 'Pistache Verde',
    descricao: 'Pasta de pistache importado, textura aveludada, cobertura de pistache moído.',
    cor: '#3a5c2e',
  },
  {
    emoji: '🍋',
    nome: 'Limão Siciliano',
    descricao: 'Zest de limão siciliano, chocolate branco, finalizado com raspas cristalizadas.',
    cor: '#5a5a10',
  },
  {
    emoji: '🌹',
    nome: 'Champagne com Rosa',
    descricao: 'Ganache de champagne brut, pétalas de rosa cristalizadas, para ocasiões especiais.',
    cor: '#6b2a40',
  },
]

export default function BrigadeiroSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const titleRef = useRef<HTMLDivElement>(null)
  const decorRef = useRef<HTMLDivElement>(null)
  const titleVisible = useReveal(titleRef as React.RefObject<HTMLElement>)
  const { translateY } = useScrollParallax(decorRef as React.RefObject<HTMLElement>, 0.08)

  return (
    <section id="brigadeiros" className={`section-pad ${styles.section}`} ref={sectionRef}>
      {/* Background decoration */}
      <div
        ref={decorRef}
        className={styles.bgDecor}
        style={{ transform: `translateY(${translateY}px)` }}
      />

      <div className="container">
        <div
          ref={titleRef}
          className={`${styles.header} reveal ${titleVisible ? 'visible' : ''}`}
        >
          <span className={styles.label}>Brigadeiros Gourmet</span>
          <h2 className={styles.title}>
            Uma explosão de sabor<br />em cada mordida
          </h2>
          <p className={styles.sub}>
            Ingredientes selecionados, receitas autorais. Embalagem para presente inclusa.
          </p>
        </div>

        <div className={styles.grid}>
          {brigadeiros.map((b, i) => (
            <BrigadeiroItem key={b.nome} item={b} delay={i * 90} />
          ))}
        </div>

        <div className={styles.cta}>
          <div className={styles.ctaText}>
            <strong>Caixas personalizadas</strong> para casamentos, aniversários e eventos corporativos
          </div>
          <a href={WHATSAPP} target="_blank" rel="noreferrer" className={styles.ctaBtn}>
            Montar Minha Caixa
          </a>
        </div>
      </div>
    </section>
  )
}

function BrigadeiroItem({ item, delay }: { item: Brigadeiro; delay: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const visible = useReveal(ref as React.RefObject<HTMLElement>)

  return (
    <div
      ref={ref}
      className={`${styles.item} reveal ${visible ? 'visible' : ''}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      <div
        className={styles.itemBall}
        style={{ background: `radial-gradient(circle at 35% 35%, ${item.cor}cc, ${item.cor})` }}
      >
        <span className={styles.itemEmoji}>{item.emoji}</span>
      </div>
      <h3 className={styles.itemName}>{item.nome}</h3>
      <p className={styles.itemDesc}>{item.descricao}</p>
    </div>
  )
}
