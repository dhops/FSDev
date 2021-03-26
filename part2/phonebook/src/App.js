import React, { useState, useEffect } from 'react'
import personService from './services/persons'


const Notification = ({ message }) => {
  if (message === null) {
    return null
    console.log("Here")
  }

  return (
    <div className='success'>
      {message}
    </div>
  )
}

const Error = ({ message }) => {
  if (message === null) {
    return null
  }

  return (
    <div className='error'>
      {message}
    </div>
  )
}


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

const Persons = ({personsToShow, handleDelete}) => {
  return (
    <ul>
      {personsToShow.map(person =>
        <div>
          <li key={person.id}>{person.name} {person.number}<button onClick={() => handleDelete(person.id)}>Delete</button></li>
        </div>
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

  const [ persons, setPersons ] = useState([])
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ filterText, setFilterText ] = useState('')
  const [ notification, setNotification ] = useState(null)
  const [ errorNotification, setErrorNotification ] = useState(null)

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
      if (window.confirm(`${newName} is already added to phonebook, change number?`)) {
        const person = persons.find(p => p.name === newName)
        const changedPerson = { ...person, number: newNumber }

        personService
          .update(person.id, changedPerson)
          .then(returnedPerson => {
            setPersons(persons.map(p => p.id !== person.id ? p : returnedPerson))
            })
          .then(() => {
            setNotification(
                `${person.name} was successfully updated`
              )
              setTimeout(() => {
                setNotification(null)
              }, 5000)
            })
          .catch((error) => {
            setErrorNotification(
                `${person.name} was already deleted.`
              )
              setTimeout(() => {
                setNotification(null)
              }, 5000)
            })
      }
    }
    else {
      const person = {
        name: newName,
        number: newNumber
      }
      personService
        .create(person)
        .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson))
          setNewName('')
          setNewNumber('')
        })
        .then(() => {
          setNotification(
              `${person.name} was successfully added`
            )
            setTimeout(() => {
              setNotification(null)
            }, 5000)
          })
    }
  }

  useEffect(() => {
    console.log('effect')
    personService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
  }, [])

  const handleDelete = (id) => {
    console.log(persons)
    if (window.confirm(`do you really want to delete ${persons.find(p => p.id === id).name}?`)) {
      personService
        .remove(id)
        .then(setPersons(persons.filter(p => p.id !== id)))
    }
  }

  return (
    <div>
      <h1>Phonebook</h1>
      <Notification message={notification} />
      <Error message={errorNotification} />
      <Filter handleFilter={handleFilter} filterText={filterText} />

      <h3>Add a new person</h3>
      <PersonForm handleText={handleText} handleClick={handleClick} handleNumber={handleNumber} newName={newName} newNumber={newNumber}/>

      <h2>Numbers</h2>
      <Persons personsToShow={personsToShow} handleDelete={handleDelete} />
    </div>
  )
}

export default App
