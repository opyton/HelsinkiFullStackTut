import React, { useState } from "react";

const App = () => {
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", number: "040-123456" },
    { name: "Ada Lovelace", number: "39-44-5323523" },
    { name: "Dan Abramov", number: "12-43-234345" },
    { name: "Mary Poppendieck", number: "39-23-6423122" },
  ]);
  const [newName, setNewName] = useState("");
  const [newNum, setNewNum] = useState("");

  const addPerson = (event) => {
    event.preventDefault();
    if (persons.filter((word) => word.name === newName).length > 0) {
      alert(newName + " is already added to the phonebook");
    } else {
      let personsCopy = [...persons];
      const newPersonObj = { name: newName, number: newNum };
      personsCopy.push(newPersonObj);
      setPersons(personsCopy);
    }
  };

  const personMapping = (persons) => {
    return persons.map((person) => (
      <p>
        {person.name} {person.number}
      </p>
    ));
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <h2>Add a new</h2>
      <form onSubmit={addPerson}>
        <div>
          name:{""}
          <input
            value={newName}
            onChange={(event) => setNewName(event.target.value)}
          />
        </div>

        <div>
          number:{""}
          <input
            value={newNum}
            onChange={(event) => setNewNum(event.target.value)}
          />
        </div>

        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {personMapping(persons)}
    </div>
  );
};

export default App;
