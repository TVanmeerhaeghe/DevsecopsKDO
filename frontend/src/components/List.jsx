import React from 'react';

const List = ({listName, listForWho}) => {
  return (
    <div>
      <h2>{listName}</h2>
      <p>For: {listForWho}</p>
    </div>
  );
}

export default List;
