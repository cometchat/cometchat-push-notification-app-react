import React from 'react';
import './Heading.css';

function Heading({ text }) {
  return (
    <h1 className='heading' style={{ color: '#3b96ff' }}>
      { text }
    </h1>
  );
}

export default Heading;
