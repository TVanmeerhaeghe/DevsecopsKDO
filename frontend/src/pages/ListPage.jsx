import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const ListPage = () => {
  const [lists, setLists] = useState([]);
  
  useEffect(() => {
    axios.get('http://localhost:3000/lists')
      .then(response => {
        console.log(response.data);
        if (Array.isArray(response.data)) {
          setLists(response.data);
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
          <h2>{list.name}</h2>
          <p>For: {list.for_who}</p>
          <Link to={`/gifts/${list.id}`}>View Gifts</Link>
          console.log(${list.id})
        </div>
      ))}
    </div>
  );
};

export default ListPage;
