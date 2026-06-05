function NotFound() {
  return (
    <section className="page not-found-page">
      <p className="error-code">404</p>
      <div className="not-found-copy">
        <h1>Page not found</h1>
        <p>That route doesn't exist. Use the navigation above to return home.</p>
      </div>
    </section>
  )
}

export default NotFound
