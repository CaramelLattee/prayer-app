import PrayerItem from './PrayerItem'

const PRAYERS = [
  { key: 'Fajr',    label: 'Fajr',    icon: '🌙' },
  { key: 'Sunrise', label: 'Sunrise', icon: '🌅' },
  { key: 'Dhuhr',   label: 'Dhuhr',   icon: '☀️'  },
  { key: 'Asr',     label: 'Asr',     icon: '🌤️'  },
  { key: 'Maghrib', label: 'Maghrib', icon: '🌇' },
  { key: 'Isha',    label: 'Isha',    icon: '🌃' },
]

function PrayerList({ timings, nextPrayer }) {
  return (
    <div className="prayer-list">
      {PRAYERS.map((prayer) => (
        <PrayerItem
          key={prayer.key}
          icon={prayer.icon}
          name={prayer.label}
          time={timings[prayer.key] ?? '--:--'}
          isNext={prayer.key === nextPrayer}
        />
      ))}
    </div>
  )
}

export default PrayerList