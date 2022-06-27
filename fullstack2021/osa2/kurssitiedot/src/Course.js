import React from "react";

const Course = ({ course }) => {
  const total = course.parts.reduce((prev, key) => {
    return key.exercises + prev;
  }, 0);

  return (
    <div>
      <Header courseName={course.name} />
      <Content parts={course.parts} />
      <Total total={total} />
    </div>
  );
};

const Header = (props) => {
  return (
    <div>
      <h1>{props.courseName}</h1>
    </div>
  );
};

const Content = ({ parts }) => {
  return (
    <div>
      {parts.map((part) => (
        <Part key={part.id} part={part.name} exercises={part.exercises} />
      ))}
    </div>
  );
};

const Part = (props) => {
  return (
    <div>
      <p>
        {props.part} {props.exercises}
      </p>
    </div>
  );
};

const Total = ({ total }) => {
  return (
    <div>
      <p>
        <strong>total of {total} exercises</strong>
      </p>
    </div>
  );
};

export default Course;
