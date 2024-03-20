import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Gift from '../components/Gift';
import { useParams } from 'react-router-dom';

const GiftPage = () => {
  const { id } = useParams();
  const [gifts, setGifts] = useState([]);

  useEffect(() => {
    axios.get(`http://localhost:3000/lists/${id}`)
      .then(response => {
        console.log(response.data);
        if (response.data && response.data.gifts && Array.isArray(response.data.gifts)) {
          setGifts(response.data.gifts);
        } else {
          console.log('Gift data not found or not an array:', response.data);
        }
      })
      .catch(error => {
        console.error('Error fetching data: ', error);
      });
  }, [id]);
  

  return (
    <div>
      <h1>Gifts for List {id}</h1>
      {gifts.map(gift => (
        <Gift
          key={gift.id}
          giftName={gift.name}
          giftDescription={gift.description}
          giftPrice={gift.price}
          giftPreviousPrice={gift.previous_price}
        />
      ))}
    </div>
  );
};

export default GiftPage;
