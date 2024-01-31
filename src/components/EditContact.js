import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom'
import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const EditContact = () => {
  const [name, setName] =  useState("");
  const [email, setEmail] =  useState("");
  const [number, setNumber] =  useState("");
  const { id } = useParams();
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const contacts = useSelector(state => state);
  let currentContact;
  if (Array.isArray(contacts)) {
    currentContact = contacts.find(contact => contact.id === parseInt(id));
  }

  useEffect(()=> {
    if (currentContact){
      setName(currentContact.name)
      setEmail(currentContact.email)
      setNumber(currentContact.number)
    }
    
  },[currentContact])
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
  
    const checkEmail = contacts.contacts.find((contact) =>contact.id !== parseInt(id) && contact.email === email)
    const checkNumber = contacts.contacts.find((contact) =>contact.id !== parseInt(id) && contact.number === number)
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
      id : parseInt(id) ,
      name,
      email,
      number
    }
   dispatch({type: "UPDATE_CONTACT",  payload:data})
   toast.success("New Contact Created Successfully!")
   navigate("/");
  };


return (
<div className="container">
  {
    currentContact ? (
      <>
      <h1 className=' display-3 my-5 d-flex justify-content-center text-center'>
        Edit Contact {id}
      </h1>
          <div className='row'>    
        <div className='col-md-6 shadow mx-auto p-5'>
        <form onSubmit={handleSubmit}>
            <div className="form-group mb-2">
                <input type='text' placeholder='Name' className='form-control' value={name} onChange={e => setName(e.target.value)}/>
            </div>
            <div className="form-group mb-2">
                <input type='email' placeholder='Email' className='form-control' value={email} onChange={e => setEmail(e.target.value)}/>
            </div>
            <div className="form-group mb-2">
                <input type='text' placeholder='Phone Number' className='form-control' value={number} onChange={e => setNumber(e.target.value)}/>
            </div>
            <div className="form-group d-flex justify-content-between align-items-center">
                <input type='Submit' value='Update Contact' className='btn btn-dark'/>
                <Link to="/" className="btn btn-danger ml-3 ml-md-5 ">
                    Cancel
            </Link>
            </div>
        </form>
        </div>
    </div>
      </>
    ):(
      <h1 className=' display-3 my-5 d-flex justify-content-center text-center'>
       Contact with id : {id} not found!
      </h1>
    )
  };

   </div>
  )
}

export default EditContact
