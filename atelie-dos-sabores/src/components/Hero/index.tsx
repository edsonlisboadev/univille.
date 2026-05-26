import { useRef } from 'react'
import { useScrollParallax } from '../../hooks/useScrollParallax'
import styles from './Hero.module.css'

const WHATSAPP = 'https://wa.me/5547992871152?text=Olá!%20Vim%20pelo%20site%20e%20gostaria%20de%20fazer%20um%20pedido.'

export default function Hero() {
  const decorRef = useRef<HTMLDivElement>(null)
  const { translateY, rotate } = useScrollParallax(decorRef as React.RefObject<HTMLElement>, 0.1)

  return (
    <section className={styles.hero}>
      {/* Decorative blobs */}
      <div className={styles.blob1} />
      <div className={styles.blob2} />

      <div className={`container ${styles.inner}`}>
        {/* Text column */}
        <div className={styles.textCol}>
          <span className={styles.eyebrow}>Joinville · Jardim Iririu</span>

          <h1 className={styles.title}>
            <span className={styles.titleLine1}>Ateliê</span>
            <span className={styles.titleLine2}>dos Sabores</span>
          </h1>

          <p className={styles.tagline}>
            Salgados artesanais, brigadeiros gourmet<br />
            e kits festa feitos com amor.
          </p>

          <div className={styles.ctas}>
            <a href={WHATSAPP} target="_blank" rel="noreferrer" className={styles.btnPrimary}>
              Fazer Pedido
            </a>
            <a href="#salgados" className={styles.btnOutline}>
              Ver Cardápio
            </a>
          </div>
        </div>

        {/* Decorative image / illustration column */}
        <div
          className={styles.imageCol}
          ref={decorRef}
          style={{ transform: `translateY(${translateY}px) rotate(${rotate * 0.3}deg)` }}
        >
          <div className={styles.imagePlaceholder}>
            <div className={styles.plateRing} />
            <div className={styles.plateInner}>
              <div className={styles.plateInner}>
              <img
                src="/img/torta.png"
                alt="Salgados artesanais"
                className={styles.plateImage}/>
                </div>
            </div>
          </div>

          {/* Floating badges */}
          <div className={`${styles.badge} ${styles.badgeTop}`}>
            <span>✦</span> Feito artesanalmente
          </div>
          <div className={`${styles.badge} ${styles.badgeBottom}`}>
            <span>✦</span> Entregamos em Joinville
          </div>
        </div>
      </div>

      {/* Scroll hint */}
      <div className={styles.scrollHint}>
        <span />
      </div>
    </section>
  )
}
