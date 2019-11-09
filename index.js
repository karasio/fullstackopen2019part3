const express = require('express');
const app = express();
require('dotenv').config();
const bodyParser = require('body-parser');

const morgan = require('morgan');
const Person = require('./models/person');

app.use(bodyParser.json());
const cors = require('cors');

app.use(cors());

const requestLogger = (request, response, next) => {
  console.log('Method:', request.method);
  console.log('Path:  ', request.path);
  console.log('Body:  ', request.body);
  console.log('--------');
  next();
};

app.use(morgan('tiny'));
app.use(requestLogger);

let persons = [
//   {
//     name: "Arto Hellas",
//     number: "040-1234567",
//     id: 1
//   },
//   {
//     name: "Ada Lovelace",
//     number: "39-44-5323523",
//     id: 2
//   },
//   {
//     name: "Dan Abramov",
//     number: "12-43-234345",
//     id: 3
//   },
//   {
//     name: "Mary Poppendieck",
//     phone: "39-23-6423122",
//     id: 4
//   }
];

app.use(express.static('build'));

// show info page
app.get('/info', (request, response) => {
  const date = new Date();
  Person.find({}).then(result => {
    response.send(`<div>Phonebook has info for ${result.length} people</div><br><div>${date}</div>`);
  });
});

// don't know if this is ever used in the fullstack version, probably not 'Hello World'
app.get('/', (request, response) => {
  response.send('<h1>Hello World!</h1>');
});

// get all people from phonebook
app.get('/api/persons', (request, response) => {
  let persons = [];
  Person.find({}).then(result => {
    result.forEach(onePerson => {
      persons = persons.concat(onePerson);
    });
    response.json(persons);
  });
});

// modify entrys phone number
app.put('/api/persons/:id', (request, response, next) => {
  const body = request.body;

  console.log('muutettavan hemmon id',body.id);
  const person = {
    name: body.name,
    number: body.number,
  };

  Person.findByIdAndUpdate(request.params.id, person, { new: body.number })
    .then(updatedPerson => {
      response.json(updatedPerson.toJSON());
    })
    .catch(error => next(error));
});

// get a spesific person from phonebook according to id
app.get('/api/persons/:id', (request, response, next) => {
  // WANHA
  // const id = Number(request.params.id);
  // const person = persons.find(person => person.id === id);
  // if (person) {
  //   response.json(person);
  // } else {
  //   response.status(404).end();
  // }
  //console.log(request.params.id);
  Person
    .findById(request.params.id)
    .then(person => {
      //console.log(person);
      if(person) {
        //console.log('app get if personissa');
        response.json(person.toJSON());
      } else {
        //console.log('app get else');
        response.status(204).end();
      }
    })
    .catch(error => {
      //console.log('catchissa');
      next(error);
    });
});

// generate id for a new entry to phonebook
const generateId = () => {
  return Math.floor(Math.random() * 5000);
};

// ADD a new person to phonebook
app.post('/api/persons', (request, response, next) => {
  const body = request.body;

  if (body.name === undefined) {
    console.log('Body', body);
    return response.status(404).json({
      error: 'name missing'
    });
  }

  if(body.number === undefined) {
    console.log('Body', body);
    return response.status(404).json({
      error: 'number missing'
    });
  }

  let alreadyAdded = false;

  persons.forEach(value => {
    if(value.name === body.name) {
      alreadyAdded = true;
      return response.status(404).json({
        error: 'Name must be unique'
      });
    }
  });

  if(!alreadyAdded) {
    const person = new Person({
      name: body.name,
      number: body.number,
      id: generateId()
    });

    person
      .save()
      .then(savedPerson => {
        persons = persons.concat(savedPerson);
        return savedPerson.toJSON();
      })
      .then(savedAndFormattedPerson => {
        response.json(savedAndFormattedPerson);
      })
      .catch(error => next(error));
  }
});

// delete person from phonebook
app.delete('/api/persons/:id', (request, response, next) => {
  // const id = Number(request.params.id);
  // persons = persons.filter(person => person.id !== id);
  // response.status(204).end();

  Person.findByIdAndRemove(request.params.id)
    .then (result => {
      response.status(204).end();
    })
    .catch(error => next(error));
});

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' });
};

app.use(unknownEndpoint);

const errorHandler = (error, request, response, next) => {
  console.error(error.message);

  if (error.name === 'CastError' && error.kind === 'ObjectId') {
    return response.status(400).send({ error: 'malformed id' });
  } else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message });
  }
  // else {
  //   return response.status(400).json({ error: error.message })
  // }

  next(error);
};

app.use(errorHandler);

const PORT = process.env.PORT;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on port ${PORT}`);
});



