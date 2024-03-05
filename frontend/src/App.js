import React, { useEffect, useState } from 'react';
import axios from 'axios';
import List from './components/List';
import Gift from './components/Gift';

function App() {
  const [lists, setLists] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3000/lists')
      .then(response => {
        console.log(response.data);
        if (Array.isArray(response.data)) { // Vérifiez si response.data est un tableau
          setLists(response.data);
          console.log(response.data)
        } else {
          console.log('Data received is not an array:', response.data);
        }
      })
      .catch(error => {
        console.error('Error fetching data: ', error);
      });
  }, []);
  

  return (
    <div>
      <h1>My Lists</h1>
      {lists.map(list => (
        <div key={list.id}>
          <List listName={list.name} listFor_who={list.for_who} />
        </div>
      ))}
    </div>
  );
}

export default App;
