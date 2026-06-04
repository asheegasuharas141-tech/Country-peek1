import { useState } from 'react'

function Home() {
  const [search, setSearch] = useState('')

  return (
    <section className="page home-page">
      <h1>Welcome to CountryPeek</h1>
      <p>Search for countries and save your favourites.</p>

      <div className="search-group">
        <label htmlFor="country-search">Search</label>
        <input
          id="country-search"
          className="search-input"
          type="search"
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          placeholder="Type a country name..."
        />
        {search ? (
          <p className="small-note">Searching for: <strong>{search}</strong></p>
        ) : (
          <p className="small-note">Start typing to begin your country search.</p>
        )}
      </div>
    </section>
  )
}

export default Home
