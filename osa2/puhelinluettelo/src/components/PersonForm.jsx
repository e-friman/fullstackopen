import { useState } from 'react';

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

    persons.find(({ name }) => name === newName)
      ? alert(`${newName} is already added to phonebook`)
      : setPersons(persons.concat(personObject));

    setNewName('');
    setNewNumber('');
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
