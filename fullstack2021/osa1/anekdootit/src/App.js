import React, { useState } from "react";

const Button = (props) => {
  return <button onClick={props.handleClick}>{props.text}</button>;
};

const Header = (props) => {
  return (
    <div>
      <h1>{props.text}</h1>
    </div>
  );
};

const Popular = (props) => {
  if (props.mostVoted === null) {
    return (
      <div>
        <p>No votes yet</p>
      </div>
    );
  }
  return (
    <div>
      <p>{props.anecdote}</p>
      <p>has {props.votes} votes</p>
    </div>
  );
};

const App = () => {
  const anecdotes = [
    "If it hurts, do it more often.",
    "Adding manpower to a late software project makes it later!",
    "The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
    "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
    "Premature optimization is the root of all evil.",
    "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
    "Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when dianosing patients.",
  ];

  const initPoints = Array(anecdotes.length).fill(0);

  const [selected, setSelected] = useState(0);
  const [points, setPoints] = useState(initPoints);
  const [mostVoted, setMostVoted] = useState(null);

  const handleNextClick = () => {
    setSelected(Math.floor(Math.random() * anecdotes.length));
  };
  const handleVoteClick = () => {
    const copy = { ...points };
    copy[selected] += 1;

    setPoints(copy);

    getMostVoted(copy);
  };

  const getMostVoted = (copy) => {
    let mostVoted = 0;
    let mostVotes = mostVoted;

    for (let i = 0; i < anecdotes.length; i++) {
      if (copy[i] >= mostVotes) {
        mostVotes = copy[i];
        mostVoted = i;
      }
    }
    setMostVoted(mostVoted);
  };

  return (
    <div>
      <Header text="Anecdote of the day" />
      <p>{anecdotes[selected]}</p>
      <p>has {points[selected]} points</p>

      <Button text="next anecdote" handleClick={handleNextClick} />
      <Button text="vote" handleClick={handleVoteClick} />

      <Header text="Anecdote with most votes" />
      <Popular
        mostVoted={mostVoted}
        anecdote={anecdotes[mostVoted]}
        votes={points[mostVoted]}
      />
    </div>
  );
};

export default App;
