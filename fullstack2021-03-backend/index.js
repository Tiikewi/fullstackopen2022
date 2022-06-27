require("dotenv").config();
const express = require("express");
const app = express();
const Person = require("./models/person");
app.use(express.static("build"));

const cors = require("cors");
app.use(cors());

var morgan = require("morgan");

app.use(express.json());
morgan.token("body", (req) => JSON.stringify(req.body));
app.use(
  morgan(":method :url :status :response-time ms - :res[content-length] :body")
);

const errorHandler = (error, req, res, next) => {
  console.error(error.message);

  if (error.name === "CastError") {
    return res.status(400).send({ error: "incorrect id" });
  } else if (error.name === "ValidationError") {
    return res.status(400).json({ error: error.message });
  }

  next(error);
};
// GET ALL
app.get("/api/persons/", (req, res, next) => {
  Person.find({})
    .then((result) => {
      res.json(result);
    })
    .catch((e) => next(e));
});

// GET ONE
app.get("/api/persons/:id", (req, res) => {
  Person.findById(req.params.id).then((note) => {
    res.json(note);
  });
});

// POST
app.post("/api/persons/", (req, res, next) => {
  const body = req.body;

  const person = new Person({
    name: body.name,
    number: body.number,
  });

  person
    .save()
    .then((savedPerson) => {
      res.json(savedPerson.toJSON());
    })
    .catch((e) => next(e));
});

// DELETE
app.delete("/api/persons/:id", (req, res, next) => {
  Person.findByIdAndRemove(req.params.id)
    .then(() => {
      res.status(204).end();
    })
    .catch((e) => next(e));
});

// PUT
app.put("/api/persons/:id", (req, res, next) => {
  const body = req.body;
  const person = {
    name: body.name,
    number: body.number,
  };

  Person.findByIdAndUpdate(body.id, person, { new: true })
    .then((updated) => {
      res.json(updated);
    })
    .catch((e) => next(e));
});

// GET INFO
app.get("/info", (req, res) => {
  Person.find({}).then((result) => {
    const amount = result.length;
    res.send(`<p>Phonebook has info for ${amount} people</p> ${new Date()}`);
  });
});

// eslint-disable-next-line no-undef
const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});

app.use(errorHandler);
