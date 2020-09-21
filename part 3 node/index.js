var express = require("express");
var app = express();

app.use(express.json()); //json-parser

let persons = [
  {
    id: 1,
    name: "Arto Hellas",
    number: "123-456-7890",
  },
  {
    id: 2,
    name: "Ada Lovelace",
    number: "122-456-7895",
  },
  {
    id: 3,
    name: "Dan Abramov",
    number: "123-456-7389",
  },
  {
    id: 4,
    name: "Mary Poppendick",
    number: "413-456-7489",
  },
];

app.get("/api/persons", (req, res) => res.json(persons));

app.get("/api/persons/:id", (req, res) => {
  const numId = Number(req.params.id);
  const filteredPersons = persons.filter((person) => person.id === numId);
  if (filteredPersons.length > 0) {
    res.json(filteredPersons);
  } else {
    res.status(404).json("Invalid Request");
  }
});

app.get("/info", (req, res) =>
  res.send(
    "Phonebook has info for " + persons.length + " people\n" + new Date()
  )
);

app.post("/api/persons", (req, res) => {
  const body = req.body;
  if (!body.name || !body.number) {
    res.status(404).send("error: body or number is missing in post");
  }
  if (persons.filter((item) => item.name === body.name).length > 0) {
    res.status(404).send("error: duplicate name");
  } else {
    const newEntry = {
      id: Math.floor(Math.random() * 100 + 1),
      name: body.name,
      number: body.number,
    };
    persons = persons.concat(newEntry);
    console.log(persons);
    res.send("success");
  }
});

app.delete("/api/persons/:id", (req, res) => {
  const numId = Number(req.params.id);
  const filteredPersons = persons.filter((person) => person.id !== numId);
  if (filteredPersons.length > 0) {
    persons = filteredPersons;
    console.log(persons);
    res.json(numId + " successfully deleted");
  } else {
    res.status(404).json("Invalid Request");
  }
});

const PORT = 3001;
app.listen(PORT, () => console.log("Server running on port", PORT));
