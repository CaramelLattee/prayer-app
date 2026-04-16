function PrayerItem({ icon, name, time, isNext }) {
  return (
    <div className={`prayer-item ${isNext ? 'is-next' : ''}`}>
      <div className="prayer-left">
        <span className="prayer-icon">{icon}</span>
        <span className="prayer-name">{name}</span>
        {isNext && <span className="next-badge">Next</span>}
      </div>
      <div className="prayer-right">
        <span className="prayer-time">{time}</span>
      </div>
    </div>
  )
}

export default PrayerItem