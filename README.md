# 🕌 Malaysia Prayer Times

A responsive React web app that shows live Islamic prayer times for Malaysian cities — built as part of my Full Stack Web Development learning journey.

**Live Demo:** [your-app.vercel.app](https://your-app.vercel.app)

---

## ✨ Features

- 🕐 Live prayer times fetched from Aladhan API
- ⏱️ Real-time countdown to next prayer
- 📊 Progress bar between current and next prayer
- 🏙️ 15 Malaysian cities supported
- 📅 Hijri & Gregorian date display
- 🌙 Skeleton loading animation
- 🔄 Retry button on network error
- 📱 Fully responsive (mobile-friendly)

---

## 🛠️ Built With

| Technology | Purpose |
|---|---|
| React 18 | UI framework |
| Vite | Build tool |
| Aladhan API | Prayer times data (free, no key needed) |
| CSS3 | Styling & animations |
| Vercel | Deployment |

---

## ⚛️ React Concepts Used

- `useState` — managing city, timings, loading, error state
- `useEffect` — fetching API on load + city change
- `useCallback` — stable fetch function reference
- `setInterval` — live countdown timer with cleanup
- Props & component composition — 5 components
- Conditional rendering — loading / error / all-done states

---

## 📁 Project Structure
src/
├── components/
│   ├── Header.jsx       # Dark header with countdown + progress bar
│   ├── CitySelector.jsx # City dropdown
│   ├── PrayerList.jsx   # Renders all prayer rows
│   ├── PrayerItem.jsx   # Single prayer row
│   └── Skeleton.jsx     # Loading skeleton
├── App.jsx              # Main app — state & logic
└── index.css            # Global styles

---

## 🚀 Run Locally

```bash
git clone https://github.com/YOUR_USERNAME/prayer-app.git
cd prayer-app
npm install
npm run dev
```

Open `http://localhost:5173`

---

## 📡 API

Uses the free [Aladhan API](https://aladhan.com/prayer-times-api) — no API key required.

{"code":200,"status":"OK","data":{"timings":{"Fajr":"05:09","Sunrise":"06:19","Dhuhr":"12:24","Asr":"15:39","Sunset":"18:30","Maghrib":"18:30","Isha":"19:36","Imsak":"04:59","Midnight":"00:24","Firstthird":"22:26","Lastthird":"02:23"},"date":{"readable":"17 Apr 2026","timestamp":"1776379530","hijri":{"date":"29-10-1447","format":"DD-MM-YYYY","day":"29","weekday":{"en":"Al Juma'a","ar":"\u0627\u0644\u062c\u0645\u0639\u0629"},"month":{"number":10,"en":"Shaww\u0101l","ar":"\u0634\u064e\u0648\u0651\u0627\u0644","days":29},"year":"1447","designation":{"abbreviated":"AH","expanded":"Anno Hegirae"},"holidays":[],"adjustedHolidays":[],"method":"HJCoSA"},"gregorian":{"date":"17-04-2026","format":"DD-MM-YYYY","day":"17","weekday":{"en":"Friday"},"month":{"number":4,"en":"April"},"year":"2026","designation":{"abbreviated":"AD","expanded":"Anno Domini"},"lunarSighting":false}},"meta":{"latitude":8.8888888,"longitude":7.7777777,"timezone":"Asia\/Kuching","method":{"id":3,"name":"Muslim World League","params":{"Fajr":18,"Isha":17},"location":{"latitude":51.5194682,"longitude":-0.1360365}},"latitudeAdjustmentMethod":"ANGLE_BASED","midnightMode":"STANDARD","school":"STANDARD","offset":{"Imsak":0,"Fajr":0,"Sunrise":0,"Dhuhr":0,"Asr":0,"Maghrib":0,"Sunset":0,"Isha":0,"Midnight":0}}}}

MUHAMMAD HAFIZUL BIN AHMAD HUSNI
CARAMELLATTEE
[Your Vercel URL (after Day 7)](https://prayer-8vhcyd3hy-caramellattees-projects.vercel.app/)