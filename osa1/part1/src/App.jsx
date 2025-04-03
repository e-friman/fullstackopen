const Hello = (props) => {
  console.log(props)
  return (
    <div>
      <p>Hello {props.name}, you are {props.age} years old</p>
    </div>
  )
}

const App = () => {
  const nimi = 'Eino'
  const ika = 24
  return (
    <div>
      <h1>Greetings</h1>
      <Hello name="Suomi" age={2025 - 1917}/>
      <Hello name={nimi} age={ika}/>
    </div>
  )
}

export default App