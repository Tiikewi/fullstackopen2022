import axios from "axios";
import React, { useEffect, useState } from "react";

const Country = ({ filtered, handle }) => {
  if (filtered.length <= 10 && filtered.length > 1) {
    return (
      <div>
        {filtered.map((filtered, i) => (
          <div key={i}>
            <p key={filtered.name + 1}>
              {filtered.name}
              <button onClick={handle} id={filtered.name}>
                Show
              </button>
            </p>
          </div>
        ))}
      </div>
    );
  }
  if (filtered.length === 1) {
    const f = filtered[0];

    return (
      <div>
        <h1 key={f.name}>{f.name}</h1>
        <p key={f.capital}>Capital: {f.capital}</p>
        <p key={f.region}>Region: {f.region}</p>

        <h2>Languages</h2>
        <ul>
          {f.languages.map((language) => (
            <li key={language.name}>{language.name}</li>
          ))}
        </ul>
        <img id={f.flags.png} src={f.flags.png} alt="flag" />
      </div>
    );
  }

  return (
    <div>
      <p>Too many matches! Speficy filter.</p>
    </div>
  );
};

const App = () => {
  const [countries, setCountries] = useState([]);
  const [filterName, setFilterName] = useState("");

  // Get country info
  const hook = () => {
    axios.get("https://restcountries.com/v2/all").then((res) => {
      setCountries(res.data);
    });
  };
  useEffect(hook, []);

  // filter for filtering coutries by name
  const filtered = countries.filter((country) => {
    if (country.name.toLowerCase().startsWith(filterName.toLowerCase())) {
      return country;
    }
    return null;
  });

  const handleChange = (e) => {
    setFilterName(e.target.value);
  };

  const handleBtnClick = (e) => {
    setFilterName(e.target.id);
  };

  return (
    <div>
      Find countries: <input onChange={handleChange} />
      <Country filtered={filtered} handle={handleBtnClick} />
    </div>
  );
};

export default App;
