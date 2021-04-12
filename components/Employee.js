import React from 'react';

const Employee = (props) => {
  
  return (
    <div className='employee'>
      <span className='employee-name'>{props.name}</span>
      <span> {props.id}</span>
      
    </div>
  );
};

export default Employee;
