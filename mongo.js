const mongoose = require('mongoose');

if(process.argv.length < 3) {
  console.log('give password as an argument');
  process.exit(1);
}

const password = process.argv[2];

const url =
    `mongodb+srv://fullstack:${password}@cluster0-xbmun.mongodb.net/puhelinluettelo?retryWrites=true&w=majority`

mongoose.connect(url, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
      useFindAndModify: false
    });

const personSchema = new mongoose.Schema({
  name: String,
  number: String
});

const Person = mongoose.model('Person', personSchema);



if (process.argv.length < 4) {
  console.log('-----------');
  console.log(`phonebook:`);
  Person.find({}).then(result => {
    //console.log(result);
    result.forEach(people => {
      console.log(`${people.name} ${people.number}`);
    });
    mongoose.connection.close();
    process.exit()
  });
};


const nameString = process.argv[3];
const numberString = process.argv[4];

const person = new Person({
  name: nameString,
  number: numberString
});

person.save().then(response => {
  console.log(`added ${nameString} number ${numberString} to phonebook`)
  process.exit()
});

