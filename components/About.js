import React from 'react';
import Header from './Header';
import Footer from './Footer';

const About = () => {
    return (
        // <div className='about'>
        //     <Header title='Employee Management System'/>
        //     <h2>About us: </h2>
        //     Employee Management System provides an website for company to save the record of their employees. 
        //     <Footer/>
        // </div>
<div>
<Header title='Employee Management System'/>
<h2 ><center>Our Team</center></h2>
<center>
<div class="row">
  <div class="column">
    <div class="card">
      <img src="/assets/jainish.jpg" alt="Jainish" className='img'/>
      <div class="container">
        <h2>Jainish Patel</h2>
        <p class="title">CEO & Founder</p>
        <p>MEAN STACK DEVELOPER</p>
        <p>jainish.patel215@gmail.com</p>
        <p><button class="button">Contact</button></p>
      </div>
    </div>
  </div>

  <div class="column">
    <div class="card">
      <img src="/assets/prima.jpg" alt="Prima" className='img'/>
      <div class="container">
        <h2>Prima Patel</h2>
        <p class="title">CEO & Founder</p>
        <p>MEAN STACK DEVELOPER</p>
        <p>patelprima22@gmail.com</p>
        <p><button class="button">Contact</button></p>
      </div>
    </div>
  </div>
</div>
</center>
<Footer/>
</div>
    )
}

export default About;
