import React from 'react';
import { useTasksContext } from '../hooks/useTasksContext'
import '../styles/searchtask.css'

const SearchBar = () => {
  const { dispatch } = useTasksContext()

  const handleSearch = async (event) => {
    try {
      const searchInput = event.target.value.toLowerCase();
  
      if (searchInput.trim() === '') {
        // If search input is empty, call getTasks function instead
        const response = await fetch('/api/task');
        const data = await response.json();
  
        if (response.ok) {
          dispatch({ type: 'SET_TASKS', payload: data });
        }
      } else {
        // Otherwise, call searchTask function with the search input
        const response = await fetch(`/api/task/search/${searchInput}`);
        const data = await response.json();
  
        if (response.ok) {
          dispatch({ type: 'SEARCH_TASKS', payload: data });
        }
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="searchbar">
      <input type="text" placeholder="Recherche" onChange={handleSearch} />
    </div>
  );
};

export default SearchBar;
