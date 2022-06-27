import React, { useEffect, useState } from "react";
import { PersonForm, Numbers, Filter } from "./components/Person";
import personsService from "./services/persons";
import Notification from "./components/Notification";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNum, setNewNum] = useState("");
  const [filter, setFilter] = useState("");
  const [msg, setMsg] = useState(null);
  const [error, setError] = useState(null);

  const hook = () => {
    personsService.getAll().then((persons) => {
      setPersons(persons);
    });
  };
  useEffect(hook, []);

  const addPerson = (event) => {
    event.preventDefault();
    // Check if person already in phonebook
    const checkName = persons.filter((person) => person.name === newName);
    if (checkName.length !== 0) {
      if (
        window.confirm(
          `${newName} is already added to phonebook. Want to replace the old number?`
        )
      ) {
        const id = checkName[0].id;
        const updatedPerson = { ...checkName[0], number: newNum };
        personsService
          .update(id, updatedPerson)
          .then((init) => {
            setPersons(
              persons.map((person) => (person.id !== id ? person : init))
            );
            setMsg(`Number of ${updatedPerson.name} edited`);

            setTimeout(() => {
              setMsg(null);
            }, 5000);
          })
          .catch((e) => {
            setError(
              `Information of ${checkName[0].name} has already been removed from server`
            );

            setTimeout(() => {
              setError(null);
            }, 5000);
          });
      }
    } else {
      const personObject = {
        name: newName,
        number: newNum,
      };

      // Add to database
      personsService
        .create(personObject)
        .then((initPerson) => {
          setPersons(persons.concat(initPerson));
          setNewName("");
          setNewNum("");
          setMsg(`Added ${personObject.name}`);

          setTimeout(() => {
            setMsg(null);
          }, 5000);
        })
        .catch((error) => {
          setError(error.response.data.error);
          setTimeout(() => {
            setError(null);
          }, 5000);
        });
    }
  };

  const removePerson = (id, name) => {
    if (window.confirm(`Do you really want to remove ${name}`)) {
      personsService.remove(id);

      const copy = persons.filter((person) => person.id !== id);
      setPersons(copy);
      setMsg(`Removed ${name}`);

      setTimeout(() => {
        setMsg(null);
      }, 5000);
    }
  };

  const handleValueChange = (event) => {
    setNewName(event.target.value);
  };

  const handleNumChange = (event) => {
    setNewNum(event.target.value);
  };

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  };

  const handleDeleteClick = (person) => {
    removePerson(person.id, person.name);
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification msg={msg} error={error} />
      <Filter onChange={handleFilterChange} />
      <h2>Add a new</h2>
      <PersonForm
        addPerson={addPerson}
        handleValueChange={handleValueChange}
        handleNumChange={handleNumChange}
        newName={newName}
        newNum={newNum}
      />
      <h2>Numbers</h2>
      {persons.map((person) => (
        <Numbers
          key={person.name}
          person={person}
          persons={persons}
          filter={filter}
          handleDelete={() => handleDeleteClick(person)}
        />
      ))}
    </div>
  );
};

export default App;
