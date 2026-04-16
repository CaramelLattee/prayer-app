const CITIES = [
  'Kuala Lumpur',
  'Petaling Jaya',
  'Shah Alam',
  'Johor Bahru',
  'Penang',
  'Ipoh',
  'Kota Kinabalu',
  'Kuching',
  'Melaka',
  'Seremban',
  'Alor Setar',
  'Kuala Terengganu',
  'Kota Bharu',
  'Selayang',
  'Ampang',
]

function CitySelector({ city, onCityChange }) {
  return (
    <div className="city-selector">
      <select
        value={city}
        onChange={(e) => onCityChange(e.target.value)}
      >
        {CITIES.map((c) => (
          <option key={c} value={c}>{c}</option>
        ))}
      </select>
    </div>
  )
}

export default CitySelector