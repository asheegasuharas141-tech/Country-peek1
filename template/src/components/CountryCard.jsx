import './CountryCard.css'

function CountryCard({ country }) {
  const flagUrl = country.flags?.svg || country.flags?.png || ''
  const countryName = country.name?.common || 'Unknown'
  const capital = country.capital?.[0] ?? 'N/A'

  return (
    <article className="country-card">
      <img className="country-flag" src={flagUrl} alt={`Flag of ${countryName}`} />
      <div className="country-card-body">
        <h2>{countryName}</h2>
        <dl>
          <div className="country-card-row">
            <dt>Population</dt>
            <dd>{country.population?.toLocaleString() ?? 'N/A'}</dd>
          </div>
          <div className="country-card-row">
            <dt>Region</dt>
            <dd>{country.region ?? 'N/A'}</dd>
          </div>
          <div className="country-card-row">
            <dt>Capital</dt>
            <dd>{capital}</dd>
          </div>
        </dl>
      </div>
    </article>
  )
}

export default CountryCard
