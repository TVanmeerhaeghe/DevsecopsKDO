import React from 'react';

const Gift = ({giftName, giftDescription, giftPrice, giftAncienPrice}) => {
  return (
    <div>
      <h3>{giftName}</h3>
      <p>Description: {giftDescription}</p>
      <p>Price: {giftPrice}</p>
      <p>Ancient Price: {giftAncienPrice}</p>
    </div>
  );
}

export default Gift;
