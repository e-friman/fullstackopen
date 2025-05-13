import { useState } from 'react';
import axios from 'axios'
import personService from '../services/persons';


export const PersonForm = ({ persons, setPersons }) => {
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');

  const handleName = (event) => {
    setNewName(event.target.value);
  };

  const handleNumber = (event) => {
    setNewNumber(event.target.value);
  };

  const addNumber = (event) => {
    event.preventDefault();
    const personObject = {
      name: newName,
      number: newNumber
    };

    const person = persons.find(({ name }) => name === newName)

    person
      ? window.confirm(`${newName} is already added to phonebook. Do you want to update phone number`)
        ? personService
          .update(person.id, personObject)
          .then(returnedPerson => {
            setPersons(persons.map(person => person.name === newName ? returnedPerson : person))
            setNewName('')
            setNewNumber('')
          })
        : alert("Cancelled")

      : personService
        .create(personObject)
        .then(newPerson => {
          setPersons(persons.concat(newPerson))
          setNewName('');
          setNewNumber('');
        });


  };


  return (
    <div>
      <form onSubmit={addNumber}>
        <div>name: <input value={newName} onChange={handleName} /></div>
        <div>number: <input value={newNumber} onChange={handleNumber} /></div>
        <div><button type="submit">add</button></div>
      </form>
    </div>
  );
};
