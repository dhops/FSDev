import React, { useState } from 'react'


const PersonForm = (props) => {
  return (
    <form onSubmit={props.handleClick}>
      <div>
        name: <input onChange={props.handleText} value={props.newName} />
      </div>
      <div>number: <input onChange={props.handleNumber} value={props.newNumber} /></div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  )
}

const Persons = ({personsToShow}) => {
  return (
    <ul>
      {personsToShow.map(person =>
        <li key={person.name}>{person.name} {person.number}</li>
      )}
    </ul>
  )
}

const Filter = (props) => {
  return (
    <div>Show names containing: <input onChange={props.handleFilter} value={props.filterText} /></div>
  )
}

const App = () => {
  
  const [ persons, setPersons ] = useState([
    { name: 'Arto Hellas', number: '046-617-9292' }
  ])
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ filterText, setFilterText ] = useState('')

  const handleFilter = (event) => {
    setFilterText(event.target.value)
  }

  const personsToShow = persons.filter(person => person.name.toLowerCase().includes(filterText.toLowerCase()))

  const handleText = (event) => {
    setNewName(event.target.value)
  }

  const handleNumber = (event) => {
    setNewNumber(event.target.value)
  }

  const handleClick = (event) => {
    event.preventDefault()

    if (persons.map(person => person.name).includes(newName)) {
      window.alert(`${newName} is already added to phonebook`);
    }
    else {
      const personObject = {
        name: newName,
        number: newNumber
      }
      setPersons(persons.concat(personObject))
      setNewName('')
      setNewNumber('')
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter handleFilter={handleFilter} filterText={filterText} />

      <h3>Add a new person</h3>
      <PersonForm handleText={handleText} handleClick={handleClick} handleNumber={handleNumber} newName={newName} newNumber={newNumber}/>

      <h2>Numbers</h2>
      <Persons personsToShow={personsToShow} />
    </div>
  )
}

export default App
