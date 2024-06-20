// client/src/components/Orders.js
import React, { useState, useEffect } from 'react';
import Navbar from './Navbar';
import OrderTable from './OrderTable';
import axios from 'axios';
import { handlePdfDownload, handleXlDownload } from '../utils/downloadUtils';

function Orders(props) {
  const [pendingOrders, setPendingOrders] = useState([]);
  const [completedOrders, setCompletedOrders] = useState([]);
  const [addingOrder, setAddingOrder] = useState(false);
  const [modifyingOrder, setModifyingOrder] = useState(false);
  const tableHeadings = ["ID", "Type", "Quantity"];

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:5000/orders');
      const orders = response.data;
      setPendingOrders(orders.filter((order) => order.state === 'pending'));
      setCompletedOrders(orders.filter((order) => order.state === 'completed'));
    } catch (error) {
      console.log('Error fetching orders:', error);
    }
  };

  const addNewOrder = async () => {
    const newOrderId = document.getElementById('newOrderId').value;
    const newOrderType = document.getElementById('newOrderType').value;
    const newOrderQuantity = document.getElementById('newOrderQuantity').value;
    const newOrderState = document.getElementById('newOrderState').value;

    if (!newOrderId || !newOrderType || !newOrderQuantity || !newOrderState) {
      alert('All fields are mandatory to fill');
      return;
    }

    try {
      const response = await axios.post('http://localhost:5000/orders/add', {
        id: newOrderId,
        type: newOrderType,
        quantity: newOrderQuantity,
        state: newOrderState,
      });

      if (response.data.status) {
        fetchData();
        toggleNewOrder();
      }
    } catch (error) {
      if (error.response && error.response.data.error) {
        // Display an alert if duplicate id error
        alert(error.response.data.error);
      } else {
        console.log('Error adding new order:', error);
      }
    }
  };

  const handleModifyOrder = async () => {
    const newOrderId = document.getElementById('newOrderId').value;
    const newOrderType = document.getElementById('newOrderType').value;
    const newOrderQuantity = document.getElementById('newOrderQuantity').value;
    if (!newOrderId || !newOrderType || !newOrderQuantity) {
      alert('All fields are mandatory to fill');
      return;
    }

    try {
      const response = await axios.post('http://localhost:5000/orders/modify', {
        id: newOrderId,
        type: newOrderType,
        quantity: newOrderQuantity,
      });

      if (response.data.status) {
        fetchData();
        toggleModifyOrder();
      }
    } catch (error) {
      if (error.response && error.response.data.error) {
        // Display an alert if duplicate id error
        alert(error.response.data.error);
      } else {
        console.log('Error modifying order:', error);
      }
    }
  };

  const toggleNewOrder = () => {
    const element = document.getElementById('addOrderContainer');
    if (!addingOrder) {
      setAddingOrder(true);
      element.classList.remove('d-none');
    } else {
      setAddingOrder(false);
      element.classList.add('d-none');
    }
  };

  const toggleModifyOrder = () => {
    const element = document.getElementById('addOrderContainer');
    if (!modifyingOrder) {
      setModifyingOrder(true);
      element.classList.remove('d-none');
    } else {
      setModifyingOrder(false);
      element.classList.add('d-none');
    }
  };

  const deleteOrder = async (orderId) => {
    try {
      await axios.delete(`http://localhost:5000/orders/delete/${orderId}`);
      fetchData();
    } catch (error) {
      console.log('Error deleting order:', error);
    }
  };

  const markAsCompleted = async (orderId) => {
    try {
      await axios.put(`http://localhost:5000/orders/convert/${orderId}`);
      fetchData();
    } catch (error) {
      console.log('Error marking order as completed:', error);
    }
  };

  const markAsPending = async (orderId) => {
    try {
      await axios.put(`http://localhost:5000/orders/convert-to-pending/${orderId}`);
      fetchData();
    } catch (error) {
      console.log('Error marking order as pending:', error);
    }
  };

  return (
    <>
      <div style={addingOrder || modifyingOrder ? { opacity: '0.5' } : {}}>
        <Navbar name={props.name} />
        <h1 style={{ textAlign: 'center', marginTop: '10vh' }}>ORDERS</h1>
        <div className="d-flex justify-content-end">
          <button className="btn btn-primary mx-5" onClick={() => toggleNewOrder()}>
            Add new order
          </button>
        </div>
        <div className="orders-container py-5 d-flex justify-content-center my-1" style={{ margin: '2rem', border: '2px solid black', borderRadius: '10px' }}>
          <div className="pending-orders mx-5 d-flex flex-column align-items-center" style={{ width: '40vw' }}>
            <h2 className="my-4">Pending Orders</h2>
            <OrderTable headings={tableHeadings} data={pendingOrders} onDelete={deleteOrder} onMarkAsCompleted={markAsCompleted} orderType="Pending" onPdfDownload={() => handlePdfDownload('pending-orders')} onXlDownload={() => handleXlDownload('pending-orders')} onModifyOrder={() => toggleModifyOrder()} />
          </div>
          <div className="completed-orders mx-5 d-flex flex-column align-items-center" style={{ width: '40vw' }}>
            <h2 className="my-4">Completed Orders</h2>
            <OrderTable headings={tableHeadings} data={completedOrders} onDelete={deleteOrder} orderType="Completed" onMarkAsPending={markAsPending} onPdfDownload={() => handlePdfDownload('completed-orders')} onXlDownload={() => handleXlDownload('completed-orders')} onModifyOrder={() => toggleModifyOrder()} />
          </div>
        </div>
      </div>

      <div className="addOrder d-flex d-none flex-column align-items-center" id='addOrderContainer'>
        <div className="d-flex justify-content-end fa-xl" style={{ cursor: 'pointer', width: '100%' }}>
          <i className="fa-solid fa-rectangle-xmark" onClick={modifyingOrder ? toggleModifyOrder : toggleNewOrder}></i>
        </div>
        {modifyingOrder ? <u><h1 className='my-5'>MODIFY ORDER</h1></u> : <u><h1 className='my-5'>ADD NEW ORDER</h1></u>}
        <div className='my-1' style={{ width: '22rem' }}>
          <span className='mx-3' style={{ width: '5rem' }}>Enter Order ID</span>
          <input type='number' style={{ width: '12rem', float: 'right' }} id='newOrderId' />
        </div>
        <div className='my-1' style={{ width: '22rem' }}>
          <span className='mx-3' style={{ width: '5rem' }}>Product type</span>
          <select style={{ width: '12rem', float: 'right' }} id='newOrderType'>
            <option value={''}>Order Type</option>
            <option value={'OPC'}>OPC</option>
            <option value={'PPC'}>PPC</option>
            <option value={'RAPID'}>RAPID</option>
          </select>
        </div>
        <div className='my-1' style={{ width: '22rem' }}>
          <span className='mx-3' style={{ width: '5rem' }}>Enter Quantity</span>
          <input type='number' style={{ width: '12rem', float: 'right' }} id='newOrderQuantity' />
        </div>
        <div className='my-1' style={{ width: '22rem' }}>
          {addingOrder ?
            <>
              <span className='mx-3' style={{ width: '5rem' }}>State of order</span>
              <select style={{ width: '12rem', float: 'right' }} id='newOrderState'>
                <option value={''}>Choose Order </option>
                <option value={'pending'}>Pending</option>
                <option value={'completed'}>Completed</option>
              </select>
            </>
            :
            <></>
          }

        </div>
        {modifyingOrder ? <button className="btn btn-primary m-5" onClick={handleModifyOrder}>Modify Order</button>
        : <button className="btn btn-primary m-5" onClick={addNewOrder}>Add Order</button>}
      </div>
    </>
  );
}

export default Orders;
