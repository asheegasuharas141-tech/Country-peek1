import { useEffect, useState } from 'react'
import CountryCard from '../components/CountryCard'
import './Home.css'

function Home() {
  const [search, setSearch] = useState('')
  const [countries, setCountries] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    if (!search.trim()) {
      setCountries([])
      setError('')
      setIsLoading(false)
      return
    }

    setIsLoading(true)
    setError('')

    const controller = new AbortController()
    const timer = setTimeout(() => {
      fetch(
        `https://restcountries.com/v3.1/name/${encodeURIComponent(search)}?fields=cca3,name,flags,population,region,capital`,
        { signal: controller.signal }
      )
        .then((response) => {
          if (!response.ok) {
            if (response.status === 404) {
              throw new Error(`No countries matched "${search}".`)
            }
            throw new Error('Unable to load country data.')
          }
          return response.json()
        })
        .then((data) => {
          setCountries(data)
          setError('')
        })
        .catch((fetchError) => {
          if (fetchError.name === 'AbortError') {
            return
          }
          setCountries([])
          setError(fetchError.message)
        })
        .finally(() => {
          setIsLoading(false)
        })
    }, 400)

    return () => {
      clearTimeout(timer)
      controller.abort()
    }
  }, [search])

  const hasSearch = Boolean(search.trim())

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
        {hasSearch ? (
          <p className="small-note">
            Searching for: <strong>{search}</strong>
          </p>
        ) : (
          <p className="small-note">Start typing to begin your country search.</p>
        )}
      </div>

      {isLoading && <p className="status-message">Loading...</p>}
      {!isLoading && error && <p className="status-message status-error">{error}</p>}
      {!isLoading && !error && hasSearch && countries.length === 0 && (
        <p className="status-message">No results found.</p>
      )}

      {!isLoading && !error && countries.length > 0 && (
        <div className="results-grid">
          {countries.map((country) => (
            <CountryCard key={country.cca3} country={country} />
          ))}
        </div>
      )}
    </section>
  )
}

export default Home
