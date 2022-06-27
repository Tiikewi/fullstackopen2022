import React, { useState } from "react";

const Header = (props) => {
  return (
    <div>
      <h1>{props.text}</h1>
    </div>
  );
};

const Button = (props) => {
  return (
    <div>
      <button onClick={props.handleClick}>{props.btnText}</button>
    </div>
  );
};

const Statistics = (props) => {
  const countAverage = () => {
    if (props.total === 0) return 0;
    return (props.good + -1 * props.bad) / props.total;
  };

  const countPositive = () => {
    if (props.total === 0) return 0;
    return (props.good / props.total) * 100;
  };

  if (props.total > 0) {
    return (
      <div>
        <table>
          <StatisticLine text="Neutral" amount={props.neutral} />
          <StatisticLine text="Bad" amount={props.bad} />
          <StatisticLine text="All" amount={props.total} />
          <StatisticLine text="Average" amount={countAverage()} />
          <StatisticLine text="Positive" amount={countPositive()} symbol="%" />
        </table>
      </div>
    );
  }
  return (
    <div>
      <p>No feedback given</p>
    </div>
  );
};

const StatisticLine = (props) => {
  return (
    <tbody>
      <tr>
        <td>{props.text}</td>
        <td>
          {props.amount} {props.symbol}
        </td>
      </tr>
    </tbody>
  );
};

const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const [total, setTotal] = useState(0);

  const handleGoodClick = () => {
    setGood(good + 1);
    setTotal(total + 1);
  };
  const handleNeutralClick = () => {
    setNeutral(neutral + 1);
    setTotal(total + 1);
  };
  const handleBadClick = () => {
    setBad(bad + 1);
    setTotal(total + 1);
  };

  return (
    <div>
      <Header text="Give feedback" />

      <Button handleClick={handleGoodClick} btnText="Good" />
      <Button handleClick={handleNeutralClick} btnText="Neutral" />
      <Button handleClick={handleBadClick} btnText="Bad" />

      <Header text="Statistics" />

      <Statistics good={good} bad={bad} neutral={neutral} total={total} />
    </div>
  );
};

export default App;
