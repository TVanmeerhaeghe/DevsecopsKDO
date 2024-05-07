import React, { useEffect, useState } from 'react';
import axios from 'axios';

const GiftPage = () => {
  const [gifts, setGifts] = useState([]);
  const [editableGiftId, setEditableGiftId] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    previous_price: '',
    list_id: ''
  });
  const [previousPrice, setPreviousPrice] = useState('');

  useEffect(() => {
    axios.get('http://localhost:3000/gifts')
      .then(response => {
        console.log(response.data);
        if (Array.isArray(response.data)) {
          setGifts(response.data);
        } else {
          console.log('Data received is not an array:', response.data);
        }
      })
      .catch(error => {
        console.error('Error fetching data: ', error);
      });
  }, []);

  const handleDelete = async (id, name) => {
    try {
      await axios.delete(`http://localhost:3000/gifts/delete/${id}`);
      setGifts(gifts.filter(gift => gift.id !== id));
      envoyerNotification(name);
    } catch (error) {
      console.error('Error deleting gift:', error);
    }
  };

  const handleEdit = (id, name, description, price, previousPrice, listId) => {
    setEditableGiftId(id);
    setFormData({ name, description, price, previous_price: previousPrice, list_id: listId });
    setPreviousPrice(price);
  };

  const handleChange = (e) => {
    if (e.target.name === "price") {
      setFormData({
        ...formData,
        [e.target.name]: e.target.value,
        previous_price: previousPrice
      });
    } else {
      setFormData({
        ...formData,
        [e.target.name]: e.target.value
      });
    }
  };

  const handleSubmit = async (id) => {
    try {
      await axios.patch(`http://localhost:3000/gifts/modify/${id}`, formData);
      setGifts(gifts.map(gift => gift.id === id ? { ...gift, ...formData } : gift));
      setEditableGiftId(null);
    } catch (error) {
      console.error('Error modifying gift:', error);
    }
  };

  function envoyerNotification(giftName) {
    if ('serviceWorker' in navigator && Notification.permission === 'granted') {
      navigator.serviceWorker.getRegistration().then(function(registration) {
        registration.showNotification('Gift deleted', {
          body: `${giftName} has been deleted`,
        });
      });
    }
  }

  return (
    <div>
      <h1>My Gifts</h1>
      {gifts.map(gift => (
        <div key={gift.id}>
          {editableGiftId === gift.id ? (
            <div>
              <input type="text" name="name" value={formData.name} onChange={handleChange} />
              <input type="text" name="description" value={formData.description} onChange={handleChange} />
              <input type="text" name="price" value={formData.price} onChange={handleChange} />
              <input type="text" name="previous_price" value={formData.previous_price} onChange={handleChange} />
              <input type="text" name="list_id" value={formData.list_id} onChange={handleChange} />
              <button onClick={() => handleSubmit(gift.id)}>Save</button>
            </div>
          ) : (
            <div>
              <h2 onClick={() => handleEdit(gift.id, gift.name, gift.description, gift.price, gift.previous_price, gift.list_id)}>{gift.name}</h2>
              <p onClick={() => handleEdit(gift.id, gift.name, gift.description, gift.price, gift.previous_price, gift.list_id)}>Description: {gift.description}</p>
              <p onClick={() => handleEdit(gift.id, gift.name, gift.description, gift.price, gift.previous_price, gift.list_id)}>Price: {gift.price}</p>
              <p onClick={() => handleEdit(gift.id, gift.name, gift.description, gift.price, gift.previous_price, gift.list_id)}>Previous Price: {gift.previous_price}</p>
              <p onClick={() => handleEdit(gift.id, gift.name, gift.description, gift.price, gift.previous_price, gift.list_id)}>List ID: {gift.list_id}</p>
              <button onClick={() => handleDelete(gift.id, gift.name)}>Delete</button>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default GiftPage;
