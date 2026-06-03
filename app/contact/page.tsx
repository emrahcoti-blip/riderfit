import Link from 'next/link'
import styles from './contact.module.css'

export default function Contact() {
  return (
    <main className={styles.main}>
      <div className={styles.container}>
        <Link href="/" className={styles.back}>Back to RiderFit</Link>
        <h1>Contact</h1>
        <p>For questions or feedback about RiderFit, please get in touch.</p>
        <p><strong>Email:</strong> hello@riderfit.net</p>
        <h2>Affiliate partnerships</h2>
        <p>If you represent a motorcycle gear retailer interested in being featured, reach out via email.</p>
      </div>
    </main>
  )
}
