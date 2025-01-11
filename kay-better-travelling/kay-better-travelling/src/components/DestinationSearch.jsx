import React, { useState } from 'react';
import axios from 'axios';
import { getToken } from '../api'; // Import the API utility

const DestinationSearch = () => {
  const [destination, setDestination] = useState('');
  const [results, setResults] = useState([]);
  const [error, setError] = useState('');

  const handleSearch = async () => {
    if (destination.trim()) {
      try {
        // Get the access token
        const token = await getToken();
        if (!token) {
          setError('Failed to fetch destinations. Please try again.');
          return;
        }

        // Make the API call to fetch destinations
        const response = await axios.get(
          `https://test.api.amadeus.com/v1/reference-data/locations?subType=CITY&keyword=${destination}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setResults(response.data.data || []);
        setError(''); // Clear any previous errors
      } catch (error) {
        console.error('Error fetching destinations:', error);
        setError('Failed to fetch destinations. Please try again.');
      }
    }
  };

  return (
    <div>
      <h1>Search for a Destination</h1>
      <input
        type="text"
        value={destination}
        onChange={(e) => setDestination(e.target.value)}
        placeholder="Enter a destination"
      />
      <button onClick={handleSearch}>Search</button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <ul>
        {results.map((result) => (
          <li key={result.id}>
            {result.name} ({result.countryCode})
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DestinationSearch;
