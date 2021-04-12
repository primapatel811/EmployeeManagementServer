import React, { useState } from 'react';

const AddEmployeeForm = (props) => {
  const [value, setLists] = useState('');

  const handleChange = (e) => {
    setLists(e.target.value );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (value === '') return;
    props.addEmployee(value);
    setLists('');
  };
  
    return (
      <form onSubmit={handleSubmit}>
        <input
          type='text'
          placeholder='Add Employee'
          value={value}
          onChange={handleChange}
        /> &nbsp;
        <input type='submit' value='Add Employee' />
      </form>
    );
  }


export default AddEmployeeForm;