import { useState, useEffect, useCallback } from 'react'
import './index.css'
import Header from './components/Header'
import CitySelector from './components/CitySelector'
import PrayerList from './components/PrayerList'
import Skeleton from './components/Skeleton'

const PRAYERS = [
  { key: 'Fajr',    label: 'Fajr'    },
  { key: 'Sunrise', label: 'Sunrise' },
  { key: 'Dhuhr',   label: 'Dhuhr'   },
  { key: 'Asr',     label: 'Asr'     },
  { key: 'Maghrib', label: 'Maghrib' },
  { key: 'Isha',    label: 'Isha'    },
]

function toMins(timeStr) {
  const [h, m] = timeStr.split(':').map(Number)
  return h * 60 + m
}

function getNextPrayer(timings) {
  const now = new Date()
  const nowMins = now.getHours() * 60 + now.getMinutes()
  for (const p of PRAYERS) {
    if (timings[p.key] && toMins(timings[p.key]) > nowMins) {
      return p.key
    }
  }
  return null // all prayers done for today
}

function getCountdown(timeStr) {
  if (!timeStr) return '--'
  const now = new Date()
  const nowMins = now.getHours() * 60 + now.getMinutes()
  let diff = toMins(timeStr) - nowMins
  if (diff < 0) diff += 24 * 60
  const h = Math.floor(diff / 60)
  const m = diff % 60
  return h > 0 ? `${h}h ${m}m` : `${m}m`
}

function getProgress(prevTime, nextTime) {
  if (!prevTime || !nextTime) return 0
  const now = new Date()
  const nowMins = now.getHours() * 60 + now.getMinutes()
  const prev = toMins(prevTime)
  const next = toMins(nextTime)
  const total = next - prev
  const elapsed = nowMins - prev
  return Math.min(100, Math.max(0, Math.round((elapsed / total) * 100)))
}

function App() {
  const [city, setCity]         = useState('Kuala Lumpur')
  const [timings, setTimings]   = useState({})
  const [hijri, setHijri]       = useState('')
  const [gregDate, setGregDate] = useState('')
  const [loading, setLoading]   = useState(true)
  const [error, setError]       = useState('')
  const [countdown, setCountdown] = useState('--')

  // useCallback so fetchData can be called both by
  // useEffect AND by the retry button
  const fetchData = useCallback(() => {
    setLoading(true)
    setError('')

    const today = new Date()
    const dd   = String(today.getDate()).padStart(2, '0')
    const mm   = String(today.getMonth() + 1).padStart(2, '0')
    const yyyy = today.getFullYear()

    fetch(
      `https://api.aladhan.com/v1/timingsByCity/${dd}-${mm}-${yyyy}?city=${encodeURIComponent(city)}&country=Malaysia&method=3`
    )
      .then(r => r.json())
      .then(data => {
        if (data.code !== 200) throw new Error('Failed')
        setTimings(data.data.timings)
        setHijri(
          `${data.data.date.hijri.day} ${data.data.date.hijri.month.en} ${data.data.date.hijri.year} AH`
        )
        setGregDate(data.data.date.readable)
        setLoading(false)
      })
      .catch(() => {
        setError('Could not load prayer times. Check your connection.')
        setLoading(false)
      })
  }, [city])

  // Fetch on city change
  useEffect(() => {
    fetchData()
  }, [fetchData])

  // Live countdown every 30 seconds
  useEffect(() => {
    if (!timings || Object.keys(timings).length === 0) return
    const next = getNextPrayer(timings)
    if (next) setCountdown(getCountdown(timings[next]))

    const interval = setInterval(() => {
      const n = getNextPrayer(timings)
      if (n) setCountdown(getCountdown(timings[n]))
    }, 30000)

    return () => clearInterval(interval)
  }, [timings])

  // Derived values
  const nextPrayer = Object.keys(timings).length ? getNextPrayer(timings) : '...'
  const nextIndex  = PRAYERS.findIndex(p => p.key === nextPrayer)
  const prevPrayer = nextIndex > 0 ? PRAYERS[nextIndex - 1] : PRAYERS[0]
  const prevTime   = timings[prevPrayer?.key] ?? ''
  const nextTime   = timings[nextPrayer]      ?? ''
  const progress   = getProgress(prevTime, nextTime)
  const allDone    = Object.keys(timings).length > 0 && !nextPrayer

  return (
    <div className="app">
      <Header
        city={city}
        nextPrayer={allDone ? 'All done!' : nextPrayer}
        countdown={allDone ? 'Fajr tomorrow' : countdown}
        progress={allDone ? 100 : progress}
        prevPrayer={prevPrayer?.label ?? ''}
        prevTime={prevTime}
        nextTime={nextTime}
        hijri={hijri}
      />

      <div className="body">
        <CitySelector city={city} onCityChange={setCity} />

        {/* Loading skeleton */}
        {loading && <Skeleton />}

        {/* Error + retry */}
        {error && (
          <>
            <p className="error">{error}</p>
            <button className="retry-btn" onClick={fetchData}>
              Try again
            </button>
          </>
        )}

        {/* All prayers done for today */}
        {allDone && (
          <div className="all-done">
            <span>🌙</span>
            All prayers completed for today.<br />
            Fajr tomorrow at {timings['Fajr']}
          </div>
        )}

        {/* Prayer list */}
        {!loading && !error && !allDone && (
          <>
            <PrayerList timings={timings} nextPrayer={nextPrayer} />
            <div className="hijri">{hijri} · {gregDate}</div>
          </>
        )}
      </div>
    </div>
  )
}

export default App