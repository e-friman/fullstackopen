import { useState } from 'react'


const Button = ({ onClick, text }) => <button onClick={onClick}>{text}</button>

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when dianosing patients.',
    'The only way to go fast, is to go well.'
  ]
  const ary = new Uint8Array(anecdotes.length)
  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState(ary)
  const [most, setMost] = useState(votes)

  const handleClick = () => setSelected(Math.round((anecdotes.length - 1) * Math.random()))

  const handleVote = () => {
    const copy = [...votes]
    copy[selected] += 1
    setVotes(copy)
    const max = Math.max(...copy)
    const index = copy.indexOf(max)
    setMost(index)
  }

  return (
    <div>
      <h2>Anecdote of the day</h2>
      {anecdotes[selected]}
      <div>has {votes[selected]} votes</div>
      <div>
        <Button onClick={handleVote} text='vote' />
        <Button onClick={handleClick} text='next anecdote' />
      </div>
      <h2>Anecdote with most votes</h2>
      <div>
        {anecdotes[most]}
        <div>has {votes[most]} votes</div>
      </div>
    </div>
  )
}

export default App