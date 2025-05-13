import { useState, useEffect } from 'react'
import axios from 'axios'
import { Filter } from './components/Filter'
import { PersonForm } from './components/PersonForm'
import { Persons } from './components/Persons'
import personService from './services/persons';

const App = () => {
  const [newFilter, setNewFilter] = useState('')
  const [persons, setPersons] = useState([])

  useEffect(() => {
    personService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
  }, [])

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter newFilter={newFilter} setNewFilter={setNewFilter} />

      <h3>Add a new</h3>
      <PersonForm persons={persons} setPersons={setPersons} />

      <h2>Numbers</h2>
      <Persons persons={persons} filter={newFilter} setPersons={setPersons} />

    </div>
  )

}

export default App