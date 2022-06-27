const mongoose = require("mongoose");

// Get amount of parameters
const params = process.argv.length;

if (params < 3) {
  console.log("give password as argument");
  process.exit(1);
}

const password = process.argv[2];

const url = `mongodb+srv://fullstack:${password}@cluster0.zmptw.mongodb.net/phonebook?retryWrites=true&w=majority`;

mongoose.connect(url);

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
});

const Person = mongoose.model("Person", personSchema);

// save person to db. Name and number as param.
if (params === 5) {
  const person = new Person({
    name: process.argv[3],
    number: process.argv[4],
  });

  person.save().then((res) => {
    console.log(`added ${person.name} number ${person.number} to phonebook`);
    mongoose.connection.close();
  });
}

// Get all persons
if (params == 3) {
  Person.find({}).then((result) => {
    console.log("phonebook:");
    result.forEach((person) => {
      console.log(`${person.name} ${person.number}`);
    });
    mongoose.connection.close();
  });
}
