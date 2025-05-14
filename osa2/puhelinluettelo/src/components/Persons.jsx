import personService from '../services/persons';

const Person = ({ name, number, id, setPersons, persons, setNotificationMessage }) => {

  const handleDelete = (event) => {
    event.preventDefault()
    window.confirm(`Delete ${name}`)
      ? personService.remove(id)
        .then(() => {
          setPersons(persons.filter(person => person.id !== id))
          setNotificationMessage(
            `Deleted ${name}`
          )
          setTimeout(() => {
            setNotificationMessage(null)
          }, 3000)
        })
      : console.log("cancelled");
  }

  return (
    <div>
      <form onSubmit={handleDelete}>
        {name} {number}
        <button type="submit">delete</button>
      </form>
    </div>
  );
};

export const Persons = ({ persons, filter, setPersons, setNotificationMessage }) => {
  return (
    <div>
      {persons
        .filter(({ name }) => name.toLowerCase().includes(filter.toLowerCase()))
        .map(person =>
          <Person
            key={person.id}
            name={person.name}
            number={person.number}
            id={person.id}
            setPersons={setPersons}
            persons={persons}
            setNotificationMessage={setNotificationMessage}
          />
        )}
    </div>
  );
};
