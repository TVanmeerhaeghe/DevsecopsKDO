import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const ListPage = () => {
  const [lists, setLists] = useState([]);
  const [editableListId, setEditableListId] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    for_who: ''
  });

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

  const handleDelete = async (id, name) => {
    try {
      await axios.delete(`http://localhost:3000/lists/delete/${id}`);
      setLists(lists.filter(list => list.id !== id));
      sendNotification(name);
    } catch (error) {
      console.error('Error deleting list:', error);
    }
  };

  const handleEdit = (id, name, for_who) => {
    setEditableListId(id);
    setFormData({ name, for_who });
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (id) => {
    try {
      await axios.patch(`http://localhost:3000/lists/modify/${id}`, formData);
      setLists(lists.map(list => list.id === id ? { ...list, ...formData } : list));
      setEditableListId(null);
    } catch (error) {
      console.error('Error modifying list:', error);
    }
  };

  function sendNotification(listName) {
    if ('serviceWorker' in navigator && Notification.permission === 'granted') {
      navigator.serviceWorker.getRegistration().then(function(registration) {
        registration.showNotification('List deleted', {
          body: `${listName} has been deleted`,
        });
      });
    }
  }

  return (
    <div>
      <h1>My Lists <span><p>(Click to edit the list)</p></span></h1>
      {lists.map(list => (
        <div key={list.id}>
          {editableListId === list.id ? (
            <div>
              <input type="text" name="name" value={formData.name} onChange={handleChange} />
              <input type="text" name="for_who" value={formData.for_who} onChange={handleChange} />
              <button onClick={() => handleSubmit(list.id)}>Save</button>
            </div>
          ) : (
            <div>
              <h2 onClick={() => handleEdit(list.id, list.name, list.for_who)}>{list.name}</h2>
              <p onClick={() => handleEdit(list.id, list.name, list.for_who)}>For: {list.for_who}</p>
              <button onClick={() => handleDelete(list.id, list.name)} className='deletebtn'>Delete</button>
              <Link to={`/lists/${list.id}`}><button>View Gift</button></Link>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default ListPage;
