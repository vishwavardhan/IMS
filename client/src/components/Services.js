// client/src/components/Services.js
import React, { useState, useEffect } from 'react';
import Navbar from './Navbar';
import ServiceTable from './ServiceTable';
import axios from 'axios';
import './Services.css';

export default function Services(props) {
  const [services, setServices] = useState([]);
  const [addingService, setAddingService] = useState(false);
  const tableHeadings = ["ID", "Type", "Quantity", "Price", "Tracking ID", "Attachment"];

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    try {
      const response = await axios.get('http://localhost:5000/services');
      setServices(response.data);
    } catch (error) {
      console.log('Error fetching services:', error);
    }
  };

  const addNewService = async () => {
    const newServiceId = document.getElementById('newServiceId').value;
    const newServiceType = document.getElementById('newServiceType').value;
    const newServiceQuantity = document.getElementById('newServiceQuantity').value;
    const newServicePrice = document.getElementById('newServicePrice').value;
    const newServiceTrackingId = document.getElementById('newServiceTrackingId').value;

    if (!newServiceId || !newServiceType || !newServiceQuantity || !newServicePrice || !newServiceTrackingId) {
      alert('All fields are mandatory to fill');
      return;
    }

    try {
      const response = await axios.post('http://localhost:5000/services/add', {
        id: newServiceId,
        type: newServiceType,
        quantity: newServiceQuantity,
        price: newServicePrice,
        trackingId: newServiceTrackingId,
        attachment: 'None'
      });

      if (response.data.status) {
        fetchServices();
        toggleNewService();
      } else {
        alert(response.data.message);
      }
    } catch (error) {
      if (error.response && error.response.data.message) {
        alert(error.response.data.message);
      } else {
        console.log('Error adding new service:', error);
      }
    }
  };

  const toggleNewService = () => {
    const element = document.getElementById('addServiceContainer');
    if (!addingService) {
      setAddingService(true);
      element.classList.remove('d-none');
    } else {
      setAddingService(false);
      element.classList.add('d-none');
    }
  };

  const deleteService = async (serviceId) => {
    try {
      await axios.delete(`http://localhost:5000/services/delete/${serviceId}`);
      fetchServices();
    } catch (error) {
      console.log('Error deleting service:', error);
    }
  };

  return (
    <>
      <div style={addingService ? { opacity: '0.5' } : {}}>
        <Navbar name={props.name} />
        <h1 style={{ textAlign: 'center', marginTop: '10vh' }}>SERVICES</h1>
        <div className="d-flex justify-content-end">
          <button className="btn btn-primary mx-5" onClick={() => toggleNewService()}>
            Add new service
          </button>
        </div>
        <div className="services-container py-5 d-flex justify-content-center my-1" style={{ margin: '2rem', border: '2px solid black', borderRadius: '10px' }}>
          <div className="services-list mx-5 d-flex flex-column align-items-center" style={{ width: '80vw' }}>
            <h2 className="my-4">Services</h2>
            <ServiceTable headings={tableHeadings} data={services} onDelete={deleteService} />
          </div>
        </div>
      </div>

      <div className="addService d-flex d-none flex-column align-items-center" id='addServiceContainer'>
        <div className="d-flex justify-content-end fa-xl" style={{ cursor: 'pointer', width: '100%' }}>
          <i className="fa-solid fa-rectangle-xmark" onClick={toggleNewService}></i>
        </div>
        <h1 className='my-5'>ADD NEW SERVICE</h1>
        <div className='my-1' style={{ width: '22rem' }}>
          <span className='mx-3' style={{ width: '5rem' }}>Enter Service ID</span>
          <input type='number' style={{ width: '12rem', float: 'right' }} id='newServiceId' />
        </div>
        <div className='my-1' style={{ width: '22rem' }}>
          <span className='mx-3' style={{ width: '5rem' }}>Service type</span>
          <input type='text' style={{ width: '12rem', float: 'right' }} id='newServiceType' />
        </div>
        <div className='my-1' style={{ width: '22rem' }}>
          <span className='mx-3' style={{ width: '5rem' }}>Enter Quantity</span>
          <input type='number' style={{ width: '12rem', float: 'right' }} id='newServiceQuantity' />
        </div>
        <div className='my-1' style={{ width: '22rem' }}>
          <span className='mx-3' style={{ width: '5rem' }}>Enter Price</span>
          <input type='number' style={{ width: '12rem', float: 'right' }} id='newServicePrice' />
        </div>
        <div className='my-1' style={{ width: '22rem' }}>
          <span className='mx-3' style={{ width: '5rem' }}>Enter Tracking ID</span>
          <input type='text' style={{ width: '12rem', float: 'right' }} id='newServiceTrackingId' />
        </div>
        <button className="btn btn-primary m-5" onClick={addNewService}>Add new service</button>
      </div>
    </>
  );
}
