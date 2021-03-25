import React, { useState, useEffect } from 'react'
import axios from 'axios'

const Country = ({country}) => (
  <div>
    <h2>{country.name}</h2>
    <p>Capital: {country.capital}</p>
    <p>Population: {country.population}</p>
    <ul>
      {country.languages.map(language =>
        <li key={language.name}>{language.name}</li>
      )}
    </ul>
    <img src={country.flag} width='200px'></img>
  </div>
)

const Countries = ({countriesToShow}) => {

  const handleClick = (index) => {
    return (
      <Country country={countriesToShow[index]} />
    )
  }

  if (countriesToShow.length >= 10) {
    return (
      <p>Too many matches...</p>
    )
  }
  else if (countriesToShow.length === 0) {
    return (
      <p>No matches...</p>
    )
  }
  else if (countriesToShow.length === 1) {
    setCurrentCountry(countriesToShow[0]);
    <Country country={currentCountry} />
  }
  else {
    return (
      <ul>
        {countriesToShow.map((country,index) =>
          <li key={country.name}>{country.name} {country.number} <button onClick={() => handleClick(index)}>Show</button></li>
        )}
      </ul>
    )
  }
}

const Filter = (props) => {
  return (
    <div>Show countries containing: <input onChange={props.handleFilter} value={props.filterText} /></div>
  )
}

const App = () => {

  const [ countries, setCountries ] = useState([])
  const [ filterText, setFilterText ] = useState('')
  const [ currentCountry, setCurrentCountry ] = useState([])

  const handleFilter = (event) => {
    setFilterText(event.target.value)
    setCurrentCountry([])
  }

  const countriesToShow = countries.filter(country => country.name.toLowerCase().includes(filterText.toLowerCase()))

  useEffect(() => {
    console.log('effect')
    axios
      .get('https://restcountries.eu/rest/v2/all').then(response => {
        console.log('promise fulfilled')
        setCountries(response.data)
      })
  }, [])

  return (
    <div>
      <h1>World Info</h1>

      <Filter handleFilter={handleFilter} filterText={filterText} />

      <h3>Results</h3>
      <Countries countriesToShow={countriesToShow} />
    </div>
  )
}

export default App
