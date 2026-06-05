import { useNavigate, useParams } from 'react-router-dom'
import useCountry from '../hooks/useCountry'
import './CountryPage.css'

function CountryPage() {
  const { code } = useParams()
  const navigate = useNavigate()
  const { country, loading, error } = useCountry(code)

  const languages = country?.languages
    ? Object.values(country.languages).join(', ')
    : 'N/A'

  const currencies = country?.currencies
    ? Object.values(country.currencies)
        .map((currency) => {
          const name = currency.name || 'Unknown'
          const symbol = currency.symbol ? ` (${currency.symbol})` : ''
          return `${name}${symbol}`
        })
        .join(', ')
    : 'N/A'

  const borders = country?.borders ?? []

  return (
    <section className="page country-detail-page">
      <button className="back-button" type="button" onClick={() => navigate(-1)}>
        &larr; Back
      </button>

      {loading && <p className="status-message">Loading country details...</p>}
      {!loading && error && <p className="status-message status-error">{error}</p>}

      {!loading && !error && country && (
        <div className="country-detail-card">
          <img
            className="country-detail-flag"
            src={country.flags?.svg || country.flags?.png}
            alt={`Flag of ${country.name?.common}`}
          />

          <div className="country-detail-info">
            <h1>{country.name?.common}</h1>
            <p className="country-official-name">{country.name?.official}</p>

            <dl>
              <div className="detail-row">
                <dt>Population</dt>
                <dd>{country.population?.toLocaleString() ?? 'N/A'}</dd>
              </div>
              <div className="detail-row">
                <dt>Region</dt>
                <dd>{country.region ?? 'N/A'}</dd>
              </div>
              <div className="detail-row">
                <dt>Subregion</dt>
                <dd>{country.subregion ?? 'N/A'}</dd>
              </div>
              <div className="detail-row">
                <dt>Capital</dt>
                <dd>{country.capital?.join(', ') ?? 'N/A'}</dd>
              </div>
              <div className="detail-row">
                <dt>Languages</dt>
                <dd>{languages}</dd>
              </div>
              <div className="detail-row">
                <dt>Currencies</dt>
                <dd>{currencies}</dd>
              </div>
              <div className="detail-row">
                <dt>Border Countries</dt>
                <dd>{borders.length > 0 ? borders.join(', ') : 'None'}</dd>
              </div>
            </dl>
          </div>
        </div>
      )}
    </section>
  )
}

export default CountryPage
