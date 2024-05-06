import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const CreateGiftForm = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [previousPrice, setPreviousPrice] = useState('');
  const [listId, setListId] = useState('');
  const [lists, setLists] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchLists();
  }, []);

  const fetchLists = async () => {
    try {
      const response = await axios.get('http://localhost:3000/lists');
      setLists(response.data);
    } catch (error) {
      console.error('Error fetching lists:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3000/gifts/create', {
        name,
        description,
        price,
        previous_price: previousPrice,
        list_id: listId
      });
      console.log('Gift created:', response.data);
      // Appel de la fonction sendNotification() après la création réussie du cadeau
      sendNotification(name, response.data.list_name);
      navigate(`/`);
    } catch (error) {
      console.error('Error creating gift:', error);
    }
  };

  // Définition de la fonction sendNotification() pour send la notification
  function sendNotification(giftName) {
    if ('serviceWorker' in navigator && Notification.permission === 'granted') {
      navigator.serviceWorker.getRegistration().then(function(registration) {
        registration.showNotification('New gift added', {
          body: `${giftName} has been added to this list`, // Utilisation du nom du cadeau et du nom de la liste dans le corps de la notification
        });
      });
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="name">Gift Name:</label>
        <input type="text" id="name" value={name} onChange={(e) => setName(e.target.value)} />
      </div>
      <div>
        <label htmlFor="description">Description:</label>
        <input type="text" id="description" value={description} onChange={(e) => setDescription(e.target.value)} />
      </div>
      <div>
        <label htmlFor="price">Price:</label>
        <input type="text" id="price" value={price} onChange={(e) => setPrice(e.target.value)} />
      </div>
      <div>
        <label htmlFor="previousPrice">Previous Price:</label>
        <input type="text" id="previousPrice" value={previousPrice} onChange={(e) => setPreviousPrice(e.target.value)} />
      </div>
      <div>
        <label htmlFor="listId">Select List:</label>
        <select id="listId" value={listId} onChange={(e) => setListId(e.target.value)}>
          <option value="">Select a List</option>
          {lists.map((list) => (
            <option key={list.id} value={list.id}>{list.name}</option>
          ))}
        </select>
      </div>
      <button type="submit">Create Gift</button>
    </form>
  );
};

export default CreateGiftForm;
