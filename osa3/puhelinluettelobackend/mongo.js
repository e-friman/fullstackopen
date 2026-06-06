const mongoose = require('mongoose')

const password = process.argv[2]
const name = process.argv[3]
const number = process.argv[4]

const url = `mongodb+srv://frimajar:${password}@fullstackopen.0qcixmj.mongodb.net/puhelinluetteloApp?`

mongoose.set('strictQuery', false)
mongoose.connect(url)

const personSchema = new mongoose.Schema({
    name: String,
    number: String
})

const Person = mongoose.model('Person', personSchema)

const person = new Person({
    name,
    number
})

if (name === undefined && number === undefined) {
    console.log('phonebook:');
    Person
        .find({})
        .then(persons => {
            persons.map((person) => console.log(person.name, person.number))
            mongoose.connection.close()
        })
} else {
    person.save().then(result => {
        console.log(`added ${name}, number ${number} to phonebook`)
        mongoose.connection.close()
    })
}