import React from 'react';


const Header1 = (props) => {
    return (
      <div className='header1 row' >
          <div className='col-5'></div>
           <div className='col-6 emp-list'> {props.title} </div> 
           <div className='col-1 emp-total'>Total: {props.totalEmployees}</div>
           
      </div>
    );
  };
  
  export default Header1;
  