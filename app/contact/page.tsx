import Link from 'next/link'
import styles from './contact.module.css'

export default function Contact() {
  return (
    <main className={styles.main}>
      <div className={styles.container}>
        <Link href="/" className={styles.back}>← Back to RiderFit</Link>
        <h1>Contact</h1>
        <p>For questions, partnership enquiries, or feedback about RiderFit, please get in touch:</p>
        <p><strong>Email:</strong> <a href="mailto:hello@riderfit.net" style={{color:'#D85A30'}}>hello@riderfit.net</a></p>
        <p>We typically respond within 1–2 business days.</p>
        <h2>Affiliate partnerships</h2>
        <p>If you represent a motorcycle gear retailer and are interested in being featured on RiderFit, please reach out via the email above.</p>
      </div>
    </main>
  )
}
