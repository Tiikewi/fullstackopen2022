import React from "react";

const PersonForm = ({
  addPerson,
  handleValueChange,
  handleNumChange,
  newName,
  newNum,
}) => {
  return (
    <div>
      <form onSubmit={addPerson}>
        <div>
          name: <input onChange={handleValueChange} value={newName} />
        </div>
        <div>
          number: <input onChange={handleNumChange} value={newNum} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
    </div>
  );
};

const Numbers = ({ person, filter, handleDelete }) => {
  if (!person.name.toLowerCase().startsWith(filter.toLowerCase())) {
    return null;
  }
  return (
    <div>
      <p key={person.name}>
        {person.name} {person.number}{" "}
        <button key={person.name} onClick={handleDelete}>
          Delete
        </button>
      </p>
    </div>
  );
};

const Filter = (props) => {
  return (
    <div>
      filter: <input onChange={props.onChange} />
    </div>
  );
};

export { PersonForm, Filter, Numbers };
