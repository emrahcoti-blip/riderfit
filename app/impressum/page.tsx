import Link from 'next/link'
import styles from '../about/about.module.css'

export default function Impressum() {
  return (
    <main className={styles.main}>
      <div className={styles.container}>
        <Link href="/" className={styles.back}>← Back to RiderFit</Link>
        <h1>Impressum</h1>
        <h2>Angaben gemäß § 5 TMG</h2>
        <p>Emrah Coti<br />N.Tesla 85<br />1300 Kumanovo<br />North Macedonia</p>
        <h2>Kontakt</h2>
        <p>E-Mail: hello@riderfit.net</p>
        <h2>Haftungsausschluss</h2>
        <p>RiderFit provides AI-generated gear recommendations for informational purposes only. Always verify safety ratings and product fit before purchasing. Affiliate links are used — we may earn a commission at no extra cost to you.</p>
      </div>
    </main>
  )
}