const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const morgan = require('morgan');

let persons = [
  {
    name: "Arto Hellas",
    number: "040-1234567",
    id: 1
  },
  {
    name: "Ada Lovelace",
    number: "39-44-5323523",
    id: 2
  },
  {
    name: "Dan Abramov",
    number: "12-43-234345",
    id: 3
  },
  {
    name: "Mary Poppendieck",
    phone: "39-23-6423122",
    id: 4
  }
];

app.use(bodyParser.json());
app.use(morgan('tiny'));

app.get('/info', (request, response) => {
  const date = new Date();
  response.send(`<div>Phonebook has info for ${persons.length} people</div><br>
  <div>${date}</div>`);
});

app.get('/', (request, response) => {
  response.send('<h1>Hello World!</h1>')
});

app.get('/api/persons', (req, res) => {
  res.json(persons)
});

app.get('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id);
  const person = persons.find(person => person.id === id);
  if (person) {
    response.json(person);
  } else {
    response.status(404).end();
  }
});

const generateId = () => {
  return Math.floor(Math.random() * 5000);
};

app.post('/api/persons', (request, response) => {
  const body = request.body;

  if (!body.name) {
    return response.status(400).json({
      error: 'name missing'
    })
  }

  if(!body.number) {
    return response.status(400).json({
      error: 'number missing'
    })
  }

  let alreadyAdded = false;
  persons.forEach(value => {
    if(value.name === body.name) {
      alreadyAdded = true;
      return response.status(400).json({
        error: 'Name must be unique'
      })
    }
  });

  if(!alreadyAdded) {
    const person = {
      name: body.name,
      number: body.number,
      id: generateId()
    };
    persons = persons.concat(person);
    response.json(person);

  }

  console.log(persons);

});



app.delete('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id);
  persons = persons.filter(note => note.id !== id);

  response.status(204).end();
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
});



