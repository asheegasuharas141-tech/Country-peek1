import { useEffect, useState } from 'react'

function useCountry(code) {
  const [country, setCountry] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    if (!code) {
      setCountry(null)
      setLoading(false)
      setError('')
      return
    }

    setLoading(true)
    setError('')

    const controller = new AbortController()

    fetch(
      `https://restcountries.com/v3.1/alpha/${encodeURIComponent(code)}?fields=cca3,name,flags,population,region,subregion,capital,languages,currencies,borders`,
      { signal: controller.signal }
    )
      .then((response) => {
        if (!response.ok) {
          if (response.status === 404) {
            throw new Error(`Country code ${code} was not found.`)
          }
          throw new Error('Unable to load country details.')
        }
        return response.json()
      })
      .then((data) => {
        const countryData = Array.isArray(data) ? data[0] : data
        setCountry(countryData)
        setError('')
      })
      .catch((fetchError) => {
        if (fetchError.name === 'AbortError') {
          return
        }
        setCountry(null)
        setError(fetchError.message)
      })
      .finally(() => {
        setLoading(false)
      })

    return () => {
      controller.abort()
    }
  }, [code])

  return { country, loading, error }
}

export default useCountry
