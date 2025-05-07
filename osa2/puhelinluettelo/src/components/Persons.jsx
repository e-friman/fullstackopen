export const Persons = ({ persons, filter }) => {

  const Person = ({ name, number }) => {
    return (
      <div>
        {name} {number}
      </div>
    );
  };

  return (
    <div>
      {persons
        .filter(({ name }) => name.toLowerCase().includes(filter.toLowerCase()))
        .map(person => <Person key={person.name} name={person.name} number={person.number} />
        )}
    </div>
  );
};
