import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify';
import { useHistory, useNavigate } from 'react-router-dom';

const AddContact = () => {
  const [name, setName] =  useState("");
  const [email, setEmail] =  useState("");
  const [number, setNumber] =  useState("");
  const contacts =  useSelector((state)=> state);
  const dispatch = useDispatch();

  const navigate = useNavigate();
 
  const isValidEmail = (email) => {
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return emailRegex.test(email);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
  
    if (!contacts || !contacts.contacts || !contacts.contacts.length) {
      toast.error('No contacts found!');
      return;
    }
  
    if (contacts.contacts.length < 1) {
      toast.error('Not enough contacts to generate a new id!');
      return;
    }
  
    const lastContact = contacts.contacts[contacts.contacts.length - 1];
    if (!lastContact || !lastContact.id) {
      toast.error('Last contact has no id!');
      return;
    }
  
    const checkEmail = contacts.contacts.find(contact => contact.email === email && email)
    const checkNumber = contacts.contacts.find(contact => contact.number === parseInt(number))
    if(! email  || !name || !number){
      toast.warning("Please Fill in all fields!");
      return;
    }
    if ( !isValidEmail(email)){
      toast.error('Invalid Email!');
    }
    if(checkEmail){
      return toast.error("This email already Exists!")
    }
    if(checkNumber){
      return toast.error("This number already Exists!")
    }
  
    const data = {
      id : lastContact.id + 1 ,
      name,
      email,
      number
    }
   dispatch({type: "ADD_CONTACT",  payload:data})
   toast.success("New Contact Created Successfully!")
   navigate("/");
  };

  return (
<div className="container">
<div className='row'>
  <h1 className=' display-3 my-5 d-flex justify-content-center text-center'>
    Add Contact
  </h1>
  <div className='col-md-6 shadow mx-auto p-5'>
    <form onSubmit={handleSubmit}>
      <div className="form-group mb-2">
        <input type='text' placeholder='Name' className='form-control' value={name} onChange={e => setName(e.target.value)}/>
      </div>
      <div className="form-group mb-2">
        <input type='email' placeholder='Email' className='form-control' value={email} onChange={e => setEmail(e.target.value)}/>
      </div>
      <div className="form-group mb-2">
        <input type='text' placeholder='Phone Number' className='form-control'value={number} onChange={e => setNumber(e.target.value)}/>
      </div>
      <div className="form-group">
        <input type='Submit' value='Add Contact' className='btn btn-block btn-dark'/>
      </div>
    </form>
  </div>
</div>
   </div>
  )
}
export default AddContact
