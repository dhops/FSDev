import React from 'react'

const Header = (props) => {
  return (
    <h2>{props.course}</h2>
  )
}

const Part = (props) => {
  return (
    <p>
      {props.part.name} {props.part.exercises}
    </p>
  )
}

const Content = ({parts}) => {
  return (
    <ul>
      {parts.map(part =>
        <Part key={part.id} part={part} />
      )}
    </ul>
  )
}

const Total = ({parts}) => {
  return (
    <p><strong>Total Exercises: {parts.map(part => part.exercises).reduce((a, b) => a + b, 0)}</strong></p>
  )
}

const Course = ({course}) => {
  return (
    <>
      <Header course={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
      <div>
    </div>
    </>
  )
}

export default Course
