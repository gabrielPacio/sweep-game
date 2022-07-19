import React from 'react';

const Box = ({position, value, onClick}) => {
  return (
    <div className="box" onClick={onClick} style={{top: position[1] * 50, left: position[0] * 50}}>{value}</div>
  );
}

export default Box;
