import React, { useEffect, useState } from 'react';
import axios from 'axios';
import List from './components/List';
import Gift from './components/Gift';

function App() {
  const [lists, setLists] = useState([]);

  useEffect(() => {
    axios.get('/')
      .then(response => {
        console.log(response.data);
        setLists(response.data);
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
          <List list={list} />
          {list.gifts.map(gift => (
            <Gift key={gift.list_id} giftName={gift.name} giftDescription={gift.description} giftPrice={gift.price} giftPreviousPrice={gift.previous_price}/>
          ))}
        </div>
      ))}
    </div>
  );
}

export default App;
