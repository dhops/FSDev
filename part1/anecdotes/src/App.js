import React, { useState } from 'react'

const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}>
    {text}
  </button>
)

const Statistic = ({ text, value }) => (
  <tr><td>{text}:</td><td>{value}</td></tr>
)

const Statistics = ({ good, neutral, bad }) => {
  const total = good + neutral + bad
  if (total === 0) {
    return (
      <div>
        <h1>statistics</h1>
        <p>No feedback given</p>
      </div>
    )
  }
  else {
    return (
      <div>
        <h1>statistics</h1>
        <table>
          <Statistic text="Good" value={good} />
          <Statistic text="Neutral" value={neutral} />
          <Statistic text="Bad" value={bad} />
          <Statistic text="Average" value={(good-bad)/ total} />
          <Statistic text="Positive" value={100 * good / total} />
        </table>
      </div>
    )
  }
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const goodFeedback = () => {
    setGood(good + 1)
  }

  const badFeedback = () => {
    setBad(bad + 1)
  }

  const neutralFeedback = () => {
    setNeutral(neutral + 1)
  }
  console.log(good)
  return (
    <>
      <h1>give feedback</h1>
      <Button handleClick={goodFeedback} text="Good" />
      <Button handleClick={neutralFeedback} text="Neutral" />
      <Button handleClick={badFeedback} text="Bad" />
      <Statistics good={good} neutral={neutral} bad={bad} />
    </>
  )
}

export default App
