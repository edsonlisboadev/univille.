import styles from './Footer.module.css'

const WHATSAPP = 'https://wa.me/5547992871152'
const INSTAGRAM = 'https://instagram.com/ateliedossabores'

const navLinks = [
  { href: '#salgados', label: 'Salgados' },
  { href: '#brigadeiros', label: 'Brigadeiros' },
  { href: '#kit-festa', label: 'Kit Festa' },
  { href: '#localizacao', label: 'Localização' },
]

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className={styles.footer}>
      <div className="container">
        <div className={styles.top}>
          {/* Brand */}
          <div className={styles.brand}>
            <p className={styles.brandName}>Ateliê dos Sabores</p>
            <p className={styles.brandSub}>
              Feito com amor em Joinville, SC
            </p>
          </div>

          {/* Nav */}
          <nav className={styles.nav}>
            <p className={styles.navLabel}>Cardápio</p>
            <ul>
              {navLinks.map((l) => (
                <li key={l.href}>
                  <a href={l.href}>{l.label}</a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Contact */}
          <div className={styles.contact}>
            <p className={styles.navLabel}>Fale conosco</p>
            <a href={WHATSAPP} target="_blank" rel="noreferrer" className={styles.contactLink}>
              <span>💬</span> WhatsApp
            </a>
            <a href={INSTAGRAM} target="_blank" rel="noreferrer" className={styles.contactLink}>
              <span>📸</span> Instagram
            </a>
            <p className={styles.address}>Jardim Iririu · Joinville, SC</p>
          </div>
        </div>

        <div className={styles.bottom}>
          <p>© {year} Ateliê dos Sabores. Todos os direitos reservados.</p>
          <p className={styles.craft}>Feito artesanalmente com 🧡</p>
        </div>
      </div>
    </footer>
  )
}
