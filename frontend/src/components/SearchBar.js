import React from 'react';

export default function SearchBar({ setTasks }) {
  const MatchingTask = async ({ target: { value } }) => {
    try {
      let response, data;

      if (value === '') {
        response = await fetch('/api/task');
        data = await response.json();
      } else {
        response = await fetch(`/api/task/search/${value}`);
        data = await response.json();
      }

      if (response.ok) {
        console.log(data);
        setTasks(data);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="searchbar">
      <input type="text" placeholder="Recherche" onChange={MatchingTask} />
    </div>
  );
}