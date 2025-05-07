const Course = ({ course }) => {
  return (
    <div>
      <Header header={course.name} />
      <Content parts={course.parts} />
      <Total total={course.parts} />
    </div>
  );
};
const Header = ({ header }) => {
  return (
    <h2>{header}</h2>
  );
};
const Content = ({ parts }) => {
  return (
    <div>
      {parts.map((part, i) => <Part key={i} name={part.name} exercises={part.exercises} />
      )}
    </div>
  );
};
const Part = ({ name, exercises }) => {
  return (
    <p>{name} {exercises}</p>
  );
};
const Total = ({ total }) => {
  const totali = total.reduce((sum, part) => sum + part.exercises, 0);
  return <div><b>total of {totali} exercises</b></div>;
};

export default Course
