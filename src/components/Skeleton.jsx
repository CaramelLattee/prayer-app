function Skeleton() {
  return (
    <div className="skeleton">
      {[1, 2, 3, 4, 5, 6].map((i) => (
        <div key={i} className="skeleton-row"></div>
      ))}
    </div>
  )
}

export default Skeleton