'use client'

import { useState } from 'react'
import styles from './page.module.css'

type GearItem = {
  category: string
  name: string
  why: string
  price: string
  safetyRating: string
  searchQuery: string
}

type Result = {
  summary: string
  totalEstimate: string
  items: GearItem[]
}

const STYLES = ['Sport / aggressive', 'Street / commuting', 'Touring / long distance', 'Adventure / off-road', 'Track days']
const EXPERIENCE = ['Beginner (under 1 year)', 'Intermediate (1–5 years)', 'Advanced (5+ years)']
const CLIMATES = ['Hot and dry (Mediterranean / Balkans)', 'Temperate (Central Europe)', 'Cold and wet (Northern Europe)', 'Mixed seasons']
const BUDGETS = ['Under €500', '€500–€1,000', '€1,000–€2,000', '€2,000+']
const GENDERS = ['Male rider', 'Female rider']
const PRIORITIES = ['Safety / protection', 'Comfort', 'Looks / style', 'Ventilation', 'Waterproofing', 'Lightweight']

const CATEGORY_EMOJI: Record<string, string> = {
  Helmet: '🪖', Jacket: '🧥', Gloves: '🧤', Boots: '👢', Pants: '👖'
}

export default function Home() {
  const [rideStyle, setRideStyle] = useState('Sport / aggressive')
  const [gender, setGender] = useState('Male rider')
  const [experience, setExperience] = useState('Intermediate (1–5 years)')
  const [climate, setClimate] = useState('Hot and dry (Mediterranean / Balkans)')
  const [budget, setBudget] = useState('€500–€1,000')
  const [bike, setBike] = useState('')
  const [priorities, setPriorities] = useState<string[]>(['Safety / protection', 'Comfort'])
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<Result | null>(null)
  const [error, setError] = useState('')

  const togglePriority = (p: string) => {
    setPriorities(prev => prev.includes(p) ? prev.filter(x => x !== p) : [...prev, p])
  }

  const getRecommendation = async () => {
    setLoading(true)
    setError('')
    setResult(null)
    try {
      const res = await fetch('/api/recommend', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ style: rideStyle, experience, climate, budget, bike, priorities,gender }),
      })
      const data = await res.json()
      if (data.error) throw new Error(data.error)
      setResult(data)
    } catch {
      setError('Something went wrong. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const affiliateUrl = (query: string) =>
    `https://www.fc-moto.de/en/search?q=${encodeURIComponent(query)}`

  return (
    <main className={styles.main}>
      <header className={styles.header}>
        <div className={styles.logo}>
          <img src="/logo.png" alt="RiderFit" style={{height: '70px', width: 'auto'}} />
        </div>
      </header>

      <div className={styles.container}>
        {!result && !loading && (
          <div className={styles.form}>
            <div className={styles.intro}> <div className={styles.field}>
  <label className={styles.label}>I am a</label>
  <div className={styles.chips}>
    {GENDERS.map(g => (
      <button key={g} className={`${styles.chip} ${gender === g ? styles.active : ''}`} onClick={() => setGender(g)}>{g}</button>
    ))}
  </div>
</div>
              <h2>Find your perfect gear setup</h2>
              <p>Tell us how you ride — we'll build a full kit recommendation matched to your style, climate, and budget.</p>
            </div>

            <div className={styles.field}>
              <label className={styles.label}>Riding style</label>
              <div className={styles.chips}>
                {STYLES.map(s => (
                  <button key={s} className={`${styles.chip} ${rideStyle === s ? styles.active : ''}`} onClick={() => setRideStyle(s)}>{s}</button>
                ))}
              </div>
            </div>

            <div className={styles.field}>
              <label className={styles.label}>Experience level</label>
              <div className={styles.chips}>
                {EXPERIENCE.map(e => (
                  <button key={e} className={`${styles.chip} ${experience === e ? styles.active : ''}`} onClick={() => setExperience(e)}>{e}</button>
                ))}
              </div>
            </div>

            <div className={styles.row}>
              <div className={styles.field}>
                <label className={styles.label}>Climate</label>
                <select className={styles.select} value={climate} onChange={e => setClimate(e.target.value)}>
                  {CLIMATES.map(c => <option key={c}>{c}</option>)}
                </select>
              </div>
              <div className={styles.field}>
                <label className={styles.label}>Budget (full setup)</label>
                <select className={styles.select} value={budget} onChange={e => setBudget(e.target.value)}>
                  {BUDGETS.map(b => <option key={b}>{b}</option>)}
                </select>
              </div>
            </div>

            <div className={styles.field}>
              <label className={styles.label}>Your bike <span className={styles.optional}>(optional)</span></label>
              <input className={styles.input} type="text" placeholder="e.g. Ducati Streetfighter V4, Yamaha MT-07..." value={bike} onChange={e => setBike(e.target.value)} />
            </div>

            <div className={styles.field}>
              <label className={styles.label}>Priorities <span className={styles.optional}>(select all that matter)</span></label>
              <div className={styles.chips}>
                {PRIORITIES.map(p => (
                  <button key={p} className={`${styles.chip} ${priorities.includes(p) ? styles.active : ''}`} onClick={() => togglePriority(p)}>{p}</button>
                ))}
              </div>
            </div>

            <button className={styles.cta} onClick={getRecommendation}>
              Get my gear recommendation →
            </button>
          </div>
        )}

        {loading && (
          <div className={styles.loading}>
            <div className={styles.spinner} />
            <p>Building your setup...</p>
          </div>
        )}

        {error && (
          <div className={styles.error}>
            <p>{error}</p>
            <button className={styles.reset} onClick={() => setError('')}>Try again</button>
          </div>
        )}

        {result && (
          <div className={styles.results}>
            <div className={styles.summary}>
              <p>{result.summary}</p>
              <div className={styles.total}>Estimated total: <strong>{result.totalEstimate}</strong></div>
            </div>

            <h3 className={styles.sectionTitle}>Your recommended setup</h3>

            {result.items.map(item => (
              <div key={item.category} className={styles.card}>
                <div className={styles.cardHeader}>
                  <span className={styles.cardEmoji}>{CATEGORY_EMOJI[item.category] || '🏍️'}</span>
                  <div>
                    <div className={styles.cardCat}>{item.category}</div>
                    <div className={styles.cardName}>{item.name}</div>
                  </div>
                </div>
                <p className={styles.cardWhy}>{item.why}</p>
                {item.safetyRating && (
                  <div className={styles.safetyBadge}>✓ {item.safetyRating}</div>
                )}
                <div className={styles.cardFooter}>
                  <span className={styles.cardPrice}>{item.price}</span>
                  <a href={affiliateUrl(item.searchQuery)} target="_blank" rel="noopener noreferrer" className={styles.buyBtn}>
                    Shop on Fc-Moto →
                  </a>
                </div>
              </div>
            ))}

            <button className={styles.reset} onClick={() => setResult(null)}>
              ← Start over
            </button>

            <p className={styles.disclaimer}>
              Links above are affiliate links. RiderFit earns a small commission if you purchase, at no extra cost to you.
            </p>
          </div>
        )}
      </div>

      <footer className={styles.footer}>
        <p>© 2026 RiderFit · <a href="/about">About</a> · <a href="/contact">Contact</a> · <a href="/impressum">Impressum</a></p>
        <p className={styles.footerSub}>Gear recommendations powered by AI. Always verify fit and safety ratings before purchase.</p>
      </footer>
    </main>
  )
}
