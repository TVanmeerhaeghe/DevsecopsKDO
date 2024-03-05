import React from 'react';

const Gift = ({giftName, giftDescription, giftPrice, giftPreviousPrice}) => {
  return (
    <div>
      <h3>{giftName}</h3>
      <p>Description: {giftDescription}</p>
      <p>Price: {giftPrice}</p>
      <p>Price: {giftPreviousPrice}</p>
    </div>
  );
}

export default Gift;
