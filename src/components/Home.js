import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'

const Home = () => {
  const contactsObj = useSelector((state) => state);
  const contacts = Object.values(contactsObj);
  const dispatch =  useDispatch();

  const deleteContact = (id) => {
    dispatch({type: "DELETE_CONTACT", payload:id});
    toast.success("Contact deleted Successfuly");
  }
  return (
   <div className="container">
    <div className='row'>
      <div className='col-md-12 my-5 d-flex justify-content-end'>
        <Link to="/add" className='btn btn-outline-dark'>Add Contact</Link>
      </div>
      <div className='col-md-12 my-5 flex-start'>
      <form className='row'>
                            <div className="col">
                            <div className="mb-2">
                            <input type="text" className='form-control' placeholder='Search Names' />
                            </div>
                            </div>
                            <div className="col">
                            <div className="mb-2">
                                <input type="submit" className='btn btn-outline-dark' value='Search' />
                            </div>
                            </div>   
                        </form>
      </div>    
        <div className='col-md-6 mx-auto'>
        <table className='table table-hover'>
          <thead className='text-white bg-dark text-center'>
            <tr>
              <th scope='col'>#</th>
              <th scope='col'>Name</th>
              <th scope='col'>Email</th>
              <th scope='col'>Number</th>
              <th scope='col'>Action</th>
            </tr>
          </thead>
          <tbody>
            {contacts.map((contact, id)=>(
              <tr key={id}>
                <td>{id + 1}</td>
                <td>{contact.name}</td>
                <td>{contact.email}</td>
                <td>{contact.number}</td>
                <td>
                  <Link to ={`/edit/${contact.id}`} className='btn btn-small btn-primary mr-2'>Edit</Link>
                  <button type='button' onClick={()=>deleteContact(contact.id)} className='btn btn-small btn-danger ml-2'>Delete</button>
                </td>
              </tr>
            ))
            }
          </tbody>
        </table>

        </div>
    </div>
   </div>
  )
}

export default Home