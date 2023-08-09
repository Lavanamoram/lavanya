import logo from './logo.svg';
import React, { useState, useEffect } from 'react';
import axios from 'axios'; //
import './App.css'
function App() {
 {
  // Define state variables
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [rollno, setRollno] = useState('');
  const [mail, setMail] = useState('');
  const [phoneNumbers, setPhoneNumbers] = useState([]);
  const [updateId, setUpdateId] = useState(null);

  // Fetch phone numbers on mount
  useEffect(() => {
    getPhoneNumbers();
  }, []);

  // Fetch all phone numbers from the server
  const getPhoneNumbers = async () => {
    try {
      const response = await axios.get('http://localhost:8080/get-id');
      setPhoneNumbers(response.data.data.phoneNumbers);
    } catch (err) {
      console.error(err);
    }
  };

  // Add or update phone number based on whether updateId is set
  const addOrUpdatePhoneNumber = async () => {
    if (name && phone) {
      if (updateId) {
        // Update phone number
        try {
          await axios.patch(`http://localhost:8080/update-id/${updateId}`, {
            name,
            phone,
            rollno,
            mail,
          });
          setUpdateId(null);
          setName('');
          setPhone('');
          setRollno('');
          setMail('');
          getPhoneNumbers();
        } catch (err) {
          console.error(err);
        }
      } else {
        // Add phone number
        try {
          await axios.post('http://localhost:8080/add-id', {
            name,
            phone,
            rollno,
            mail,
          });
          setName('');
          setPhone('');
          setRollno('');
          setMail('');
          getPhoneNumbers();
        } catch (err) {
          console.error(err);
        }
      }
    }
  };

  // Delete a phone number by id
  const deletePhoneNumber = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/delete-id/${id}`);
      getPhoneNumbers();
    } catch (err) {
      console.error(err);
    }
  };

  // Update state with the selected phone number
  const updatePhoneNumber = (phoneNumber) => {
    setUpdateId(phoneNumber._id);
    setName(phoneNumber.name);
    setPhone(phoneNumber.phone);
    setRollno(phoneNumber.rollno);
    setMail(phoneNumber.mail);
  };

  // Clear state and cancel update
  const cancelUpdate = () => {
    setUpdateId(null);
    setName('');
    setPhone('');
    setRollno('');
    setMail('');
  };

  // Render the component
  return (
  <div>
      <h1>STUDENT ID CARD</h1>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          addOrUpdatePhoneNumber();
        }}
      >
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Phone Number"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />
        <input
          type="text"
          placeholder="Roll no"
          value={rollno}
          onChange={(e) => setRollno(e.target.value)}
        />
        <input
          type="text"
          placeholder="mail"
          value={mail}
          onChange={(e) => setMail(e.target.value)}
        />

        <button type="submit">{updateId ? 'Update' : 'Add'}</button>
        {updateId && <button onClick={cancelUpdate}>Cancel</button>}
      </form>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Phone Number</th>
            <th>Roll NO</th>
            <th>EMAIL</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {phoneNumbers.map((phoneNumber) => (
            <tr key={phoneNumber._id}>
              <td>{phoneNumber.name}</td>
              <td>{phoneNumber.phone}</td>
              <td>{phoneNumber.rollno}</td>
              <td>{phoneNumber.mail}</td>
              <td>
                <button onClick={() => updatePhoneNumber(phoneNumber)}>Edit</button>
                <button onClick={() => deletePhoneNumber(phoneNumber._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
  }
}
export default App;

