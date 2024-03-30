import React from 'react';
import CreateListForm from '../components/CreateListForm';
import CreateGiftForm from '../components/CreateGiftForm';

const CreatePage = () => {
  return (
    <div>
      <div>
        <h1>Create a New List</h1>
        <CreateListForm />
      </div>
      <div>
        <h1>Create a New Gift</h1>
        <CreateGiftForm />
      </div>
    </div>
  );
};

export default CreatePage;
