import React from 'react';

const List = ({listName, listFor_who}) => {
  return (
    <div>
      <h2>{listName}</h2>
      <p>For: {listFor_who}</p>
    </div>
  );
}

export default List;
