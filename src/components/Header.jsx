function Header({
  city,
  nextPrayer,
  countdown,
  progress,
  prevPrayer,
  prevTime,
  nextTime,
  hijri,
}) {
  return (
    <div className="header">

      {/* Top row — city + hijri date */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
        <div className="header-top" style={{ margin: 0 }}>
          Malaysia · {city}
        </div>
        <div style={{ fontSize: '10px', color: '#555' }}>
          {hijri}
        </div>
      </div>

      {/* Next prayer name */}
      <div className="next-prayer-name">{nextPrayer}</div>

      {/* Countdown */}
      <div className="countdown">
        Next prayer in <span>{countdown}</span>
      </div>

      {/* Progress bar */}
      <div className="progress-wrap">
        <div
          className="progress-fill"
          style={{ width: `${progress}%` }}
        ></div>
      </div>

      {/* Progress labels */}
      <div className="progress-labels">
        <span>{prevPrayer} {prevTime}</span>
        <span>{nextPrayer} {nextTime}</span>
      </div>

    </div>
  )
}

export default Header