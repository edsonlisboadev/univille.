import { useRef } from 'react'
import { useReveal } from '../../hooks/useReveal'
import styles from './Localizacao.module.css'

const MAPS_URL = 'https://maps.google.com/?q=Jardim+Iririu,+Joinville,+SC'
const WHATSAPP = 'https://wa.me/5547992871152?text=Olá!%20Gostaria%20de%20combinar%20uma%20retirada.'

const diferenciais = [
  { emoji: '🧁', titulo: 'Produção artesanal', texto: 'Pequenos lotes para garantir qualidade máxima em cada encomenda.' },
  { emoji: '🌿', titulo: 'Sem conservantes', texto: 'Ingredientes frescos, sem aditivos químicos. Feito na hora, com sabor real.' },
  { emoji: '🎀', titulo: 'Embalagem premium', texto: 'Apresentação impecável — chegam prontos para presentear.' },
  { emoji: '⏱️', titulo: 'Pontualidade', texto: 'Pedidos entregues ou prontos para retirada no horário combinado.' },
]

export default function Localizacao() {
  const titleRef = useRef<HTMLDivElement>(null)
  const cardsRef = useRef<HTMLDivElement>(null)
  const mapRef = useRef<HTMLDivElement>(null)
  const titleVisible = useReveal(titleRef as React.RefObject<HTMLElement>)
  const cardsVisible = useReveal(cardsRef as React.RefObject<HTMLElement>)
  const mapVisible = useReveal(mapRef as React.RefObject<HTMLElement>)

  return (
    <section id="localizacao" className={`section-pad ${styles.section}`}>
      <div className="container">
        {/* Header */}
        <div
          ref={titleRef}
          className={`${styles.header} reveal ${titleVisible ? 'visible' : ''}`}
        >
          <span className={styles.label}>Localização & Retirada</span>
          <h2 className={styles.title}>Feito aqui em Joinville,<br />para Joinville</h2>
        </div>

        {/* Diferenciais */}
        <div
          ref={cardsRef}
          className={`${styles.diferenciais} reveal ${cardsVisible ? 'visible' : ''}`}
        >
          {diferenciais.map((d, i) => (
            <div key={d.titulo} className={styles.card} style={{ transitionDelay: `${i * 100}ms` }}>
              <span className={styles.cardEmoji}>{d.emoji}</span>
              <h3 className={styles.cardTitle}>{d.titulo}</h3>
              <p className={styles.cardText}>{d.texto}</p>
            </div>
          ))}
        </div>

        {/* Map + info */}
        <div
          ref={mapRef}
          className={`${styles.mapRow} reveal ${mapVisible ? 'visible' : ''}`}
        >
          {/* Map embed placeholder */}
          <div className={styles.mapBox}>
            <iframe
              title="Localização Ateliê dos Sabores"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3556.6!2d-48.8!3d-26.3!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2sJardim+Iririu%2C+Joinville%2C+SC!5e0!3m2!1spt-BR!2sbr!4v1"
              width="100%"
              height="100%"
              style={{ border: 0, filter: 'sepia(0.15) saturate(1.1)' }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>

          {/* Info */}
          <div className={styles.infoBox}>
            <div className={styles.infoItem}>
              <span className={styles.infoIcon}>📍</span>
              <div>
                <strong>Endereço</strong>
                <p>Jardim Iririu — Joinville, SC</p>
                <p className={styles.infoSub}>Retirada no local ou entrega combinada</p>
              </div>
            </div>

            <div className={styles.infoItem}>
              <span className={styles.infoIcon}>🕐</span>
              <div>
                <strong>Horário de atendimento</strong>
                <p>Seg – Sex: 8h às 18h</p>
                <p>Sáb: 8h às 14h</p>
              </div>
            </div>

            <div className={styles.infoItem}>
              <span className={styles.infoIcon}>📦</span>
              <div>
                <strong>Pedido mínimo com entrega</strong>
                <p>A partir de R$ 80,00</p>
                <p className={styles.infoSub}>Consulte taxa para seu bairro</p>
              </div>
            </div>

            <div className={styles.infoCtas}>
              <a href={MAPS_URL} target="_blank" rel="noreferrer" className={styles.btnMap}>
                Ver no Google Maps
              </a>
              <a href={WHATSAPP} target="_blank" rel="noreferrer" className={styles.btnWa}>
                Combinar retirada
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
