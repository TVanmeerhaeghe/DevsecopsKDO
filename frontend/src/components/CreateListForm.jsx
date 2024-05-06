import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const CreateListForm = () => {
  const [name, setName] = useState('');
  const [forWho, setForWho] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3000/lists/create', {
        name,
        for_who: forWho,
        ended: true
      });
      console.log('List created:', response.data);
      sendNotification(name);
      navigate(`/`);
    } catch (error) {
      console.error('Error creating list:', error);
    }
  };

  function sendNotification(listName) {
    if ('serviceWorker' in navigator && Notification.permission === 'granted') {
      navigator.serviceWorker.getRegistration().then(function(registration) {
        registration.showNotification('New list added', {
          body: `${listName} has been created`,
        });
      });
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="name">List Name:</label>
        <input type="text" id="name" value={name} onChange={(e) => setName(e.target.value)} />
      </div>
      <div>
        <label htmlFor="forWho">For:</label>
        <input type="text" id="forWho" value={forWho} onChange={(e) => setForWho(e.target.value)} />
      </div>
      <button type="submit">Create List</button>
    </form>
  );
};

export default CreateListForm;
