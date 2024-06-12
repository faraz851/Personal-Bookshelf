import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      if (query.length < 3) {
        setResults([]);
        return;
      }

      try {
        const response = await fetch(`https://openlibrary.org/search.json?q=${query}&limit=10&page=1`);
        const data = await response.json();
        setResults(data.docs);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [query]);

  return (
    <div className="container">
      <h1>Search by book name</h1>
      <input 
        type="text" 
        id="search-input" 
        placeholder="Type a book name..." 
        value={query} 
        onChange={(e) => setQuery(e.target.value)} 
      />
      <div id="results-container">
        {results.map((book) => (
          <div key={book.key} className="book-card">
            <h3>{book.title}</h3>
            <p>{book.author_name ? book.author_name.join(', ') : 'Unknown Author'}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;