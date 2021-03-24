import React, { useState } from 'react'

const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}>
    {text}
  </button>
)

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
  ]

  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState(Array.apply(null, new Array(anecdotes.length)).map(Number.prototype.valueOf,0))
  const [popularIndex, setPopular] = useState(0)

  const handleClick = () => {
    setSelected(Math.floor(Math.random() * anecdotes.length))
    console.log(votes)
  }

  const handleVote = () => {
    const copy = [...votes]
    copy[selected]++
    setVotes(copy)
    if (copy[selected] > copy[popularIndex]) {
      setPopular(selected)
    }
  }


  return (
    <div>
      <h1>Anecdote of the Day</h1>
      {anecdotes[selected]} <br /><br />
      has {votes[selected]} votes
      <br /><br />
      <Button handleClick = {handleClick} text={"Random Anecdote"}/>
      <Button handleClick = {handleVote} text={"Vote"}/>
      <h1>Favorite Anecdote</h1>
      {anecdotes[popularIndex]} <br /><br />
      has {votes[popularIndex]} votes
    </div>
  )
}

export default App
