import { useState } from 'react'

const Button = ({ onClick, text }) => <button onClick={onClick}>{text}</button>

const StatisticLine = ({ text, value, symbol }) => {
  return (
    <tr>
      <td>{text}</td><td>{value}{symbol}</td> 
    </tr>
  )
}

const Statistics = ({ good, neutral, bad }) => {

  if (good + neutral + Math.abs(bad) === 0) {
    return (
      <div>
        No feedback given
      </div>
    )
  }

  return (
    <table>
      <tbody>
        <StatisticLine text='good' value={good} />
        <StatisticLine text='neutral' value={neutral} />
        <StatisticLine text='bad' value={Math.abs(bad)} />
        <StatisticLine text='all' value={good + neutral + Math.abs(bad)} />
        <StatisticLine text='average' value={(good + bad) / (good + neutral + Math.abs(bad))} />
        <StatisticLine text='positive' value={good / (good + neutral + Math.abs(bad)) * 100} symbol='%' />
      </tbody>
    </table>

  )

}

const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const handleGood = () => {
    setGood(good + 1)
  }

  const handleNeutral = () => {
    setNeutral(neutral + 1)
  }

  const handleBad = () => {
    setBad(bad - 1)
  }


  return (
    <div>
      <h1>give feedback</h1>
      <Button onClick={handleGood} text='good' />
      <Button onClick={handleNeutral} text='neutral' />
      <Button onClick={handleBad} text='bad' />
      <h1>statistics</h1>
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

export default App