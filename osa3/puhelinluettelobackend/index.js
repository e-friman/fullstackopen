const express = require('express')
const morgan = require('morgan')
const app = express()

morgan.token('data', (req) => { 
    if (req.method === 'POST') {
        return JSON.stringify(req.body)
    }
    return ''
})

app.use(express.json())
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :data'))
app.use(express.static('dist'))

const date = new Date()

let persons = [
    {
        name: "Arto Hellas",
        number: "040-123456",
        id: "1"
    },
    {
        name: "Ada Lovelace",
        number: "39-44-5323523",
        id: "2"
    },
    {
        name: "Dan Abramov",
        number: "12-43-234345",
        id: "3"
    },
]


app.get('/', (request, response) => {
    response.send('<h1>Hello World!</h1>')
})

app.get('/info', (request, response) => {
    response.send(`<div>Phonebook has info for ${persons.length} people</div><br>${date}</br>`)
})

app.get('/api/persons', (request, response) => {
    response.json(persons)
})

app.get('/api/persons/:id', (request, response) => {
    const id = request.params.id
    const person = persons.find(person => person.id === id)
    if (person) {
        response.json(person)
    } else {
        response.status(404).end()
    }
})

const generateId = () => {
    const newId = Math.floor(Math.random() * 2000)
    return String(newId)
}

app.post('/api/persons', (request, response) => {
    const body = request.body

    if (!body.name) {
        return response.status(400).json({
            error: 'content missing'
        })
    }

    if (!body.number) {
        return response.status(400).json({
            error: 'content missing'
        })
    }

    if (persons.find(({ name }) => name.toLowerCase().includes(body.name.toLowerCase()))) {
        return response.status(400).json({
            error: 'name must be unique'
        })
    }

    const person = {
        name: body.name,
        number: body.number,
        id: generateId(),
    }

    persons = persons.concat(person)

    response.json(person)
})

app.delete('/api/persons/:id', (request, response) => {
    const id = request.params.id
    persons = persons.filter(person => person.id !== id)

    response.status(204).end()
})

const PORT = 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})